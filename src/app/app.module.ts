import { NgModule }                       from '@angular/core';
import { BrowserModule }                  from '@angular/platform-browser';
import { FormsModule }                    from '@angular/forms';
import { HttpModule }                     from '@angular/http';
import { MaterialModule }                 from '@angular/material';
import { Md2Module }                      from 'md2';
import { SlimLoadingBarModule }           from 'ng2-slim-loading-bar';
import { BASE_PATH }                      from './api/variables';
import { AppComponent }                   from './app.component';
import { AppState }                       from './app.service';
import { AppRoutingModule }               from './app-routing.module';
import { AppointmentModule }              from './appointment/appointment.module';
import { HomeModule }                     from './home/home.module';
import { AboutComponent }                 from './about/about.component';
import { NoContentComponent }             from './no-content/no-content.component';
import { XLargeDirective }                from './home/x-large/x-large.directive';
import { LoginComponent }                 from './login/login.component';
import { SignupComponent }                from './login/signup.component';
import { AuthGuard }                      from './guards/index';
import { AuthenticationService }          from './api/api/authentication.service';
import { UserService }                    from './api/api/user.service';
import { AdminClientComponent }           from './admin/index';
import { ProvinceService }                from './api/api/province.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppointmentModule,
    HomeModule,
    MaterialModule.forRoot(),
    Md2Module.forRoot(),
    SlimLoadingBarModule.forRoot(),
    AppRoutingModule
  ],
  declarations: [
    AdminClientComponent,
    AppComponent,
    LoginComponent, SignupComponent,
    AboutComponent,
    NoContentComponent,
    XLargeDirective
  ],
  providers: [
    AuthGuard, AuthenticationService, UserService, ProvinceService,
    AppState,
    {
      provide: BASE_PATH, // Used in apis as base path.
      useValue: API_BASE_PATH // Declared in custom-typings.d.ts, set by webpack's DefinePlugin
    }
  ],
  entryComponents: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
