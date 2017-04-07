import { Inject, Injectable, Optional }                      from '@angular/core';
import { Http, Headers, URLSearchParams }                    from '@angular/http';
import { RequestMethod, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Response, ResponseContentType }                     from '@angular/http';

import { Observable }                                        from 'rxjs/Observable';
import '../rxjs-operators';

import { Appointment } from '../model/appointment';
import { InlineResponse200 } from '../model/inlineResponse200';
import { InlineResponse2001 } from '../model/inlineResponse2001';
import { Notification } from '../model/notification';
import { Client } from '../model/client';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';

/* tslint:disable:no-unused-variable member-ordering */


@Injectable()
export class NotificationService {
    protected basePath = 'http://localhost:3000/api';
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
     * Count instances of the model matched by where from the data source.
     *
     * @param where Criteria to match model instances
     */
    public notificationCount(where?: string, extraHttpRequestParams?: any): Observable<InlineResponse200> {
        return this.notificationCountWithHttpInfo(where, extraHttpRequestParams)
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
    public notificationCreate(data?: Notification, extraHttpRequestParams?: any): Observable<Notification> {
        return this.notificationCreateWithHttpInfo(data, extraHttpRequestParams)
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
    public notificationCreateChangeStreamGetNotificationsChangeStream(options?: string, extraHttpRequestParams?: any): Observable<Blob> {
        return this.notificationCreateChangeStreamGetNotificationsChangeStreamWithHttpInfo(options, extraHttpRequestParams)
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
    public notificationCreateChangeStreamPostNotificationsChangeStream(options?: string, extraHttpRequestParams?: any): Observable<Blob> {
        return this.notificationCreateChangeStreamPostNotificationsChangeStreamWithHttpInfo(options, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.blob();
                }
            });
    }

    /**
     * Delete a model instance by {{id}} from the data source.
     *
     * @param id Model id
     */
    public notificationDeleteById(id: string, extraHttpRequestParams?: any): Observable<any> {
        return this.notificationDeleteByIdWithHttpInfo(id, extraHttpRequestParams)
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
    public notificationExistsGetNotificationsidExists(id: string, extraHttpRequestParams?: any): Observable<InlineResponse2001> {
        return this.notificationExistsGetNotificationsidExistsWithHttpInfo(id, extraHttpRequestParams)
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
    public notificationExistsHeadNotificationsid(id: string, extraHttpRequestParams?: any): Observable<InlineResponse2001> {
        return this.notificationExistsHeadNotificationsidWithHttpInfo(id, extraHttpRequestParams)
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
    public notificationFind(filter?: string, extraHttpRequestParams?: any): Observable<Array<Notification>> {
        return this.notificationFindWithHttpInfo(filter, extraHttpRequestParams)
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
    public notificationFindById(id: string, filter?: string, extraHttpRequestParams?: any): Observable<Notification> {
        return this.notificationFindByIdWithHttpInfo(id, filter, extraHttpRequestParams)
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
    public notificationFindOne(filter?: string, extraHttpRequestParams?: any): Observable<Notification> {
        return this.notificationFindOneWithHttpInfo(filter, extraHttpRequestParams)
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
    public notificationPatchOrCreate(data?: Notification, extraHttpRequestParams?: any): Observable<Notification> {
        return this.notificationPatchOrCreateWithHttpInfo(data, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Fetches belongsTo relation appointment.
     *
     * @param id Notification id
     * @param refresh
     */
    public notificationPrototypeGetAppointment(id: string, refresh?: boolean, extraHttpRequestParams?: any): Observable<Appointment> {
        return this.notificationPrototypeGetAppointmentWithHttpInfo(id, refresh, extraHttpRequestParams)
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
     * @param id Notification id
     * @param refresh
     */
    public notificationPrototypeGetPatient(id: string, refresh?: boolean, extraHttpRequestParams?: any): Observable<Client> {
        return this.notificationPrototypeGetPatientWithHttpInfo(id, refresh, extraHttpRequestParams)
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
     * @param id Notification id
     * @param data An object of model property name/value pairs
     */
    public notificationPrototypePatchAttributes(id: string, data?: Notification, extraHttpRequestParams?: any): Observable<Notification> {
        return this.notificationPrototypePatchAttributesWithHttpInfo(id, data, extraHttpRequestParams)
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
    public notificationReplaceByIdPostNotificationsidReplace(id: string, data?: Notification, extraHttpRequestParams?: any): Observable<Notification> {
        return this.notificationReplaceByIdPostNotificationsidReplaceWithHttpInfo(id, data, extraHttpRequestParams)
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
    public notificationReplaceByIdPutNotificationsid(id: string, data?: Notification, extraHttpRequestParams?: any): Observable<Notification> {
        return this.notificationReplaceByIdPutNotificationsidWithHttpInfo(id, data, extraHttpRequestParams)
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
    public notificationReplaceOrCreatePostNotificationsReplaceOrCreate(data?: Notification, extraHttpRequestParams?: any): Observable<Notification> {
        return this.notificationReplaceOrCreatePostNotificationsReplaceOrCreateWithHttpInfo(data, extraHttpRequestParams)
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
    public notificationReplaceOrCreatePutNotifications(data?: Notification, extraHttpRequestParams?: any): Observable<Notification> {
        return this.notificationReplaceOrCreatePutNotificationsWithHttpInfo(data, extraHttpRequestParams)
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
    public notificationUpdateAll(where?: string, data?: Notification, extraHttpRequestParams?: any): Observable<InlineResponse2001> {
        return this.notificationUpdateAllWithHttpInfo(where, data, extraHttpRequestParams)
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
    public notificationUpsertWithWhere(where?: string, data?: Notification, extraHttpRequestParams?: any): Observable<Notification> {
        return this.notificationUpsertWithWhereWithHttpInfo(where, data, extraHttpRequestParams)
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
    public notificationCountWithHttpInfo(where?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/Notifications/count';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845

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
    public notificationCreateWithHttpInfo(data?: Notification, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/Notifications';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845


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
    public notificationCreateChangeStreamGetNotificationsChangeStreamWithHttpInfo(options?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/Notifications/change-stream';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845

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
    public notificationCreateChangeStreamPostNotificationsChangeStreamWithHttpInfo(options?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/Notifications/change-stream';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845

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
     * Delete a model instance by {{id}} from the data source.
     *
     * @param id Model id
     */
    public notificationDeleteByIdWithHttpInfo(id: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/Notifications/${id}'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845

        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling notificationDeleteById.');
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
    public notificationExistsGetNotificationsidExistsWithHttpInfo(id: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/Notifications/${id}/exists'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845

        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling notificationExistsGetNotificationsidExists.');
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
    public notificationExistsHeadNotificationsidWithHttpInfo(id: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/Notifications/${id}'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845

        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling notificationExistsHeadNotificationsid.');
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
    public notificationFindWithHttpInfo(filter?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/Notifications';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845

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
    public notificationFindByIdWithHttpInfo(id: string, filter?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/Notifications/${id}'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845

        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling notificationFindById.');
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
    public notificationFindOneWithHttpInfo(filter?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/Notifications/findOne';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845

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
     * Patch an existing model instance or insert a new one into the data source.
     *
     * @param data Model instance data
     */
    public notificationPatchOrCreateWithHttpInfo(data?: Notification, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/Notifications';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845


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
     * Fetches belongsTo relation appointment.
     *
     * @param id Notification id
     * @param refresh
     */
    public notificationPrototypeGetAppointmentWithHttpInfo(id: string, refresh?: boolean, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/Notifications/${id}/appointment'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845

        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling notificationPrototypeGetAppointment.');
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
     * Fetches belongsTo relation client.
     *
     * @param id Notification id
     * @param refresh
     */
    public notificationPrototypeGetPatientWithHttpInfo(id: string, refresh?: boolean, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/Notifications/${id}/client'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845

        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling notificationPrototypeGetclient.');
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
     * Patch attributes for a model instance and persist it into the data source.
     *
     * @param id Notification id
     * @param data An object of model property name/value pairs
     */
    public notificationPrototypePatchAttributesWithHttpInfo(id: string, data?: Notification, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/Notifications/${id}'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845

        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling notificationPrototypePatchAttributes.');
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
     * Replace attributes for a model instance and persist it into the data source.
     *
     * @param id Model id
     * @param data Model instance data
     */
    public notificationReplaceByIdPostNotificationsidReplaceWithHttpInfo(id: string, data?: Notification, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/Notifications/${id}/replace'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845

        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling notificationReplaceByIdPostNotificationsidReplace.');
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
    public notificationReplaceByIdPutNotificationsidWithHttpInfo(id: string, data?: Notification, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/Notifications/${id}'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845

        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling notificationReplaceByIdPutNotificationsid.');
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
    public notificationReplaceOrCreatePostNotificationsReplaceOrCreateWithHttpInfo(data?: Notification, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/Notifications/replaceOrCreate';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845


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
    public notificationReplaceOrCreatePutNotificationsWithHttpInfo(data?: Notification, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/Notifications';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845


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
    public notificationUpdateAllWithHttpInfo(where?: string, data?: Notification, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/Notifications/update';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845

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
    public notificationUpsertWithWhereWithHttpInfo(where?: string, data?: Notification, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/Notifications/upsertWithWhere';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845

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
