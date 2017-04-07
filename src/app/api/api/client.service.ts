import { Inject, Injectable, Optional }                      from '@angular/core';
import { Http, Headers, URLSearchParams }                    from '@angular/http';
import { RequestMethod, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Response, ResponseContentType }                     from '@angular/http';

import { Observable }                                        from 'rxjs/Observable';
import '../rxjs-operators';

import { InlineResponse200 } from '../model/inlineResponse200';
import { InlineResponse2001 } from '../model/inlineResponse2001';
import { InlineResponse2003 } from '../model/inlineResponse2003';
import { InlineResponse2005 } from '../model/inlineResponse2005';
import { Client } from '../model/client';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';

@Injectable()
export class ClientService {
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
     * Count instances of the model matched by where from the data source.
     *
     * @param where Criteria to match model instances
     */
    public patientCount(where?: string, extraHttpRequestParams?: any): Observable<InlineResponse200> {
        return this.patientCountWithHttpInfo(where, extraHttpRequestParams)
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
    public patientCreate(data?: Client, extraHttpRequestParams?: any): Observable<Client> {
        return this.patientCreateWithHttpInfo(data, extraHttpRequestParams)
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
    public patientCreateChangeStreamGetPatientsChangeStream(options?: string, extraHttpRequestParams?: any): Observable<Blob> {
        return this.patientCreateChangeStreamGetPatientsChangeStreamWithHttpInfo(options, extraHttpRequestParams)
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
    public patientCreateChangeStreamPostPatientsChangeStream(options?: string, extraHttpRequestParams?: any): Observable<Blob> {
        return this.patientCreateChangeStreamPostPatientsChangeStreamWithHttpInfo(options, extraHttpRequestParams)
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
    public patientDeleteAllPatients(extraHttpRequestParams?: any): Observable<InlineResponse2003> {
        return this.patientDeleteAllPatientsWithHttpInfo(extraHttpRequestParams)
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
    public patientDeleteById(id: string, extraHttpRequestParams?: any): Observable<any> {
        return this.patientDeleteByIdWithHttpInfo(id, extraHttpRequestParams)
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
    public patientExistsGetPatientsidExists(id: string, extraHttpRequestParams?: any): Observable<InlineResponse2001> {
        return this.patientExistsGetPatientsidExistsWithHttpInfo(id, extraHttpRequestParams)
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
    public patientExistsHeadPatientsid(id: string, extraHttpRequestParams?: any): Observable<InlineResponse2001> {
        return this.patientExistsHeadPatientsidWithHttpInfo(id, extraHttpRequestParams)
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
    public patientFind(filter?: string, extraHttpRequestParams?: any): Observable<Array<Client>> {
        return this.patientFindWithHttpInfo(filter, extraHttpRequestParams)
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
    public patientFindById(id: string, filter?: string, extraHttpRequestParams?: any): Observable<Client> {
        return this.patientFindByIdWithHttpInfo(id, filter, extraHttpRequestParams)
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
    public patientFindOne(filter?: string, extraHttpRequestParams?: any): Observable<Client> {
        return this.patientFindOneWithHttpInfo(filter, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Insert sample data set of test patients.
     *
     * @param locale
     */
    public patientInsertTestData(locale?: string, extraHttpRequestParams?: any): Observable<InlineResponse2005> {
        return this.patientInsertTestDataWithHttpInfo(locale, extraHttpRequestParams)
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
    public patientPatchOrCreate(data?: Client, extraHttpRequestParams?: any): Observable<Client> {
        return this.patientPatchOrCreateWithHttpInfo(data, extraHttpRequestParams)
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
     * @param id Patient id
     * @param data An object of model property name/value pairs
     */
    public patientPrototypePatchAttributes(id: string, data?: Client, extraHttpRequestParams?: any): Observable<Client> {
        return this.patientPrototypePatchAttributesWithHttpInfo(id, data, extraHttpRequestParams)
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
    public patientReplaceByIdPostPatientsidReplace(id: string, data?: Client, extraHttpRequestParams?: any): Observable<Client> {
        return this.patientReplaceByIdPostPatientsidReplaceWithHttpInfo(id, data, extraHttpRequestParams)
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
    public patientReplaceByIdPutPatientsid(id: string, data?: Client, extraHttpRequestParams?: any): Observable<Client> {
        return this.patientReplaceByIdPutPatientsidWithHttpInfo(id, data, extraHttpRequestParams)
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
    public patientReplaceOrCreatePostPatientsReplaceOrCreate(data?: Client, extraHttpRequestParams?: any): Observable<Client> {
        return this.patientReplaceOrCreatePostPatientsReplaceOrCreateWithHttpInfo(data, extraHttpRequestParams)
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
    public patientReplaceOrCreatePutPatients(data?: Client, extraHttpRequestParams?: any): Observable<Client> {
        return this.patientReplaceOrCreatePutPatientsWithHttpInfo(data, extraHttpRequestParams)
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
    public patientUpdateAll(where?: string, data?: Client, extraHttpRequestParams?: any): Observable<InlineResponse2003> {
        return this.patientUpdateAllWithHttpInfo(where, data, extraHttpRequestParams)
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
    public patientUpsertWithWhere(where?: string, data?: Client, extraHttpRequestParams?: any): Observable<Client> {
        return this.patientUpsertWithWhereWithHttpInfo(where, data, extraHttpRequestParams)
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
    public patientCountWithHttpInfo(where?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/Patients/count';

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
    public patientCreateWithHttpInfo(data?: Client, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/client/save';

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
    public patientCreateChangeStreamGetPatientsChangeStreamWithHttpInfo(options?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/clients/change-stream';

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
    public patientCreateChangeStreamPostPatientsChangeStreamWithHttpInfo(options?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/clients/change-stream';

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
    public patientDeleteAllPatientsWithHttpInfo(extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/clients/deleteAll';

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
    public patientDeleteByIdWithHttpInfo(id: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/clientdelete/${id}'
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
            throw new Error('Required parameter id was null or undefined when calling clientDeleteById.');
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
    public patientExistsGetPatientsidExistsWithHttpInfo(id: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/client/${id}/exists'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845

        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling clientExistsGetClientsidExists.');
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
    public patientExistsHeadPatientsidWithHttpInfo(id: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/client/${id}'
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
            throw new Error('Required parameter id was null or undefined when calling clientExistsHeadClientsid.');
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
    public patientFindWithHttpInfo(filter?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/clients/all';

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
    public patientFindByIdWithHttpInfo(id: string, filter?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/client/${id}'
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
            throw new Error('Required parameter id was null or undefined when calling clientFindById.');
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
    public patientFindOneWithHttpInfo(filter?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/clients/findOne';

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
     * Insert sample data set of test patients.
     *
     * @param locale
     */
    public patientInsertTestDataWithHttpInfo(locale?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/clients/insertTestData';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        if (locale !== undefined) {
            queryParameters.set('locale', <any>locale);
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
    public patientPatchOrCreateWithHttpInfo(data?: Client, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/clients/all';

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
     * Patch attributes for a model instance and persist it into the data source.
     *
     * @param id Client id
     * @param data An object of model property name/value pairs
     */
    public patientPrototypePatchAttributesWithHttpInfo(id: string, data?: Client, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/client/${id}'
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
            throw new Error('Required parameter id was null or undefined when calling clientPrototypePatchAttributes.');
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
    public patientReplaceByIdPostPatientsidReplaceWithHttpInfo(id: string, data?: Client, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/client/${id}/replace'
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
            throw new Error('Required parameter id was null or undefined when calling clientReplaceByIdPostClientsidReplace.');
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
    public patientReplaceByIdPutPatientsidWithHttpInfo(id: string, data?: Client, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/client/${id}'
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
            throw new Error('Required parameter id was null or undefined when calling clientReplaceByIdPutClientsid.');
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
    public patientReplaceOrCreatePostPatientsReplaceOrCreateWithHttpInfo(data?: Client, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/client/replaceOrCreate';

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
    public patientReplaceOrCreatePutPatientsWithHttpInfo(data?: Client, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/Patients.json';

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
    public patientUpdateAllWithHttpInfo(where?: string, data?: Client, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/client/update';

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
    public patientUpsertWithWhereWithHttpInfo(where?: string, data?: Client, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/client/upsertWithWhere';

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
