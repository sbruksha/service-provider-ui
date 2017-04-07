import { Component, OnInit }      from '@angular/core';
import { ViewChildren }           from '@angular/core';
import { QueryList }              from '@angular/core';
import { Router }                 from '@angular/router';

import { Observable }             from 'rxjs';
import * as moment                from 'moment';
import { Schedule }               from 'primeng/primeng';
import { SlimLoadingBarService }  from 'ng2-slim-loading-bar';

import { AppState }               from '../app.service';
import { Appointment }            from '../api/model/appointment';
import { ViewAppointmentService } from './appointment.service';
import { Provider }                   from '../api/model/provider';
import { ProviderService }            from '../api/api/provider.service';

@Component({
  templateUrl: './providers.component.html',
  styleUrls: [ './providers.component.scss' ]
})

export class AppointmentProvidersComponent implements OnInit {

  public appointmentsByProvider: Appointment[][] = [[]];
  public providers: Provider[];
  public locale: string;
  public minTime: moment.Duration = moment.duration('07:00:00');
  public maxTime: moment.Duration = moment.duration('20:00:00');
  public viewDate: moment.Moment = moment();

  @ViewChildren(Schedule) private schedules: QueryList<Schedule>;

  constructor(
    private _state: AppState,
    private router: Router,
    private slimLoadingBarService: SlimLoadingBarService,
    private viewAppointmentService: ViewAppointmentService,
    private providerService: ProviderService
  ) {}

  public ngOnInit() {
    // Mouseflow integration
    if ((<any> window)._mfq) {
      (<any> window)._mfq.push(['newPageView', '/appointment/rooms']);
    }

    // Set up page
    this._state.isSubPage.next(false);
    this._state.title.next(this.viewDate.format('LL'));
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
    this.getAllProviders();

    // Set up calendar view
    this.locale = localStorage.getItem('locale').startsWith('de') ? 'de' : 'en';
  }

  /**
   * Triggered when a calendar event is clicked.
   */
  public handleEventClick(event) {
    this.router.navigate(['appointment', event.calEvent.id]);
  }

  private getAppointmentsByProvider(provider: Provider): Observable<Appointment[]> {
    return this.viewAppointmentService
    .appointmentFind(`{"where": {"providerId": "${provider.id}"}}`)
    .do(
      (x) => {
        this.appointmentsByProvider[provider.id] = x;
      }
    );
  }

  private getAllProviders(): void {
    this.slimLoadingBarService.start();
    let appointmentObservables: Array<Observable<Appointment[]>> = [];
    this.providerService
    .roomFind()
    .subscribe(
      (x) =>  {
        this.providers = x;
        this.providers.map(
          (provider) => {
            appointmentObservables.push(this.getAppointmentsByProvider(provider));
          }
        );
        Observable.forkJoin(appointmentObservables).subscribe(
          () => this.slimLoadingBarService.progress +=
            (100 / appointmentObservables.length),
          (e) => console.log(e),
          () => {
            this.slimLoadingBarService.complete();
          }
        );
      }
    );
  }

  private handleNextClick() {
    this.viewDate = this.viewDate.add(1, 'day');
    this._state.title.next(this.viewDate.format('LL'));
    this.schedules.forEach((x) => { x.gotoDate(this.viewDate); });
  }

  private handleTodayClick() {
    this.viewDate = moment();
    this._state.title.next(this.viewDate.format('LL'));
    this.schedules.forEach((x) => { x.gotoDate(this.viewDate); });
  }

  private handlePrevClick() {
    this.viewDate = this.viewDate.subtract(1, 'day');
    this._state.title.next(this.viewDate.format('LL'));
    this.schedules.forEach((x) => { x.gotoDate(this.viewDate); });
  }
}
