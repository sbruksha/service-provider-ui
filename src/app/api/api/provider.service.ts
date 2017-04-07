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
import { Provider } from '../model/provider';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';

@Injectable()
export class ProviderService {
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
    public roomCount(where?: string, extraHttpRequestParams?: any): Observable<InlineResponse200> {
        return this.roomCountWithHttpInfo(where, extraHttpRequestParams)
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
    public roomCreate(data?: Provider, extraHttpRequestParams?: any): Observable<Provider> {
        return this.roomCreateWithHttpInfo(data, extraHttpRequestParams)
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
    public roomCreateChangeStreamGetRoomsChangeStream(options?: string, extraHttpRequestParams?: any): Observable<Blob> {
        return this.roomCreateChangeStreamGetRoomsChangeStreamWithHttpInfo(options, extraHttpRequestParams)
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
    public roomCreateChangeStreamPostRoomsChangeStream(options?: string, extraHttpRequestParams?: any): Observable<Blob> {
        return this.roomCreateChangeStreamPostRoomsChangeStreamWithHttpInfo(options, extraHttpRequestParams)
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
    public roomDeleteAllRooms(extraHttpRequestParams?: any): Observable<InlineResponse2003> {
        return this.roomDeleteAllRoomsWithHttpInfo(extraHttpRequestParams)
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
    public roomDeleteById(id: string, extraHttpRequestParams?: any): Observable<any> {
        return this.roomDeleteByIdWithHttpInfo(id, extraHttpRequestParams)
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
    public roomExistsGetRoomsidExists(id: string, extraHttpRequestParams?: any): Observable<InlineResponse2001> {
        return this.roomExistsGetRoomsidExistsWithHttpInfo(id, extraHttpRequestParams)
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
    public roomExistsHeadRoomsid(id: string, extraHttpRequestParams?: any): Observable<InlineResponse2001> {
        return this.roomExistsHeadRoomsidWithHttpInfo(id, extraHttpRequestParams)
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
    public roomFind(filter?: string, extraHttpRequestParams?: any): Observable<Array<Provider>> {
        return this.roomFindWithHttpInfo(filter, extraHttpRequestParams)
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
    public roomFindById(id: string, filter?: string, extraHttpRequestParams?: any): Observable<Provider> {
        return this.roomFindByIdWithHttpInfo(id, filter, extraHttpRequestParams)
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
    public roomFindOne(filter?: string, extraHttpRequestParams?: any): Observable<Provider> {
        return this.roomFindOneWithHttpInfo(filter, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * Insert sample data set of test rooms.
     *
     * @param locale
     */
    public roomInsertTestData(locale?: string, extraHttpRequestParams?: any): Observable<InlineResponse2005> {
        return this.roomInsertTestDataWithHttpInfo(locale, extraHttpRequestParams)
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
    public roomPatchOrCreate(data?: Provider, extraHttpRequestParams?: any): Observable<Provider> {
        return this.roomPatchOrCreateWithHttpInfo(data, extraHttpRequestParams)
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
     * @param id Provider id
     * @param data An object of model property name/value pairs
     */
    public roomPrototypePatchAttributes(id: string, data?: Provider, extraHttpRequestParams?: any): Observable<Provider> {
        return this.roomPrototypePatchAttributesWithHttpInfo(id, data, extraHttpRequestParams)
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
    public roomReplaceByIdPostRoomsidReplace(id: string, data?: Provider, extraHttpRequestParams?: any): Observable<Provider> {
        return this.roomReplaceByIdPostRoomsidReplaceWithHttpInfo(id, data, extraHttpRequestParams)
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
    public roomReplaceByIdPutRoomsid(id: string, data?: Provider, extraHttpRequestParams?: any): Observable<Provider> {
        return this.roomReplaceByIdPutRoomsidWithHttpInfo(id, data, extraHttpRequestParams)
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
    public roomReplaceOrCreatePostRoomsReplaceOrCreate(data?: Provider, extraHttpRequestParams?: any): Observable<Provider> {
        return this.roomReplaceOrCreatePostRoomsReplaceOrCreateWithHttpInfo(data, extraHttpRequestParams)
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
    public roomReplaceOrCreatePutRooms(data?: Provider, extraHttpRequestParams?: any): Observable<Provider> {
        return this.roomReplaceOrCreatePutRoomsWithHttpInfo(data, extraHttpRequestParams)
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
    public roomUpdateAll(where?: string, data?: Provider, extraHttpRequestParams?: any): Observable<InlineResponse2003> {
        return this.roomUpdateAllWithHttpInfo(where, data, extraHttpRequestParams)
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
    public roomUpsertWithWhere(where?: string, data?: Provider, extraHttpRequestParams?: any): Observable<Provider> {
        return this.roomUpsertWithWhereWithHttpInfo(where, data, extraHttpRequestParams)
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
    public roomCountWithHttpInfo(where?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/provider/count';

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
    public roomCreateWithHttpInfo(data?: Provider, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/providers/create';

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
    public roomCreateChangeStreamGetRoomsChangeStreamWithHttpInfo(options?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/providers/change-stream';

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
    public roomCreateChangeStreamPostRoomsChangeStreamWithHttpInfo(options?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/providers/change-stream';

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
    public roomDeleteAllRoomsWithHttpInfo(extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/providers/deleteAll';

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
    public roomDeleteByIdWithHttpInfo(id: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/providers/${id}'
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
            throw new Error('Required parameter id was null or undefined when calling roomDeleteById.');
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
    public roomExistsGetRoomsidExistsWithHttpInfo(id: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/provider/${id}/exists'
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
            throw new Error('Required parameter id was null or undefined when calling roomExistsGetRoomsidExists.');
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
    public roomExistsHeadRoomsidWithHttpInfo(id: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/provider/${id}'
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
            throw new Error('Required parameter id was null or undefined when calling providerExistsHeadRoomsid.');
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
    public roomFindWithHttpInfo(filter?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/providers/all';

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
    public roomFindByIdWithHttpInfo(id: string, filter?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/provider/${id}'
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
            throw new Error('Required parameter id was null or undefined when calling providerFindById.');
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
    public roomFindOneWithHttpInfo(filter?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/provider/findOne';

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
     * Insert sample data set of test rooms.
     *
     * @param locale
     */
    public roomInsertTestDataWithHttpInfo(locale?: string, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/providers/insertTestData';

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
    public roomPatchOrCreateWithHttpInfo(data?: Provider, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/providers';

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
     * @param id Provider id
     * @param data An object of model property name/value pairs
     */
    public roomPrototypePatchAttributesWithHttpInfo(id: string, data?: Provider, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/provider/${id}'
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
            throw new Error('Required parameter id was null or undefined when calling roomPrototypePatchAttributes.');
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
    public roomReplaceByIdPostRoomsidReplaceWithHttpInfo(id: string, data?: Provider, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/provider/${id}/replace'
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
            throw new Error('Required parameter id was null or undefined when calling roomReplaceByIdPostRoomsidReplace.');
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
    public roomReplaceByIdPutRoomsidWithHttpInfo(id: string, data?: Provider, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/provider/${id}'
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
            throw new Error('Required parameter id was null or undefined when calling roomReplaceByIdPutRoomsid.');
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
    public roomReplaceOrCreatePostRoomsReplaceOrCreateWithHttpInfo(data?: Provider, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/providers/replaceOrCreate';

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
    public roomReplaceOrCreatePutRoomsWithHttpInfo(data?: Provider, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/providers';

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
    public roomUpdateAllWithHttpInfo(where?: string, data?: Provider, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/providers/update';

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
    public roomUpsertWithWhereWithHttpInfo(where?: string, data?: Provider, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/providers/upsertWithWhere';

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
