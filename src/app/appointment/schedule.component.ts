import { Component, OnInit }      from '@angular/core';
import { ViewChild }              from '@angular/core';
import { Router }                 from '@angular/router';

import * as moment                from 'moment';
import { Schedule }               from 'primeng/primeng';
import { SlimLoadingBarService }  from 'ng2-slim-loading-bar';

import { AppState }               from '../app.service';
import { ViewAppointment }        from './appointment.viewmodel';
import { Appointment }            from '../api/model/appointment';
import { ViewAppointmentService } from './appointment.service';
import { ClientService }         from '../api/api/client.service';

@Component({
  templateUrl: './schedule.component.html',
  styleUrls: [ './schedule.component.scss' ]
})

export class AppointmentScheduleComponent implements OnInit {

  public appointments: ViewAppointment[];
  public locale: string;
  public hiddenDays: number[] = [ ]; // 0 - Hide Sundays by default
  public viewDate: moment.Moment = moment();

  @ViewChild(Schedule) private schedule: Schedule;

  constructor(
    private _state: AppState,
    private router: Router,
    private slimLoadingBarService: SlimLoadingBarService,
    private viewAppointmentService: ViewAppointmentService,
    private clientService: ClientService) {}

  public ngOnInit() {
    // Mouseflow integration
    if ((<any> window)._mfq) {
      (<any> window)._mfq.push(['newPageView', '/appointment/']);
    }

    // Set up page
    this._state.isSubPage.next(false);
    this._state.title.next(this.viewDate.format('MMMM YYYY'));
    this._state.actions.next([
      {
        icon: 'keyboard_arrow_left',
        clickHandler: this.handlePrevClick.bind(this)
      },
      {
        icon: 'today',
        clickHandler: this.handleTodayClick.bind(this)
      },
      {
        icon: 'keyboard_arrow_right',
        clickHandler: this.handleNextClick.bind(this)
      }
    ]);
    this._state.primaryAction.next({
      icon: 'add',
      routerLink: 'appointment/add'
    });

    // Retrieve data
    this.getAllAppointments();

    // Set up calendar view
    this.locale = localStorage.getItem('locale').startsWith('de') ? 'de' : 'en';
  }

  /**
   * Triggered when a calendar event is clicked.
   */
  public handleEventClick(event) {
    this.router.navigate(['appointment', event.calEvent.id]);
  }

  private getAllAppointments(): void {
    this.slimLoadingBarService.start();
    this.viewAppointmentService
    .appointmentFind()
    .subscribe(
      (x) => this.appointments = x,
      (e) => console.log(e),
      () => {
        console.log('Get all appointments complete');
        this.slimLoadingBarService.complete();
      }
    );
  }

  private handleNextClick() {
    this.viewDate = this.viewDate.add(1, 'month');
    this._state.title.next(this.viewDate.format('MMMM YYYY'));
    this.schedule.gotoDate(this.viewDate);
  }

  private handleTodayClick() {
    this.viewDate = moment();
    this._state.title.next(this.viewDate.format('MMMM YYYY'));
    this.schedule.gotoDate(this.viewDate);
  }

  private handlePrevClick() {
    this.viewDate = this.viewDate.subtract(1, 'month');
    this._state.title.next(this.viewDate.format('MMMM YYYY'));
    this.schedule.gotoDate(this.viewDate);
  }
}
