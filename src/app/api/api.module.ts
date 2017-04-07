import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { Configuration } from './configuration';

import { AppointmentService } from './api/appointment.service';
import { AttendanceService } from './api/attendance.service';
import { AuditLogEntryService } from './api/auditLogEntry.service';
import { ServiceService } from './api/service.service';
import { MailService } from './api/mail.service';
import { NotificationService } from './api/notification.service';
import { ClientService } from './api/client.service';
import { ProviderService } from './api/provider.service';

@NgModule({
  imports:      [ CommonModule, HttpModule ],
  declarations: [],
  exports:      [],
  providers:    [ AppointmentService, AttendanceService, AuditLogEntryService, ServiceService, MailService, NotificationService, ClientService, ProviderService ]
})
export class ApiModule {
    public static forConfig(configuration: Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ {provide: Configuration, useValue: configuration}]
        }
    }
}
