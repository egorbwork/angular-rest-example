import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RestHandlerHttpClient } from 'rest-ngx';
import { IRestRequest, IRestResponse } from 'rest-core';

@Injectable()
export class LocalRestHandler extends RestHandlerHttpClient {
    protected handleResponse(req: IRestRequest, response: HttpResponse<any>): IRestResponse {
        let restResponse = super.handleResponse(req, response);

        // Support for HttpErrorResponse
        if (response instanceof HttpErrorResponse) {
            restResponse.body = response.error;
        }

        return restResponse;
    }
}
