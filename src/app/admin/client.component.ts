import { Component, OnInit }      from '@angular/core';
import { AppState }               from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SlimLoadingBarService }  from 'ng2-slim-loading-bar';
import { ProvinceService }        from '../api/api/province.service';
import { Province }               from '../api/model/province';
import { Country }                from '../api/model/country';
import { Client }                 from '../api/model/client';
import { ClientService}          from '../api/api/client.service';

@Component({
  templateUrl: './client.component.html',
  styleUrls: [ './client.component.scss' ]
})

export class AdminClientComponent implements OnInit {

  // View model for form
  public model: ClientViewModel = {
    //id: undefined,
    givenName: undefined,
    surname: undefined,
    gender: undefined,
    streetAddress: undefined,
    city: undefined,
    zipCode: undefined,
    email: undefined,
    phone: undefined,
    dateOfBirth: undefined,
    svn: undefined,
    country: undefined,
    province: undefined,
  };
  private provinces: Province[] = undefined;

  constructor(
    private _state: AppState,
    private route: ActivatedRoute,
    private router: Router,
    private slimLoadingBarService: SlimLoadingBarService,
    private provinceService: ProvinceService,
    private clientService: ClientService) { }

  ngOnInit() {
    // This is a sub-page
    this._state.isSubPage.next(true);
    this._state.title.next('Add New Client');
    this._state.actions.next();
    this._state.primaryAction.next();

    this.getAllProvinces();

  }

  getAllProvinces() {
    this.provinceService
      .provinceFind()
      .subscribe(
        (x) => {
          this.provinces = x;
          if (x && x.length > 0) { // If we got rooms, use the first as default
            this.model.province = x[0];
          }
        },
        (e) => console.log(e),
        () => console.log('Get all provinces complete.')
      );
  }

  public save(): void{
    this.slimLoadingBarService.start();
    let newClient: Client  = {
      surname: this.model.surname,
      givenName: this.model.givenName,
      streetAddress: this.model.streetAddress,
      city: this.model.city,
      zipCode: this.model.zipCode,
      email: this.model.email,
      phone: this.model.phone,
      dateOfBirth: new Date(this.model.dateOfBirth),
      svn: 0,
      gender: this.model.gender?this.model.gender:"0",
      country: 96,
      province: this.model.province.id
    };
    console.log(newClient);
    //Add client
    this.clientService.patientCreate(newClient)
      .subscribe(
        (x) => {
          this.slimLoadingBarService.complete();

          // Navigate back to schedule view
          //this.router.navigateByUrl('appointment/attendance');
        },
        (e) => { console.log('onError: %o', e); },
        () => {
          this.slimLoadingBarService.complete();
          console.log('Completed insert.');

          // Navigate back to schedule view
          this.router.navigateByUrl('appointment');
        }
      );
  }
}
interface ClientViewModel {
  //id: number;
  givenName: string;
  surname: string;
  gender: string;
  streetAddress: string;
  city: string;
  zipCode: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  svn: string;
  country: Country;
  province: Province;
}
