
import { Inject, Injectable, Optional }                      from '@angular/core';
import { Http, Headers, URLSearchParams }                    from '@angular/http';
import { RequestMethod, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Response, ResponseContentType }                     from '@angular/http';

import { Observable }                                        from 'rxjs/Observable';
import '../rxjs-operators';

import { Appointment } from '../model/appointment';
import { AppointmentProcedure } from '../model/appointmentProcedure';
import { Attendance } from '../model/attendance';
import { Service } from '../model/service';
import { InlineResponse200 } from '../model/inlineResponse200';
import { InlineResponse2001 } from '../model/inlineResponse2001';
import { InlineResponse2003 } from '../model/inlineResponse2003';
import { InlineResponse2004 } from '../model/inlineResponse2004';
import { Client } from '../model/client';
import { Provider } from '../model/provider';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';

@Injectable()
export class AppointmentService {
    protected basePath = 'http://bruksha.info/api/ApiService.svc';
    public defaultHeaders: Headers = new Headers();
    public configuration: Configuration = new Configuration();

    constructor(protected http: Http, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
			this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }
    private createAuthorizationHeader(headers: Headers, n, v) {
      headers.append(n, v);
    }
    /**
     *
     * Extends object by coping non-existing properties.
     * @param objA object to be extended
     * @param objB source object
     */
    private extendObj<T1,T2>(objA: T1, objB: T2) {
        for(let key in objB){
            if(objB.hasOwnProperty(key)){
                (objA as any)[key] = (objB as any)[key];
            }
        }
        return <T1&T2>objA;
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (let consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }

    /**
     * Accepts an offer by passing over the respective secret.
     *
     * @param offerSecret
     */
    public appointmentAcceptOffer(offerSecret: string, extraHttpRequestParams?: any): Observable<any> {
        return this.appointmentAcceptOfferWithHttpInfo(offerSecret, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Count instances of the model matched by where from the data source.
     *
     * @param where Criteria to match model instances
     */
    public appointmentCount(where?: string, extraHttpRequestParams?: any): Observable<InlineResponse200> {
        return this.appointmentCountWithHttpInfo(where, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Create a new instance of the model and persist it into the data source.
     *
     * @param data Model instance data
     */
    public appointmentCreate(data?: Appointment, extraHttpRequestParams?: any): Observable<Appointment> {
        return this.appointmentCreateWithHttpInfo(data, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Create a change stream.
     *
     * @param options
     */
    public appointmentCreateChangeStreamGetAppointmentsChangeStream(options?: string, extraHttpRequestParams?: any): Observable<Blob> {
        return this.appointmentCreateChangeStreamGetAppointmentsChangeStreamWithHttpInfo(options, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.blob();
                }
            });
    }

    /**
     * Create a change stream.
     *
     * @param options
     */
    public appointmentCreateChangeStreamPostAppointmentsChangeStream(options?: string, extraHttpRequestParams?: any): Observable<Blob> {
        return this.appointmentCreateChangeStreamPostAppointmentsChangeStreamWithHttpInfo(options, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.blob();
                }
            });
    }

    /**
     * Deletes all data.
     *
     */
    public appointmentDeleteAllAppointments(extraHttpRequestParams?: any): Observable<InlineResponse2003> {
        return this.appointmentDeleteAllAppointmentsWithHttpInfo(extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Delete a model instance by {{id}} from the data source.
     *
     * @param id Model id
     */
    public appointmentDeleteById(id: string, extraHttpRequestParams?: any): Observable<any> {
        return this.appointmentDeleteByIdWithHttpInfo(id, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Check whether a model instance exists in the data source.
     *
     * @param id Model id
     */
    public appointmentExistsGetAppointmentsidExists(id: string, extraHttpRequestParams?: any): Observable<InlineResponse2001> {
        return this.appointmentExistsGetAppointmentsidExistsWithHttpInfo(id, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Check whether a model instance exists in the data source.
     *
     * @param id Model id
     */
    public appointmentExistsHeadAppointmentsid(id: string, extraHttpRequestParams?: any): Observable<InlineResponse2001> {
        return this.appointmentExistsHeadAppointmentsidWithHttpInfo(id, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Find all instances of the model matched by filter from the data source.
     *
     * @param filter Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({\&quot;something\&quot;:\&quot;value\&quot;})
     */
    public appointmentFind(filter?: string, extraHttpRequestParams?: any): Observable<Array<Appointment>> {
        return this.appointmentFindWithHttpInfo(filter, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Find a model instance by {{id}} from the data source.
     *
     * @param id Model id
     * @param filter Filter defining fields and include - must be a JSON-encoded string ({\&quot;something\&quot;:\&quot;value\&quot;})
     */
    public appointmentFindById(id: string, filter?: string, extraHttpRequestParams?: any): Observable<Appointment> {
        return this.appointmentFindByIdWithHttpInfo(id, filter, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Find all instances of the model matched by filter from the data source, including resolved related instances.
     *
     * @param filter
     */
    public appointmentFindDeep(filter?: string, extraHttpRequestParams?: any): Observable<any> {
        return this.appointmentFindDeepWithHttpInfo(filter, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Find first instance of the model matched by filter from the data source.
     *
     * @param filter Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({\&quot;something\&quot;:\&quot;value\&quot;})
     */
    public appointmentFindOne(filter?: string, extraHttpRequestParams?: any): Observable<Appointment> {
        return this.appointmentFindOneWithHttpInfo(filter, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Finds free slots for an appointment with the specified duration.
     *
     * @param duration
     * @param serviceId
     * @param providerId
     * @param startDate
     */
    public appointmentFindTime(duration: string, serviceId?: number, providerId?: number, startDate?: Date, extraHttpRequestParams?: any): Observable<any> {
        return this.appointmentFindTimeWithHttpInfo(duration, serviceId, providerId, startDate, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Deletes all data.
     *
     * @param freeDays
     * @param startDate
     * @param endDate
     */
    public appointmentGenerateRandomAppointments(freeDays?: string, startDate?: Date, endDate?: Date, extraHttpRequestParams?: any): Observable<InlineResponse2004> {
        return this.appointmentGenerateRandomAppointmentsWithHttpInfo(freeDays, startDate, endDate, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Patch an existing model instance or insert a new one into the data source.
     *
     * @param data Model instance data
     */
    public appointmentPatchOrCreate(data?: Appointment, extraHttpRequestParams?: any): Observable<Appointment> {
        return this.appointmentPatchOrCreateWithHttpInfo(data, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Counts examinations of Appointment.
     *
     * @param id Appointment id
     * @param where Criteria to match model instances
     */
    public appointmentPrototypeCountExaminations(id: string, where?: string, extraHttpRequestParams?: any): Observable<InlineResponse200> {
        return this.appointmentPrototypeCountExaminationsWithHttpInfo(id, where, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Creates a new instance in attendance of this model.
     *
     * @param id Appointment id
     * @param data
     */
    public appointmentPrototypeCreateAttendance(id: string, data?: Attendance, extraHttpRequestParams?: any): Observable<Attendance> {
        return this.appointmentPrototypeCreateAttendanceWithHttpInfo(id, data, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Creates a new instance in examinations of this model.
     *
     * @param id Appointment id
     * @param data
     */
    public appointmentPrototypeCreateExaminations(id: string, data?: Service, extraHttpRequestParams?: any): Observable<Service> {
        return this.appointmentPrototypeCreateExaminationsWithHttpInfo(id, data, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Deletes all examinations of this model.
     *
     * @param id Appointment id
     */
    public appointmentPrototypeDeleteExaminations(id: string, extraHttpRequestParams?: any): Observable<{}> {
        return this.appointmentPrototypeDeleteExaminationsWithHttpInfo(id, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Deletes attendance of this model.
     *
     * @param id Appointment id
     */
    public appointmentPrototypeDestroyAttendance(id: string, extraHttpRequestParams?: any): Observable<{}> {
        return this.appointmentPrototypeDestroyAttendanceWithHttpInfo(id, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Delete a related item by id for examinations.
     *
     * @param id Appointment id
     * @param fk Foreign key for examinations
     */
    public appointmentPrototypeDestroyByIdExaminations(id: string, fk: string, extraHttpRequestParams?: any): Observable<{}> {
        return this.appointmentPrototypeDestroyByIdExaminationsWithHttpInfo(id, fk, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Check the existence of examinations relation to an item by id.
     *
     * @param id Appointment id
     * @param fk Foreign key for examinations
     */
    public appointmentPrototypeExistsExaminations(id: string, fk: string, extraHttpRequestParams?: any): Observable<boolean> {
        return this.appointmentPrototypeExistsExaminationsWithHttpInfo(id, fk, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Find a related item by id for examinations.
     *
     * @param id Appointment id
     * @param fk Foreign key for examinations
     */
    public appointmentPrototypeFindByIdExaminations(id: string, fk: string, extraHttpRequestParams?: any): Observable<Service> {
        return this.appointmentPrototypeFindByIdExaminationsWithHttpInfo(id, fk, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Fetches hasOne relation attendance.
     *
     * @param id Appointment id
     * @param refresh
     */
    public appointmentPrototypeGetAttendance(id: string, refresh?: boolean, extraHttpRequestParams?: any): Observable<Attendance> {
        return this.appointmentPrototypeGetAttendanceWithHttpInfo(id, refresh, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Queries examinations of Appointment.
     *
     * @param id Appointment id
     * @param filter
     */
    public appointmentPrototypeGetExaminations(id: string, filter?: string, extraHttpRequestParams?: any): Observable<Array<Service>> {
        return this.appointmentPrototypeGetExaminationsWithHttpInfo(id, filter, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Fetches belongsTo relation patient.
     *
     * @param id Appointment id
     * @param refresh
     */
    public appointmentPrototypeGetPatient(id: string, refresh?: boolean, extraHttpRequestParams?: any): Observable<Client> {
        return this.appointmentPrototypeGetPatientWithHttpInfo(id, refresh, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Fetches belongsTo relation room.
     *
     * @param id Appointment id
     * @param refresh
     */
    public appointmentPrototypeGetRoom(id: string, refresh?: boolean, extraHttpRequestParams?: any): Observable<Provider> {
        return this.appointmentPrototypeGetRoomWithHttpInfo(id, refresh, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Add a related item by id for examinations.
     *
     * @param id Appointment id
     * @param fk Foreign key for examinations
     * @param data
     */
    public appointmentPrototypeLinkExaminations(id: string, fk: string, data?: AppointmentProcedure, extraHttpRequestParams?: any): Observable<AppointmentProcedure> {
        return this.appointmentPrototypeLinkExaminationsWithHttpInfo(id, fk, data, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Patch attributes for a model instance and persist it into the data source.
     *
     * @param id Appointment id
     * @param data An object of model property name/value pairs
     */
    public appointmentPrototypePatchAttributes(id: string, data?: Appointment, extraHttpRequestParams?: any): Observable<Appointment> {
        return this.appointmentPrototypePatchAttributesWithHttpInfo(id, data, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Remove the examinations relation to an item by id.
     *
     * @param id Appointment id
     * @param fk Foreign key for examinations
     */
    public appointmentPrototypeUnlinkExaminations(id: string, fk: string, extraHttpRequestParams?: any): Observable<{}> {
        return this.appointmentPrototypeUnlinkExaminationsWithHttpInfo(id, fk, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Update attendance of this model.
     *
     * @param id Appointment id
     * @param data
     */
    public appointmentPrototypeUpdateAttendance(id: string, data?: Attendance, extraHttpRequestParams?: any): Observable<Attendance> {
        return this.appointmentPrototypeUpdateAttendanceWithHttpInfo(id, data, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Update a related item by id for examinations.
     *
     * @param id Appointment id
     * @param fk Foreign key for examinations
     * @param data
     */
    public appointmentPrototypeUpdateByIdExaminations(id: string, fk: string, data?: Service, extraHttpRequestParams?: any): Observable<Service> {
        return this.appointmentPrototypeUpdateByIdExaminationsWithHttpInfo(id, fk, data, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Replace attributes for a model instance and persist it into the data source.
     *
     * @param id Model id
     * @param data Model instance data
     */
    public appointmentReplaceByIdPostAppointmentsidReplace(id: string, data?: Appointment, extraHttpRequestParams?: any): Observable<Appointment> {
        return this.appointmentReplaceByIdPostAppointmentsidReplaceWithHttpInfo(id, data, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Replace attributes for a model instance and persist it into the data source.
     *
     * @param id Model id
     * @param data Model instance data
     */
    public appointmentReplaceByIdPutAppointmentsid(id: string, data?: Appointment, extraHttpRequestParams?: any): Observable<Appointment> {
        return this.appointmentReplaceByIdPutAppointmentsidWithHttpInfo(id, data, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Replace an existing model instance or insert a new one into the data source.
     *
     * @param data Model instance data
     */
    public appointmentReplaceOrCreatePostAppointmentsReplaceOrCreate(data?: Appointment, extraHttpRequestParams?: any): Observable<Appointment> {
        return this.appointmentReplaceOrCreatePostAppointmentsReplaceOrCreateWithHttpInfo(data, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Replace an existing model instance or insert a new one into the data source.
     *
     * @param data Model instance data
     */
    public appointmentReplaceOrCreatePutAppointments(data?: Appointment, extraHttpRequestParams?: any): Observable<Appointment> {
        return this.appointmentReplaceOrCreatePutAppointmentsWithHttpInfo(data, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Update instances of the model matched by {{where}} from the data source.
     *
     * @param where Criteria to match model instances
     * @param data An object of model property name/value pairs
     */
    public appointmentUpdateAll(where?: string, data?: Appointment, extraHttpRequestParams?: any): Observable<InlineResponse2004> {
        return this.appointmentUpdateAllWithHttpInfo(where, data, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Update an existing model instance or insert a new one into the data source based on the where criteria.
     *
     * @param where Criteria to match model instances
     * @param data An object of model property name/value pairs
     */
    public appointmentUpsertWithWhere(where?: string, data?: Appointment, extraHttpRequestParams?: any): Observable<Appointment> {
        return this.appointmentUpsertWithWhereWithHttpInfo(where, data, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }


    /**
     * Accepts an offer by passing over the respective secret.
     *
     * @param offerSecret
     */
    public appointmentAcceptOfferWithHttpInfo(offerSecret: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/acceptOffer';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        // verify required parameter 'offerSecret' is not null or undefined
        if (offerSecret === null || offerSecret === undefined) {
            throw new Error('Required parameter offerSecret was null or undefined when calling appointmentAcceptOffer.');
        }
        if (offerSecret !== undefined) {
            queryParameters.set('offerSecret', <any>offerSecret);
        }


        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Count instances of the model matched by where from the data source.
     *
     * @param where Criteria to match model instances
     */
    public appointmentCountWithHttpInfo(where?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/count';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        if (where !== undefined) {
            queryParameters.set('where', <any>where);
        }


        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Create a new instance of the model and persist it into the data source.
     *
     * @param data Model instance data
     */
    public appointmentCreateWithHttpInfo(data?: Appointment, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/save';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }

        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        headers.set('Content-Type', 'application/json');

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            body: data == null ? '' : JSON.stringify(data), // https://github.com/angular/angular/issues/10612
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Create a change stream.
     *
     * @param options
     */
    public appointmentCreateChangeStreamGetAppointmentsChangeStreamWithHttpInfo(options?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/change-stream';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        if (options !== undefined) {
            queryParameters.set('options', <any>options);
        }


        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            responseType: ResponseContentType.Blob,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Create a change stream.
     *
     * @param options
     */
    public appointmentCreateChangeStreamPostAppointmentsChangeStreamWithHttpInfo(options?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/change-stream';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json',
            'application/x-www-form-urlencoded',
            'application/xml',
            'text/xml'
        ];
        let canConsumeForm = this.canConsumeForm(consumes);
        let useForm = false;
        let formParams = new (useForm ? FormData : URLSearchParams as any)() as {
          set(param: string, value: any): void;
        };

        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        if (options !== undefined) {
            formParams.set('options', <any>options);
        }

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            body: formParams,
            responseType: ResponseContentType.Blob,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Deletes all data.
     *
     */
    public appointmentDeleteAllAppointmentsWithHttpInfo(extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/deleteAll';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }

        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Delete,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Delete a model instance by {{id}} from the data source.
     *
     * @param id Model id
     */
    public appointmentDeleteByIdWithHttpInfo(id: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/${id}'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling appointmentDeleteById.');
        }

        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Delete,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Check whether a model instance exists in the data source.
     *
     * @param id Model id
     */
    public appointmentExistsGetAppointmentsidExistsWithHttpInfo(id: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/${id}/exists'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling appointmentExistsGetAppointmentsidExists.');
        }

        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Check whether a model instance exists in the data source.
     *
     * @param id Model id
     */
    public appointmentExistsHeadAppointmentsidWithHttpInfo(id: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/${id}'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling appointmentExistsHeadAppointmentsid.');
        }

        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Head,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Find all instances of the model matched by filter from the data source.
     *
     * @param filter Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({\&quot;something\&quot;:\&quot;value\&quot;})
     */
    public appointmentFindWithHttpInfo(filter?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/all';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        if (filter !== undefined) {
            queryParameters.set('filter', <any>filter);
        }


        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Find a model instance by {{id}} from the data source.
     *
     * @param id Model id
     * @param filter Filter defining fields and include - must be a JSON-encoded string ({\&quot;something\&quot;:\&quot;value\&quot;})
     */
    public appointmentFindByIdWithHttpInfo(id: string, filter?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointment/${id}'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling appointmentFindById.');
        }
        if (filter !== undefined) {
            queryParameters.set('filter', <any>filter);
        }


        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Find all instances of the model matched by filter from the data source, including resolved related instances.
     *
     * @param filter
     */
    public appointmentFindDeepWithHttpInfo(filter?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/all';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }

        if (filter !== undefined) {
            queryParameters.set('filter', <any>filter);
        }


        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Find first instance of the model matched by filter from the data source.
     *
     * @param filter Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({\&quot;something\&quot;:\&quot;value\&quot;})
     */
    public appointmentFindOneWithHttpInfo(filter?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/findOne';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        if (filter !== undefined) {
            queryParameters.set('filter', <any>filter);
        }


        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Finds free slots for an appointment with the specified duration.
     *
     * @param duration
     * @param serviceId
     * @param providerId
     * @param startDate
     */
    public appointmentFindTimeWithHttpInfo(duration: string, examinationId?: number, roomId?: number, startDate?: Date, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/findTime';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        // verify required parameter 'duration' is not null or undefined
        if (duration === null || duration === undefined) {
            throw new Error('Required parameter duration was null or undefined when calling appointmentFindTime.');
        }
        if (duration !== undefined) {
            queryParameters.set('duration', <any>duration);
        }

        if (examinationId !== undefined) {
            queryParameters.set('examinationId', <any>examinationId);
        }

        if (roomId !== undefined) {
            queryParameters.set('roomId', <any>roomId);
        }

        if (startDate !== undefined) {
            queryParameters.set('startDate', <any>startDate.toISOString());
        }


        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Deletes all data.
     *
     * @param freeDays
     * @param startDate
     * @param endDate
     */
    public appointmentGenerateRandomAppointmentsWithHttpInfo(freeDays?: string, startDate?: Date, endDate?: Date, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/generateRandomAppointments';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        if (freeDays !== undefined) {
            queryParameters.set('freeDays', <any>freeDays);
        }

        if (startDate !== undefined) {
            queryParameters.set('startDate', <any>startDate.toISOString());
        }

        if (endDate !== undefined) {
            queryParameters.set('endDate', <any>endDate.toISOString());
        }


        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Patch an existing model instance or insert a new one into the data source.
     *
     * @param data Model instance data
     */
    public appointmentPatchOrCreateWithHttpInfo(data?: Appointment, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }

        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        headers.set('Content-Type', 'application/json');

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Patch,
            headers: headers,
            body: data == null ? '' : JSON.stringify(data), // https://github.com/angular/angular/issues/10612
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Counts examinations of Appointment.
     *
     * @param id Appointment id
     * @param where Criteria to match model instances
     */
    public appointmentPrototypeCountExaminationsWithHttpInfo(id: string, where?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/${id}/services/count'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling appointmentPrototypeCountExaminations.');
        }
        if (where !== undefined) {
            queryParameters.set('where', <any>where);
        }


        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Creates a new instance in attendance of this model.
     *
     * @param id Appointment id
     * @param data
     */
    public appointmentPrototypeCreateAttendanceWithHttpInfo(id: string, data?: Attendance, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/${id}/attendance'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling appointmentPrototypeCreateAttendance.');
        }

        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        headers.set('Content-Type', 'application/json');

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            body: data == null ? '' : JSON.stringify(data), // https://github.com/angular/angular/issues/10612
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Creates a new instance in examinations of this model.
     *
     * @param id Appointment id
     * @param data
     */
    public appointmentPrototypeCreateExaminationsWithHttpInfo(id: string, data?: Service, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/${id}/services'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling appointmentPrototypeCreateExaminations.');
        }

        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        headers.set('Content-Type', 'application/json');

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            body: data == null ? '' : JSON.stringify(data), // https://github.com/angular/angular/issues/10612
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Deletes all examinations of this model.
     *
     * @param id Appointment id
     */
    public appointmentPrototypeDeleteExaminationsWithHttpInfo(id: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/${id}/services'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling appointmentPrototypeDeleteExaminations.');
        }

        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Delete,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Deletes attendance of this model.
     *
     * @param id Appointment id
     */
    public appointmentPrototypeDestroyAttendanceWithHttpInfo(id: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/${id}/attendance'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling appointmentPrototypeDestroyAttendance.');
        }

        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Delete,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Delete a related item by id for examinations.
     *
     * @param id Appointment id
     * @param fk Foreign key for examinations
     */
    public appointmentPrototypeDestroyByIdExaminationsWithHttpInfo(id: string, fk: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/${id}/services/${fk}'
                    .replace('${' + 'id' + '}', String(id))
                    .replace('${' + 'fk' + '}', String(fk));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling appointmentPrototypeDestroyByIdExaminations.');
        }
        // verify required parameter 'fk' is not null or undefined
        if (fk === null || fk === undefined) {
            throw new Error('Required parameter fk was null or undefined when calling appointmentPrototypeDestroyByIdExaminations.');
        }

        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Delete,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Check the existence of examinations relation to an item by id.
     *
     * @param id Appointment id
     * @param fk Foreign key for examinations
     */
    public appointmentPrototypeExistsExaminationsWithHttpInfo(id: string, fk: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/${id}/services/rel/${fk}'
                    .replace('${' + 'id' + '}', String(id))
                    .replace('${' + 'fk' + '}', String(fk));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling appointmentPrototypeExistsExaminations.');
        }
        // verify required parameter 'fk' is not null or undefined
        if (fk === null || fk === undefined) {
            throw new Error('Required parameter fk was null or undefined when calling appointmentPrototypeExistsExaminations.');
        }

        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Head,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Find a related item by id for examinations.
     *
     * @param id Appointment id
     * @param fk Foreign key for examinations
     */
    public appointmentPrototypeFindByIdExaminationsWithHttpInfo(id: string, fk: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/${id}/services/${fk}'
                    .replace('${' + 'id' + '}', String(id))
                    .replace('${' + 'fk' + '}', String(fk));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling appointmentPrototypeFindByIdExaminations.');
        }
        // verify required parameter 'fk' is not null or undefined
        if (fk === null || fk === undefined) {
            throw new Error('Required parameter fk was null or undefined when calling appointmentPrototypeFindByIdExaminations.');
        }

        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Fetches hasOne relation attendance.
     *
     * @param id Appointment id
     * @param refresh
     */
    public appointmentPrototypeGetAttendanceWithHttpInfo(id: string, refresh?: boolean, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/${id}/attendance'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling appointmentPrototypeGetAttendance.');
        }
        if (refresh !== undefined) {
            queryParameters.set('refresh', <any>refresh);
        }


        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Queries examinations of Appointment.
     *
     * @param id Appointment id
     * @param filter
     */
    public appointmentPrototypeGetExaminationsWithHttpInfo(id: string, filter?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/${id}/services'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling appointmentPrototypeGetExaminations.');
        }
        if (filter !== undefined) {
            queryParameters.set('filter', <any>filter);
        }


        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Fetches belongsTo relation client.
     *
     * @param id Appointment id
     * @param refresh
     */
    public appointmentPrototypeGetPatientWithHttpInfo(id: string, refresh?: boolean, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/${id}/client'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling appointmentPrototypeGetPatient.');
        }
        if (refresh !== undefined) {
            queryParameters.set('refresh', <any>refresh);
        }


        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Fetches belongsTo relation provider.
     *
     * @param id Appointment id
     * @param refresh
     */
    public appointmentPrototypeGetRoomWithHttpInfo(id: string, refresh?: boolean, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/${id}/provider'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling appointmentPrototypeGetRoom.');
        }
        if (refresh !== undefined) {
            queryParameters.set('refresh', <any>refresh);
        }


        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Add a related item by id for services.
     *
     * @param id Appointment id
     * @param fk Foreign key for examinations
     * @param data
     */
    public appointmentPrototypeLinkExaminationsWithHttpInfo(id: string, fk: string, data?: AppointmentProcedure, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/${id}/services/rel/${fk}'
                    .replace('${' + 'id' + '}', String(id))
                    .replace('${' + 'fk' + '}', String(fk));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling appointmentPrototypeLinkExaminations.');
        }
        // verify required parameter 'fk' is not null or undefined
        if (fk === null || fk === undefined) {
            throw new Error('Required parameter fk was null or undefined when calling appointmentPrototypeLinkExaminations.');
        }

        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        headers.set('Content-Type', 'application/json');

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Put,
            headers: headers,
            body: data == null ? '' : JSON.stringify(data), // https://github.com/angular/angular/issues/10612
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Patch attributes for a model instance and persist it into the data source.
     *
     * @param id Appointment id
     * @param data An object of model property name/value pairs
     */
    public appointmentPrototypePatchAttributesWithHttpInfo(id: string, data?: Appointment, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/save';
            //.replace('${' + 'id' + '}', String(id));
        data.id = Number(id);
        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling appointmentPrototypePatchAttributes.');
        }

        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        headers.set('Content-Type', 'application/json');

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            body: data == null ? '' : JSON.stringify(data), // https://github.com/angular/angular/issues/10612
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Remove the examinations relation to an item by id.
     *
     * @param id Appointment id
     * @param fk Foreign key for examinations
     */
    public appointmentPrototypeUnlinkExaminationsWithHttpInfo(id: string, fk: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/${id}/services/rel/${fk}'
                    .replace('${' + 'id' + '}', String(id))
                    .replace('${' + 'fk' + '}', String(fk));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling appointmentPrototypeUnlinkExaminations.');
        }
        // verify required parameter 'fk' is not null or undefined
        if (fk === null || fk === undefined) {
            throw new Error('Required parameter fk was null or undefined when calling appointmentPrototypeUnlinkExaminations.');
        }

        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Delete,
            headers: headers,
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Update attendance of this model.
     *
     * @param id Appointment id
     * @param data
     */
    public appointmentPrototypeUpdateAttendanceWithHttpInfo(id: string, data?: Attendance, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/${id}/attendance'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling appointmentPrototypeUpdateAttendance.');
        }

        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        headers.set('Content-Type', 'application/json');

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Put,
            headers: headers,
            body: data == null ? '' : JSON.stringify(data), // https://github.com/angular/angular/issues/10612
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Update a related item by id for examinations.
     *
     * @param id Appointment id
     * @param fk Foreign key for examinations
     * @param data
     */
    public appointmentPrototypeUpdateByIdExaminationsWithHttpInfo(id: string, fk: string, data?: Service, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/${id}/services/${fk}'
                    .replace('${' + 'id' + '}', String(id))
                    .replace('${' + 'fk' + '}', String(fk));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling appointmentPrototypeUpdateByIdExaminations.');
        }
        // verify required parameter 'fk' is not null or undefined
        if (fk === null || fk === undefined) {
            throw new Error('Required parameter fk was null or undefined when calling appointmentPrototypeUpdateByIdExaminations.');
        }

        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        headers.set('Content-Type', 'application/json');

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Put,
            headers: headers,
            body: data == null ? '' : JSON.stringify(data), // https://github.com/angular/angular/issues/10612
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Replace attributes for a model instance and persist it into the data source.
     *
     * @param id Model id
     * @param data Model instance data
     */
    public appointmentReplaceByIdPostAppointmentsidReplaceWithHttpInfo(id: string, data?: Appointment, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/${id}/replace'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling appointmentReplaceByIdPostAppointmentsidReplace.');
        }

        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        headers.set('Content-Type', 'application/json');

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            body: data == null ? '' : JSON.stringify(data), // https://github.com/angular/angular/issues/10612
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Replace attributes for a model instance and persist it into the data source.
     *
     * @param id Model id
     * @param data Model instance data
     */
    public appointmentReplaceByIdPutAppointmentsidWithHttpInfo(id: string, data?: Appointment, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointment/${id}'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling appointmentReplaceByIdPutAppointmentsid.');
        }

        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        headers.set('Content-Type', 'application/json');

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Put,
            headers: headers,
            body: data == null ? '' : JSON.stringify(data), // https://github.com/angular/angular/issues/10612
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Replace an existing model instance or insert a new one into the data source.
     *
     * @param data Model instance data
     */
    public appointmentReplaceOrCreatePostAppointmentsReplaceOrCreateWithHttpInfo(data?: Appointment, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/replaceOrCreate';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }

        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        headers.set('Content-Type', 'application/json');

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            body: data == null ? '' : JSON.stringify(data), // https://github.com/angular/angular/issues/10612
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Replace an existing model instance or insert a new one into the data source.
     *
     * @param data Model instance data
     */
    public appointmentReplaceOrCreatePutAppointmentsWithHttpInfo(data?: Appointment, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }

        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        headers.set('Content-Type', 'application/json');

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Put,
            headers: headers,
            body: data == null ? '' : JSON.stringify(data), // https://github.com/angular/angular/issues/10612
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Update instances of the model matched by {{where}} from the data source.
     *
     * @param where Criteria to match model instances
     * @param data An object of model property name/value pairs
     */
    public appointmentUpdateAllWithHttpInfo(where?: string, data?: Appointment, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/update';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        if (where !== undefined) {
            queryParameters.set('where', <any>where);
        }


        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        headers.set('Content-Type', 'application/json');

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            body: data == null ? '' : JSON.stringify(data), // https://github.com/angular/angular/issues/10612
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Update an existing model instance or insert a new one into the data source based on the where criteria.
     *
     * @param where Criteria to match model instances
     * @param data An object of model property name/value pairs
     */
    public appointmentUpsertWithWhereWithHttpInfo(where?: string, data?: Appointment, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/appointments/upsertWithWhere';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        if (where !== undefined) {
            queryParameters.set('where', <any>where);
        }


        // to determine the Accept header
        let produces: string[] = [
            'application/json',
            'application/xml',
            'text/xml',
            'application/javascript',
            'text/javascript'
        ];


        headers.set('Content-Type', 'application/json');

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            body: data == null ? '' : JSON.stringify(data), // https://github.com/angular/angular/issues/10612
            search: queryParameters
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

}
