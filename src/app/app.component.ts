import { Component, ViewEncapsulation }   from '@angular/core';
import { ViewContainerRef }               from '@angular/core';
import { OnInit }                         from '@angular/core';
import { Location }                       from '@angular/common';
import { MdDialogRef, MdDialog }          from '@angular/material';
import { Router }                         from '@angular/router';

import { SlimLoadingBarService }          from 'ng2-slim-loading-bar';
import { Subscription }                   from 'rxjs/Subscription';

import { AppState, Action }               from './app.service';
import { ServiceService }                 from './api/api/service.service';
import { AttendanceService }              from './api/api/attendance.service';
import { AppointmentService }             from './api/api/appointment.service';
import { ClientService }                  from './api/api/client.service';
import { ProviderService }                from './api/api/provider.service';
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './app.component.scss' ],
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  public primaryAction: Action;
  public isSubPage = false;
  public title = 'Service Provider Prototype';

  private actions: Action[];

  constructor(
    private _state: AppState,
    private _location: Location,
    private router: Router,
    private dialog: MdDialog,
    private slimLoadingBarService: SlimLoadingBarService,
    private attendanceService: AttendanceService,
    private appointmentService: AppointmentService,
    private serviceService: ServiceService,
    private clientService: ClientService,
    private providerService: ProviderService,
    private viewContainerRef: ViewContainerRef) {}

  public ngOnInit() {
    console.log('Locale is %s', localStorage.getItem('locale'));

    // Listen for title changes
    this._state.title.subscribe(
      (title) => this.title = title,
      (error) => {
        this.title = 'Service Provider Prototype';
        console.log('Error getting title for activated route.');
      },
      () => console.log('Finished retrieving titles for activated route.')
    );

    // Listen for toolbar icon changes
    this._state.isSubPage.subscribe(
      (isSubPage) => this.isSubPage = isSubPage,
      (error) => {
        this.isSubPage = false;
        console.log('Error getting isSubPage for activated route.');
      },
      () => console.log('Finished retrieving isSubPage for activated route.')
    );

    // Listen for toolbar action changes
    this._state.actions.subscribe(
      (actions) => this.actions = actions,
      (error) => {
        this.actions = undefined;
        console.log('Error getting actions for activated route.');
      },
      () => console.log('Finished retrieving actions for activated route.')
    );

    // Listen for toolbar action changes
    this._state.primaryAction.subscribe(
      (primaryAction) => this.primaryAction = primaryAction,
      (error) => {
        this.primaryAction = undefined;
        console.log('Error getting primary action for activated route.');
      },
      () => console.log('Finished retrieving primary action for activated route.')
    );
  }

  public actionsHandler(action: Action) {
    if (action) {
      if (action.clickHandler) {
        action.clickHandler();
      }
    }
  }

  public navigateBack() {
    this._location.back();
  }

  public addnewclient() {
    this.router.navigate(['admin/client']);
  }
}
