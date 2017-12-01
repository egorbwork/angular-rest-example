import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

import { AuthenticationManager } from '../authentication/authentication.manager';
import { environment } from '../../../environments/environment';
import { ApiError, EntityInterface, PaginatorInterface } from '../../models';

@Injectable()
export abstract class AbstractCustomRestClient<Entity extends EntityInterface,
    PartialEntity extends EntityInterface> {
    protected baseUrl: string;

    constructor(protected httpClient: HttpClient,
                protected authenticationManager: AuthenticationManager) {
        this.baseUrl = environment.baseUrl;
    }

    public query(): Observable<PaginatorInterface<Entity>> {
        let requestObservable =  this.httpClient.get<PaginatorInterface<Entity>>(
            this.getUrl(),
            {headers: this.getHeaders()}
        );
        return Observable.create(
            (subscriber: Subscriber<PaginatorInterface<Entity>>) => {
                requestObservable.subscribe(
                    (responseEntity: PaginatorInterface<Entity>) => {
                        subscriber.next(responseEntity);
                    },
                    (errorResponse: HttpErrorResponse) => {
                        let error = this.processError(errorResponse);
                        return subscriber.error(error);
                    },
                    () => subscriber.complete()
                );
            }
        );
    }

    public get(id: string): Observable<Entity> {
        let requestObservable =  this.httpClient.get<Entity>(
            this.getUrl() + '/' + id,
            {headers: this.getHeaders()}
        );
        return Observable.create(
            (subscriber: Subscriber<Entity>) => {
                requestObservable.subscribe(
                    (responseEntity: Entity) => {
                        subscriber.next(responseEntity);
                    },
                    (errorResponse: HttpErrorResponse) => {
                        let error = this.processError(errorResponse);
                        return subscriber.error(error);
                    },
                    () => subscriber.complete()
                );
            }
        );
    }

    public create(entity: Entity): Observable<Entity> {
        let requestObservable =  this.httpClient.post<Entity>(
            this.getUrl(),
            entity,
            {headers: this.getHeaders()}
        );
        return Observable.create(
            (subscriber: Subscriber<Entity>) => {
                requestObservable.subscribe(
                    (responseEntity: Entity) => {
                        subscriber.next(responseEntity);
                    },
                    (errorResponse: HttpErrorResponse) => {
                        let error = this.processError(errorResponse);
                        return subscriber.error(error);
                    },
                    () => subscriber.complete()
                );
            }
        );
    }

    public update(entity: Entity): Observable<Entity> {
        let requestObservable =  this.httpClient.put<Entity>(
            this.getUrl() + '/' + entity._id,
            entity,
            {headers: this.getHeaders()}
        );
        return Observable.create(
            (subscriber: Subscriber<Entity>) => {
                requestObservable.subscribe(
                    (responseEntity: Entity) => {
                        subscriber.next(responseEntity);
                    },
                    (errorResponse: HttpErrorResponse) => {
                        let error = this.processError(errorResponse);
                        return subscriber.error(error);
                    },
                    () => subscriber.complete()
                );
            }
        );
    }

    public patch(entity: PartialEntity): Observable<Entity> {
        let requestObservable = this.httpClient.patch<Entity>(
            this.getUrl() + '/' + entity._id,
            entity,
            {headers: this.getHeaders()}
        );
        return Observable.create(
            (subscriber: Subscriber<Entity>) => {
                requestObservable.subscribe(
                    (responseEntity: Entity) => {
                        subscriber.next(responseEntity);
                    },
                    (errorResponse: HttpErrorResponse) => {
                        let error = this.processError(errorResponse);
                        return subscriber.error(error);
                    },
                    () => subscriber.complete()
                );
            }
        );
    }

    public remove(id: string): Observable<Entity> {
        let requestObservable = this.httpClient.delete<{message: string}>(
            this.getUrl() + '/' + id,
            {headers: this.getHeaders()}
        );
        return Observable.create(
            (subscriber: Subscriber<{message: string}>) => {
                requestObservable.subscribe(
                    (responseEntity: {message: string}) => {
                        subscriber.next(responseEntity);
                    },
                    (errorResponse: HttpErrorResponse) => {
                        let error = this.processError(errorResponse);
                        return subscriber.error(error);
                    },
                    () => subscriber.complete()
                );
            }
        );
    }

    protected processError(errorResponse: HttpErrorResponse): ApiError {
        console.log(errorResponse);
        if (errorResponse.error) {
            return errorResponse.error;
        } else {
            console.log(errorResponse.error);
            let error: ApiError = {
                code: 'unknown.server.error',
                error: 'Unknown server error!'
            };
            return error;
        }
    }

    protected getUrl(): string {
        return this.baseUrl;
    }

    protected getHeaders(): HttpHeaders {
        return new HttpHeaders({authorization: this.authenticationManager.getToken()});
    }
}
