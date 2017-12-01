import { Injectable } from '@angular/core';

import { RestHandler } from 'rest-core/src/RestHandler';
import { RestParams } from 'rest-core';

import { AuthenticationManager } from '../authentication/authentication.manager';
import { AbstractRestClient } from './abstract.rest.client';
import { PartialProductInterface, ProductInterface } from '../../models';

@Injectable()
@RestParams({
    pathPrefix: '/products'
})
export class ProductRestClient extends AbstractRestClient<ProductInterface,
    PartialProductInterface> {
    constructor(requestHandler: RestHandler,
                authenticationManager: AuthenticationManager) {
        super(requestHandler, authenticationManager);
    };
}
