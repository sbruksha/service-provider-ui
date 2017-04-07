import { Appointment }        from '../api/model/appointment';
import { Service }               from '../api/model/service';
import { Client }            from '../api/model/client';
import { Attendance }         from '../api/model/attendance';
import { Provider }               from '../api/model/provider';

export class ViewAppointment implements Appointment {

  // Implemented properties
  public created: Date;
  public createdBy: number;
  public description: string;
  public end: Date;
  public id: number;
  public modified: Date;
  public modifiedBy: number;
  public clientId: number;
  public providerId: number;
  public start: Date;
  public title: string;

  // Additional properties
  public attendance: Attendance;
  public services: Service[];
  public client: Client;
  public provider: Provider;
  public backgroundColor: string;
  public borderColor: string;
  public color: string;

  constructor(data?: Appointment) {
    if (data) {
      this.created = data.created;
      this.createdBy = data.createdBy;
      this.description = data.description;
      this.end = data.end;
      this.id = data.id;
      this.modified = data.modified;
      this.modifiedBy = data.modifiedBy;
      this.clientId = data.clientId;
      this.providerId = data.providerId;
      this.start = data.start;
      this.title = data.title;
    }
  }

}
