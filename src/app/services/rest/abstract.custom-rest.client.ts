import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { AuthenticationManager } from '../authentication/authentication.manager';
import { environment } from '../../../environments/environment';
import { EntityInterface } from '../../models';

@Injectable()
export abstract class AbstractCustomRestClient<Entity extends EntityInterface,
    PartialEntity extends EntityInterface> {
    protected baseUrl: string;

    constructor(protected httpClient: HttpClient,
                protected authenticationManager: AuthenticationManager) {
        this.baseUrl = environment.baseUrl;
    }

    public query(): Observable<Entity[]> {
        return this.httpClient.get<Entity[]>(
            this.getUrl(),
            {headers: this.getHeaders()}
        );
    }

    public get(id: string): Observable<Entity> {
        return this.httpClient.get<Entity>(
            this.getUrl() + '/' + id,
            {headers: this.getHeaders()}
        );
    }

    public post(entity: Entity) {
        return this.httpClient.post<Entity>(
            this.getUrl(),
            entity,
            {headers: this.getHeaders()}
        );
    }

    public put(entity: Entity) {
        return this.httpClient.put<Entity>(
            this.getUrl() + '/' + entity.id,
            entity,
            {headers: this.getHeaders()}
        );
    }

    public patch(entity: PartialEntity) {
        return this.httpClient.patch<Entity>(
            this.getUrl() + '/' + entity.id,
            entity,
            {headers: this.getHeaders()}
        );
    }

    public delete(id: string) {
        return this.httpClient.delete<{message: string}>(
            this.getUrl() + '/' + id,
            {headers: this.getHeaders()}
        );
    }

    protected getUrl(): string {
        return this.baseUrl;
    }

    protected getHeaders(): HttpHeaders {
        let headers = new HttpHeaders();
        headers.set('authorization', this.authenticationManager.getToken());

        return headers;
    }
}
