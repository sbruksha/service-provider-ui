import {  } from 'jasmine';
import { NO_ERRORS_SCHEMA }                           from '@angular/core';
import { inject, async, TestBed, ComponentFixture }   from '@angular/core/testing';
import { Component }                                  from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { MockBackend }                                 from '@angular/http/testing';
import { FormsModule }                                 from '@angular/forms';
import { Router }                                      from '@angular/router';
import { SlimLoadingBarService }                       from 'ng2-slim-loading-bar';
import { ProvinceService }        from '../api/api/province.service';
import { Province }               from '../api/model/province';
import { Country }                from '../api/model/country';
import { Client }                 from '../api/model/client';
import { ClientService }          from '../api/api/client.service';

// Load the implementations that should be tested
import { AppState }       from '../app.service';
import { AdminClientComponent }  from './client.component';

describe(`AdminClientComponent`, () => {
  let comp: AdminClientComponent;
  let fixture: ComponentFixture<AdminClientComponent>;
  let mockRouter = { navigate: jasmine.createSpy('navigate'), };

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ AdminClientComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [ MockBackend, BaseRequestOptions ]
        },
        AppState,
        { provide: Router, useValue: mockRouter },
        { provide: SlimLoadingBarService },
        { provide: ProvinceService },
        { provide: ClientService },
      ]
    })
    .compileComponents(); // compile template and css
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClientComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges(); // trigger initial data binding
  });
  it('should log ngOnInit', () => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    comp.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  });

});
