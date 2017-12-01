import { IRestMethod, Rest, RestAction, RestRequestMethod } from 'rest-core';
import { IRestActionInner, IRestResponse } from 'rest-core/src/Declarations';
import { RestHandler } from 'rest-core/src/RestHandler';

import { ApiError, PaginatorInterface } from '../../models';
import { environment } from '../../../environments/environment';
import { AuthenticationManager } from '../authentication/authentication.manager';

export class AbstractRestClient<Entity, PartialEntity> extends Rest {

    @RestAction({
        method: RestRequestMethod.Get
    })
    public query: IRestMethod<{}, PaginatorInterface<Entity>>;

    @RestAction({
        path: '/{!_id}',
        method: RestRequestMethod.Get
    })
    public get: IRestMethod<{_id: string}, Entity>;

    @RestAction({
        method: RestRequestMethod.Post
    })
    public create: IRestMethod<Entity, Entity>;

    @RestAction({
        path: '/{!_id}',
        method: RestRequestMethod.Put
    })
    public update: IRestMethod<Entity, Entity>;

    @RestAction({
        path: '/{!_id}',
        method: RestRequestMethod.Patch
    })
    public patch: IRestMethod<PartialEntity, Entity>;

    @RestAction({
        path: '/{!_id}',
        method: RestRequestMethod.Delete
    })
    public remove: IRestMethod<{_id: string}, Entity>;

    constructor(requestHandler: RestHandler,
                protected authenticationManager: AuthenticationManager) {
        super(requestHandler);
    };

    public $getHeaders(): any {
        let headers: any = super.$getHeaders();
        headers.Authorization = this.authenticationManager.getToken();

        return headers;
    }

    public $getUrl(): any {
        return environment.baseUrl;
    }

    protected $handleErrorResponse(options: IRestActionInner, resp: IRestResponse): ApiError {
        let error = resp.body;
        if (error && error.hasOwnProperty('error') && error.hasOwnProperty('code')) {
            throw error;
        } else {
            throw {
                code: 'unknown.server.error',
                error: 'Unknown server error!'
            };
        }
    }
}
