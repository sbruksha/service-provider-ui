import { Component, OnInit }      from '@angular/core';
import { NgForm }                 from '@angular/forms';
import { Router }                 from '@angular/router';
import { FormControl }            from '@angular/forms';

import * as moment                from 'moment';
import { SlimLoadingBarService }  from 'ng2-slim-loading-bar';
import { Observable }             from 'rxjs/Observable';

import { AppState }               from '../app.service';
import { Attendance }             from '../api/model/attendance';
import { Appointment }            from '../api/model/appointment';
import { AppointmentService }     from '../api/api/appointment.service';
import { Service }                from '../api/model/service';
import { ServiceService }         from '../api/api/service.service';
import { Client }                 from '../api/model/client';
import { ClientService }          from '../api/api/client.service';
import { Provider }               from '../api/model/provider';
import { ProviderService }        from '../api/api/provider.service';

@Component({
  templateUrl: './walk-in-check-in.component.html',
  styleUrls: [ './walk-in-check-in.component.scss' ]
})

export class WalkInCheckInComponent implements OnInit {

  public patientAuto: any;
  // Duration input
  public durationControl = new FormControl();

  // Examinations autocomplete/tag field
  public services: Service[] = [];

  // Patient autocomplete field
  public patientControl = new FormControl();

  // View model for form
  public model: AppointmentViewModel = {
    id: undefined,
    title: undefined,
    description:
      localStorage.getItem('locale').startsWith('de') ? 'Akutpatient' : 'Walk-in client',
    date: moment().format('l'),
    time: moment().format('LT'),
    duration: '30M',
    provider: undefined,
    client: undefined,
    services: undefined
  };

  private filteredExaminations: Service[] = undefined;
  private filteredPatients: Observable<Client[]>;
  private clients: Client[] = [];
  private providers: Provider[] = undefined;

  constructor(
    private _state: AppState,
    private router: Router,
    private slimLoadingBarService: SlimLoadingBarService,
    private appointmentService: AppointmentService,
    private serviceService: ServiceService,
    private providerService: ProviderService,
    private clientService: ClientService
  ) {}

  public ngOnInit(): void {
    // Mouseflow integration
    if ((<any> window)._mfq) {
      (<any> window)._mfq.push(['newPageView', '/appointment/walk-in-check-in']);
    }

    // This is a sub-page
    this._state.isSubPage.next(true);
    this._state.title.next(
      localStorage.getItem('locale').startsWith('de') ?
        'Akutpatienten anmelden' :
        'Walk-In Client Check-In'
      );
    this._state.actions.next();
    this._state.primaryAction.next();

    this.getAllRooms();

    // Set up patient autocomplete control
    this.clientService.patientFind().subscribe(
      (patients) => {
        this.clients = patients;
        this.filteredPatients = this.patientControl.valueChanges
         .startWith(null)
         .map((val) => this.filterPatients(val));
      },
      (err) => console.log(err)
    );

    // Set up examinations control
    this.serviceService.examinationFind().subscribe(
      (examinations) => this.services = examinations,
      (err) => console.log(err)
    );

    // Set up duration control
    this.durationControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .map((val) => this.sanitizeDuration(val))
      .subscribe(
        (x) => this.model.duration = x,
        (err) => console.log(err)
      );
  }

  public onSubmit(): void {
    this.slimLoadingBarService.start();
    let newAppointment: Appointment  = {
      title: this.model.title,
      description: this.model.description,
      modified: new Date(),
      created: new Date(),
      modifiedBy: 0,
      createdBy: 0,
      clientId: this.model.client.id,
      providerId: this.model.provider.id
    };
    let examinations: Service[] = this.model.services;
    let startDate = moment(this.model.date, 'l');
    let startTime = moment(this.model.time, 'LT');
    let start = startDate.clone();
    start.hour(startTime.hour());
    start.minute(startTime.minute());
    let end: moment.Moment = start.clone();
    end.add(moment.duration('PT' + this.model.duration));
    newAppointment.start = start.toDate();
    newAppointment.end = end.toDate();

    // Add appointment
    this.appointmentService
    .appointmentCreate(newAppointment)
    .subscribe(
      (x) => {
        // Link examinations
        if (examinations && examinations.length > 0) {
          for (let examination of examinations) {
            this.linkExaminationWithAppointment(x, examination);
          }
        }
        // Complete check-in
        this.checkIn(x).subscribe(
          null,
          (err) => console.log(err),
          () => {
            this.slimLoadingBarService.complete();

            // Navigate back to schedule view
            this.router.navigateByUrl('appointment/attendance');
          }
        );
      },
      (e) => { console.log('onError: %o', e); },
      () => { console.log('Completed insert.'); }
    );
  }

  /**
   * Used to display patients in the suggestions drop down.
   */
  public patientDisplayFn(patient: Client): string {
    return patient ?
      `${patient.givenName} ${patient.surname} ` +
      `(${moment(patient.dateOfBirth).format('l')})`
      : null;
  }

  /**
   * Used to display room names in the frontend.
   */
  public getRoomNameById(roomId: number): string {
    return this.getRoomById(roomId).name;
  }

  private linkExaminationWithAppointment(appointment: Appointment, examination: Service) {
    this.appointmentService.appointmentPrototypeLinkExaminations(
      appointment.id.toString(),
      examination.id.toString())
    .subscribe(
      (x) => console.log(
        `Linked service ${x.serviceId} with appointment ${x.appointmentId}`
      ),
      (e) => console.log(e),
      () => console.log('Completed linking services with appointment.')
    );
  }

  private getAllRooms(): void {
    this.providerService
    .roomFind()
    .subscribe(
      (x) => {
        this.providers = x;
        if (x && x.length > 0) { // If we got rooms, use the first as default
          this.model.provider = x[0];
        }
      },
      (e) => console.log(e),
      () => console.log('Get all rooms complete.')
    );
  }

  private filterPatients(val: string): Client[] {
    return val ? this.clients.filter(
      (patient) => new RegExp(val, 'gi').test(`${patient.surname} ${patient.givenName}`)
    ) : this.clients;
  }

  private findExaminations(event) {
    this.serviceService
    .examinationFind(`{"where": {"name": {"regexp": "${event.query}/i"}}}`)
    .subscribe(
      (x) => this.filteredExaminations = x,
      (e) => console.log(e),
      () => console.log('Completed querying for examinations.')
    );
  }

  private getRoomById(roomId: number): Provider {
    return this.providers.find(
      (room) => {
        return room.id === roomId;
      }
    );
  }

  private checkIn(appointment: any): Observable<Attendance> { // TODO Fix any ViewAppointment
    // Prepare data
    let data: Attendance = {
      checkedIn: new Date()
    };

    // TODO check if this patient is already checked in, and allow/deny
    // this operation. Maybe we want to allow this, but in that case, we
    // would have to set checkedIn = underTreatment = new Date().

    return this.appointmentService
      .appointmentPrototypeCreateAttendance(appointment.id.toString(), data);
  }

  /**
   * Triggered on duration input changes. Seeks to sanitize the entered value.
   */
  private sanitizeDuration(val: string) {
    if (val) {
      // Strip any whitespaces from anywhere
      val = val.replace(/\s/g, '');
      // Check different types of input
      if (/^[0-9]$/.test(val)) {
        val = val + 'H';
      } else if (/^[0-9]{2}$/.test(val)) {
        val = val + 'M';
      } else {
        val = val.toUpperCase();
      }
      // this.onFormChange(); // TODO
    }
    return val;
  }

  private humanizeDuration(durationString: String): String {
    return moment.duration('PT' + durationString).humanize();
  }
}

interface AppointmentViewModel {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  provider: Provider;
  client: Client;
  services: Service[];
}
