import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { AcceptOfferComponent }           from './accept-offer.component';
import { AnonComponent }                  from './anon.component';
import { AppointmentAttendanceComponent } from './attendance.component';
import { AppointmentComponent }           from './appointment.component';
import { AppointmentDetailComponent }     from './detail.component';
import { AppointmentProvidersComponent }  from './providers.component';
import { AppointmentScheduleComponent }   from './schedule.component';
import { AppointmentTodayComponent }      from './today.component';
import { ClientComponent }                from './client.component';
import { StatisticsComponent }            from './statistics.component';
import { WalkInCheckInComponent }         from './walk-in-check-in.component';
import { WeekComponent }                  from './week.component';
import { VideochatComponent }             from './videochat.component';
import { AuthGuard }                      from '../guards/index';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'appointment',
        component: AppointmentComponent,
        children: [
          { path: 'today', component: AppointmentTodayComponent, canActivate: [AuthGuard] },
          { path: 'accept/:secret', component: AcceptOfferComponent, canActivate: [AuthGuard] },
          { path: 'week', component: WeekComponent, canActivate: [AuthGuard] },
       { path: 'walk-in-check-in', component: WalkInCheckInComponent, canActivate: [AuthGuard] },
          { path: 'client/:id', component: ClientComponent, canActivate: [AuthGuard] },
       { path: 'provider', component: AppointmentProvidersComponent, canActivate: [AuthGuard] },
       { path: 'attendance', component: AppointmentAttendanceComponent, canActivate: [AuthGuard] },
          { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard] },
          { path: 'videochat/:id', component: VideochatComponent },
          { path: 'anon', component: AnonComponent },
          { path: ':id', component: AppointmentDetailComponent, canActivate: [AuthGuard] },
          { path: '', component: AppointmentScheduleComponent, canActivate: [AuthGuard] }
        ]
      }
    ])
  ],
  exports: [ RouterModule ]
})

export class AppointmentRoutingModule { }
