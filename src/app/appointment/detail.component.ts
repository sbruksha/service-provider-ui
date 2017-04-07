import { Component, QueryList }    from '@angular/core';
import { ViewChildren, ViewChild } from '@angular/core';
import { OnInit }                  from '@angular/core';
import { MdInputDirective }        from '@angular/material';
import { NgForm }                  from '@angular/forms';
import { FormControl }             from '@angular/forms';
import { ActivatedRoute, Router }  from '@angular/router';

import { AutoComplete }            from 'primeng/primeng';
import { Observable }              from 'rxjs';
import { SlimLoadingBarService }   from 'ng2-slim-loading-bar';
import * as moment                 from 'moment';
import * as humanizeDuration       from 'humanize-duration';

import { AppState }                from '../app.service';
import { Appointment }             from '../api/model/appointment';
import { AppointmentService }      from '../api/api/appointment.service';
import { Service }                 from '../api/model/service';
import { ServiceService }          from '../api/api/service.service';
import { Client }                  from '../api/model/client';
import { ClientService }           from '../api/api/client.service';
import { Provider }                from '../api/model/provider';
import { ProviderService }         from '../api/api/provider.service';
import { NotificationService }     from '../api/api/notification.service';
import { NotificationBuilder }     from './notificationBuilder';

@Component({
  templateUrl: './detail.component.html',
  styleUrls: [ './detail.component.scss' ]
})

export class AppointmentDetailComponent implements OnInit {

  public editing: boolean = false;
  public providers: Provider[] = undefined;

  // Patient autocomplete field
  public patientControl = new FormControl();

  // Duration input
  public durationControl = new FormControl();

  // Examinations autocomplete/tag field
  private services: Service[] = [];
  private patientAuto: boolean = false;
  private clients: Client[] = [];
  private filteredPatients: Observable<Client[]>;
  private filteredExaminations: Service[] = undefined;
  private proposedTimeSlots: any[] = [];
  private localeHumanizer: any;
  private isTwelveHours: boolean;
  @ViewChildren('examMultiChooser') private examsMultiInput: QueryList<AutoComplete>;
  @ViewChild('duration') private durationInput: MdInputDirective;
  private model: AppointmentViewModel = {
    id: undefined,
    title: undefined,
    description: undefined,
    date: undefined,
    time: undefined,
    duration: undefined,
    provider: undefined,
    client: undefined,
    services: undefined,
    reminders: undefined
  };

  constructor(
    private _state: AppState,
    private route: ActivatedRoute,
    private router: Router,
    private slimLoadingBarService: SlimLoadingBarService,
    private appointmentService: AppointmentService,
    private serviceService: ServiceService,
    private providerService: ProviderService,
    private clientService: ClientService,
    private notificationService: NotificationService) {}

  public ngOnInit(): void {
    let param: string = this.route.snapshot.params['id'];

    // Mouseflow integration
    if ((<any> window)._mfq) {
      (<any> window)._mfq.push(['newPageView', '/appointment/' + param]);
    }

    // This is a sub-page
    this._state.isSubPage.next(true);
    this._state.title.next();
    this._state.actions.next();
    this._state.primaryAction.next();

    // Set up localized humanizer for durations
    this.localeHumanizer = humanizeDuration.humanizer({
      language: localStorage.getItem('locale').startsWith('de') ? 'de' : 'en'
    });

    // Set up localization
    this.isTwelveHours = this.isCurrentLocaleUsingTwelveHours();

    // Set up rooms control (retrieve all rooms)
    this.getAllRooms();

    // Create new appointment
    if (param === 'add') {
      this.editing = true;

    // View or edit existing appointment
    } else if (!isNaN(Number(param))) {
      this.editing = false;
      console.log('displaying appointment with id: %d', Number(param));
      this.getAppointmentById(Number(param));
    }

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
        (x) => {
          this.model.duration = x;
          this.onFormChange();
        },
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
      providerId: this.model.provider.id,
      services: this.model.services
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

    // Add...
    if (!this.model.id) {
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

          // Create reminders
          if (this.model.reminders) {
            this.notificationService.notificationCreate(
              NotificationBuilder.getNotification(
                x,
                this.model.emailReminder ? this.model.client.email : undefined,
                this.model.smsReminder ? this.model.client.phone : undefined
              ))
            .subscribe(
              null,
              (err) => console.log(err),
              () => console.log('Created notification.')
            );
          }

        },
        (e) => { console.log('onError: %o', e); },
        () => {
          this.slimLoadingBarService.complete();
          console.log('Completed insert.');

          // Navigate back to schedule view
          this.router.navigateByUrl('appointment');
        }
      );

    // ...or update
    } else {
      this.appointmentService
      .appointmentPrototypePatchAttributes(this.model.id.toString(), newAppointment)
      .subscribe(
        (x) => {
          // Before linking examinations, we actually have to get rid of existing ones
          this.appointmentService.appointmentPrototypeDeleteExaminations(String(x.id))
          .subscribe(
            null,
            null,
            () => {
              for (let examination of examinations) {
                this.linkExaminationWithAppointment(x, examination);
              }
            }
          );

          // TODO Reminders currently being ignored on update
        },
        (e) => { console.log('onError: %o', e); },
        () => {
          this.slimLoadingBarService.complete();
          console.log('Completed update.');

          // Navigate back to schedule view
          this.router.navigateByUrl('appointment');
        }
      );
    }
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

  private getRoomById(roomId: number): Provider {
    return this.providers.find(
      (room) => {
        return room.id === roomId;
      }
    );
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
      () => console.log('Completed linking service with appointment.')
    );
  }

  private getAllRooms(): void {
    this.providerService
    .roomFind()
    .subscribe(
      (x) => this.providers = x,
      (e) => console.log(e),
      () => console.log('Get all providers complete.')
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
      () => console.log('Completed querying for services.')
    );
  }

  /**
   * Queries the appointment service for a possible time slot for the given
   * duration and room, from the given start date onwards.
   *
   * @param examinationId Will be ignored.
   */
  private findTime(
    duration?: string,
    examinationId?: number,
    roomId?: number,
    startDate?: moment.Moment
  ) {
    console.log('Querying for the next free time slot.');
    this.appointmentService
    .appointmentFindTime(
      duration ? 'PT' + duration : 'PT40M', // TODO move to server and replace by config-default
      examinationId,
      roomId,
      startDate ? startDate.toDate() : undefined)
    .subscribe(
      (x) => {
        this.proposedTimeSlots.push(x);
        this.proposedTimeSlots.sort(this.compareSuggestedTimeSlots);
      },
      (e) => console.log(e),
      () => console.log('Completed querying for the next free time slot.')
    );
  }

  /**
   * Helper method used to sort the suggested time slots array after inserting
   * new elements.
   */
  private compareSuggestedTimeSlots(slotA, slotB): number {
    if (!slotA.scheduledTasks.NewAppointment.schedule[0].start ||
        !slotB.scheduledTasks.NewAppointment.schedule[0].start) {
          return 1;
    }
    let a = moment(slotA.scheduledTasks.NewAppointment.schedule[0].start);
    let b = moment(slotB.scheduledTasks.NewAppointment.schedule[0].start);
    if (a.isAfter(b)) {
      return 1;
    }
    if (a.isBefore(b)) {
      return -1;
    }
    return 0;
  }

  /**
   * Will be called everytime the form changes, and query the backend for new
   * time slot suggestions.
   */
  private onFormChange() {
    // When editing an existing appointment, don't display suggestions
    if (this.model.id) {
      return;
    }

    // Every time the form changes, use latest information to find a suitable date
    if (this.model.duration) {

      // Check if duration is valid
      let duration = moment.duration('PT' + this.model.duration);
      if (moment.isDuration(duration) && duration.asMinutes() > 1) {
        this.proposedTimeSlots = [];

        // Query for time slots from now on
        this.findTime(
          this.model.duration,
          this.model.services && this.model.services.length > 0 ?
            this.model.services[0].id : undefined,
          this.model.provider ? this.model.provider.id : undefined,
          moment()
        );
        // The next day on
        this.findTime(
          this.model.duration,
          this.model.services && this.model.services.length > 0 ?
            this.model.services[0].id : undefined,
          this.model.provider ? this.model.provider.id : undefined,
          moment().add(1, 'day')
        );
        // From next week on
        this.findTime(
          this.model.duration,
          this.model.services && this.model.services.length > 0 ?
            this.model.services[0].id : undefined,
          this.model.provider ? this.model.provider.id : undefined,
          moment().add(1, 'week')
        );
        // From one month on
        this.findTime(
          this.model.duration,
          this.model.services && this.model.services.length > 0 ?
            this.model.services[0].id : undefined,
          this.model.provider ? this.model.provider.id : undefined,
          moment().add(1, 'month')
        );
      }
    }
  }

  private getAppointmentById(id: number) {
    this.appointmentService.appointmentFindById(id.toString())
      .subscribe(
        (x) => {
          let startDate = moment(x.start);
          let endDate = moment(x.end);
          let duration = moment.duration(endDate.diff(startDate));
          this.model.id = x.id;
          this.model.date = startDate.format('l');
          this.model.time = startDate.format('LT');
          this.model.duration = duration.toJSON().substring(2);
          this.model.title = x.title;
          this.model.description = x.description;
          if (x.clientId) {
            this.clientService.patientFindById(x.clientId.toString())
              .subscribe(
                (y) => this.model.client = y,
                (e) => console.log(e),
                () => console.log('Completed querying for client by id')
              );
          }
          this.model.provider = this.getRoomById(x.providerId);
          this.appointmentService.appointmentPrototypeGetExaminations(x.id.toString())
            .subscribe(
              (z) => this.model.services = z,
              (e) => console.log(e),
              () => console.log('Completed querying for services by appointment id')
            );
        },
        (e) => console.log(e),
        () => console.log('Completed querying for appointment data')
      );
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

  private applySuggestion(timeSlot: any) {
    if (timeSlot) {
      console.log(timeSlot);
      let startDate = moment(timeSlot.start);
      this.model.duration =
        `${moment.duration(timeSlot.duration, 'minutes').toJSON().substring(2)}`;
      this.model.date = startDate.format('l');
      this.model.time = startDate.format('LT');
      this.model.provider = this.getRoomById(timeSlot.resources[0]);

      // Clear suggestions
      this.proposedTimeSlots = [];
    }
  }

  private handleEditClick() {
    this.editing = true;
  }

  private formatDuration(durationString: string): string {
    return this.localeHumanizer(moment.duration('PT' + durationString).asMilliseconds());
  }

  private isCurrentLocaleUsingTwelveHours(): boolean {
    return moment().format('LT').endsWith('M');
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
  reminders: boolean;
  smsReminder?: boolean;
  emailReminder?: boolean;
}
