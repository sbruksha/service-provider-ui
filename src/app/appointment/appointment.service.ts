import { Injectable }         from '@angular/core';

import { Observable }         from 'rxjs/Observable';

import { AppointmentService } from '../api/api/appointment.service';
import { ViewAppointment }    from './appointment.viewmodel';

@Injectable()
export class ViewAppointmentService {

  constructor(private appointmentService: AppointmentService) {}

  public appointmentFind(
    filter?: string,
    extraHttpRequestParams?: any): Observable<ViewAppointment[]> {

    return this.appointmentService.appointmentFindDeep(filter, extraHttpRequestParams)
      .map((x, idx) => {
        // Event colors
        for (let i = x.length - 1; i >= 0; i--) {
          if (x[i].services && x[i].services.length > 0) {
            x[i].color = x[i].services[0].color;
            x[i].backgroundColor = x[i].services[0].backgroundColor;
            x[i].borderColor = x[i].backgroundColor;
          }
          // Event title display
          if (!x[i].title) {
            if (x[i].client) {
              x[i].title =
              `${x[i].client.givenName} ${x[i].client.surname}`;
            }
          }
          // Render blocked appointments differently
          if (x[i].autoAppointmentBlockedSecret) {
            x[i].title = 'Auto-Offered';
            x[i].color = '#000000';
            x[i].backgroundColor = '#ffffff';
            x[i].borderColor = '#000000';
            x[i].className  = 'auto-appointment-blocked';
          }
        }
        return x;
      });
  }

  public appointmentFindAnonymous(
    filter?: string,
    extraHttpRequestParams?: any): Observable<ViewAppointment[]> {

    return this.appointmentService.appointmentFindDeep(filter, extraHttpRequestParams)
      .map((x, idx) => {
        // Event colors
        for (let i = x.length - 1; i >= 0; i--) {
          x.id = undefined;
          if (x[i].services && x[i].services.length > 0) {
            x[i].color = x[i].services[0].color;
            x[i].backgroundColor = x[i].services[0].backgroundColor;
            x[i].borderColor = x[i].backgroundColor;
          }
          x[i].services = undefined;
          x[i].title = undefined;
          x[i].client = undefined;
          x[i].description = undefined;
        }
        return x;
      });
  }
}
