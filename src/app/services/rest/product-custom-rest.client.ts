import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthenticationManager } from '../authentication/authentication.manager';
import { AbstractCustomRestClient } from './abstract.custom-rest.client';
import { PartialProductInterface, ProductInterface } from '../../models';

@Injectable()
export class ProductCustomRestClient extends AbstractCustomRestClient<ProductInterface,
    PartialProductInterface> {
    constructor(httpClient: HttpClient,
                authenticationManager: AuthenticationManager) {
        super(httpClient, authenticationManager);
    }

    protected getUrl(): string {
        return super.getUrl() + '/products';
    }
}
