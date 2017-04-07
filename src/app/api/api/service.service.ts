import { Inject, Injectable, Optional }                      from '@angular/core';
import { Http, Headers, URLSearchParams }                    from '@angular/http';
import { RequestMethod, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Response, ResponseContentType }                     from '@angular/http';

import { Observable }                                        from 'rxjs/Observable';
import '../rxjs-operators';

import { Service } from '../model/service';
import { InlineResponse200 } from '../model/inlineResponse200';
import { InlineResponse2001 } from '../model/inlineResponse2001';
import { InlineResponse2003 } from '../model/inlineResponse2003';
import { InlineResponse2005 } from '../model/inlineResponse2005';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';

@Injectable()
export class ServiceService {
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
    public examinationCount(where?: string, extraHttpRequestParams?: any): Observable<InlineResponse200> {
        return this.examinationCountWithHttpInfo(where, extraHttpRequestParams)
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
    public examinationCreate(data?: Service, extraHttpRequestParams?: any): Observable<Service> {
        return this.examinationCreateWithHttpInfo(data, extraHttpRequestParams)
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
    public examinationCreateChangeStreamGetExaminationsChangeStream(options?: string, extraHttpRequestParams?: any): Observable<Blob> {
        return this.examinationCreateChangeStreamGetExaminationsChangeStreamWithHttpInfo(options, extraHttpRequestParams)
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
    public examinationCreateChangeStreamPostExaminationsChangeStream(options?: string, extraHttpRequestParams?: any): Observable<Blob> {
        return this.examinationCreateChangeStreamPostExaminationsChangeStreamWithHttpInfo(options, extraHttpRequestParams)
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
    public examinationDeleteAllExaminations(extraHttpRequestParams?: any): Observable<InlineResponse2003> {
        return this.examinationDeleteAllExaminationsWithHttpInfo(extraHttpRequestParams)
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
    public examinationDeleteById(id: string, extraHttpRequestParams?: any): Observable<any> {
        return this.examinationDeleteByIdWithHttpInfo(id, extraHttpRequestParams)
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
    public examinationExistsGetExaminationsidExists(id: string, extraHttpRequestParams?: any): Observable<InlineResponse2001> {
        return this.examinationExistsGetExaminationsidExistsWithHttpInfo(id, extraHttpRequestParams)
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
    public examinationExistsHeadExaminationsid(id: string, extraHttpRequestParams?: any): Observable<InlineResponse2001> {
        return this.examinationExistsHeadExaminationsidWithHttpInfo(id, extraHttpRequestParams)
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
    public examinationFind(filter?: string, extraHttpRequestParams?: any): Observable<Array<Service>> {
        return this.examinationFindWithHttpInfo(filter, extraHttpRequestParams)
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
    public examinationFindById(id: string, filter?: string, extraHttpRequestParams?: any): Observable<Service> {
        return this.examinationFindByIdWithHttpInfo(id, filter, extraHttpRequestParams)
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
    public examinationFindOne(filter?: string, extraHttpRequestParams?: any): Observable<Service> {
        return this.examinationFindOneWithHttpInfo(filter, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Insert sample data set of test examinations.
     *
     * @param sectionNumber The section number according to http://icd9cm.chrisendres.com/index.php?action&#x3D;procslist, e.g. \&quot;3\&quot;, \&quot;3A\&quot; or \&quot;12\&quot;.
     * @param locale The locale to use for test examinations. Defaults to \&quot;en_US\&quot;. Currently only \&quot;de_**\&quot; are available.
     */
    public examinationInsertTestData(sectionNumber: string, locale?: string, extraHttpRequestParams?: any): Observable<InlineResponse2005> {
        return this.examinationInsertTestDataWithHttpInfo(sectionNumber, locale, extraHttpRequestParams)
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
    public examinationPatchOrCreate(data?: Service, extraHttpRequestParams?: any): Observable<Service> {
        return this.examinationPatchOrCreateWithHttpInfo(data, extraHttpRequestParams)
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
     * @param id Service id
     * @param data An object of model property name/value pairs
     */
    public examinationPrototypePatchAttributes(id: string, data?: Service, extraHttpRequestParams?: any): Observable<Service> {
        return this.examinationPrototypePatchAttributesWithHttpInfo(id, data, extraHttpRequestParams)
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
    public examinationReplaceByIdPostExaminationsidReplace(id: string, data?: Service, extraHttpRequestParams?: any): Observable<Service> {
        return this.examinationReplaceByIdPostExaminationsidReplaceWithHttpInfo(id, data, extraHttpRequestParams)
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
    public examinationReplaceByIdPutExaminationsid(id: string, data?: Service, extraHttpRequestParams?: any): Observable<Service> {
        return this.examinationReplaceByIdPutExaminationsidWithHttpInfo(id, data, extraHttpRequestParams)
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
    public examinationReplaceOrCreatePostExaminationsReplaceOrCreate(data?: Service, extraHttpRequestParams?: any): Observable<Service> {
        return this.examinationReplaceOrCreatePostExaminationsReplaceOrCreateWithHttpInfo(data, extraHttpRequestParams)
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
    public examinationReplaceOrCreatePutExaminations(data?: Service, extraHttpRequestParams?: any): Observable<Service> {
        return this.examinationReplaceOrCreatePutExaminationsWithHttpInfo(data, extraHttpRequestParams)
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
    public examinationUpdateAll(where?: string, data?: Service, extraHttpRequestParams?: any): Observable<InlineResponse2003> {
        return this.examinationUpdateAllWithHttpInfo(where, data, extraHttpRequestParams)
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
    public examinationUpsertWithWhere(where?: string, data?: Service, extraHttpRequestParams?: any): Observable<Service> {
        return this.examinationUpsertWithWhereWithHttpInfo(where, data, extraHttpRequestParams)
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
    public examinationCountWithHttpInfo(where?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/services/count';

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
    public examinationCreateWithHttpInfo(data?: Service, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/services/create';

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
    public examinationCreateChangeStreamGetExaminationsChangeStreamWithHttpInfo(options?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/services/change-stream';

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
    public examinationCreateChangeStreamPostExaminationsChangeStreamWithHttpInfo(options?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/services/change-stream';

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
    public examinationDeleteAllExaminationsWithHttpInfo(extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/services/deleteAll';

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
    public examinationDeleteByIdWithHttpInfo(id: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/services/${id}'
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
            throw new Error('Required parameter id was null or undefined when calling examinationDeleteById.');
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
    public examinationExistsGetExaminationsidExistsWithHttpInfo(id: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/service/${id}/exists'
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
            throw new Error('Required parameter id was null or undefined when calling examinationExistsGetExaminationsidExists.');
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
    public examinationExistsHeadExaminationsidWithHttpInfo(id: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/service/${id}'
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
            throw new Error('Required parameter id was null or undefined when calling examinationExistsHeadExaminationsid.');
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
    public examinationFindWithHttpInfo(filter?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/services/all';

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
    public examinationFindByIdWithHttpInfo(id: string, filter?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/service/${id}'
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
            throw new Error('Required parameter id was null or undefined when calling serviceFindById.');
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
    public examinationFindOneWithHttpInfo(filter?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/services/findOne';

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
     * Insert sample data set of test examinations.
     *
     * @param sectionNumber The section number according to http://icd9cm.chrisendres.com/index.php?action&#x3D;procslist, e.g. \&quot;3\&quot;, \&quot;3A\&quot; or \&quot;12\&quot;.
     * @param locale The locale to use for test examinations. Defaults to \&quot;en_US\&quot;. Currently only \&quot;de_**\&quot; are available.
     */
    public examinationInsertTestDataWithHttpInfo(sectionNumber: string, locale?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/services/insertTestData';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        if (localStorage.getItem('currentUser')) {
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let token = currentUser && currentUser.token;
          this.createAuthorizationHeader(headers,'Authorization',token);
        }
        // verify required parameter 'sectionNumber' is not null or undefined
        if (sectionNumber === null || sectionNumber === undefined) {
            throw new Error('Required parameter sectionNumber was null or undefined when calling examinationInsertTestData.');
        }
        if (sectionNumber !== undefined) {
            queryParameters.set('sectionNumber', <any>sectionNumber);
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
    public examinationPatchOrCreateWithHttpInfo(data?: Service, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/services';

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
     * @param id Service id
     * @param data An object of model property name/value pairs
     */
    public examinationPrototypePatchAttributesWithHttpInfo(id: string, data?: Service, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/service/${id}'
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
            throw new Error('Required parameter id was null or undefined when calling examinationPrototypePatchAttributes.');
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
    public examinationReplaceByIdPostExaminationsidReplaceWithHttpInfo(id: string, data?: Service, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/service/${id}/replace'
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
            throw new Error('Required parameter id was null or undefined when calling examinationReplaceByIdPostExaminationsidReplace.');
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
    public examinationReplaceByIdPutExaminationsidWithHttpInfo(id: string, data?: Service, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/service/${id}'
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
            throw new Error('Required parameter id was null or undefined when calling examinationReplaceByIdPutExaminationsid.');
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
    public examinationReplaceOrCreatePostExaminationsReplaceOrCreateWithHttpInfo(data?: Service, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/services/replaceOrCreate';

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
    public examinationReplaceOrCreatePutExaminationsWithHttpInfo(data?: Service, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/services';

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
    public examinationUpdateAllWithHttpInfo(where?: string, data?: Service, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/services/update';

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
    public examinationUpsertWithWhereWithHttpInfo(where?: string, data?: Service, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/services/upsertWithWhere';

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
