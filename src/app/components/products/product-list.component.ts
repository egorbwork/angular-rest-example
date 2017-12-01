import { Component, OnInit } from '@angular/core';

import { ApiError } from '../../models/api-error';
import { PaginatorInterface, Product, ProductInterface } from '../../models';
import { ProductCustomRestClient } from '../../services/rest/product-custom-rest.client';
import {ProductRestClient} from "../../services/rest/product-rest.client";

@Component({
    selector: 'product-list',
    templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
    private products: ProductInterface[];
    private areProductsLoading: boolean = false;
    private customRestClient = false;

    constructor(protected productCustomRestClient: ProductCustomRestClient,
                protected productRestClient: ProductRestClient) {
    }

    public ngOnInit(): void {
        this.areProductsLoading = true;
        if (this.customRestClient) {
            this.productCustomRestClient.query().subscribe(
                (paginator: PaginatorInterface<ProductInterface>) => {
                    this.products = paginator.items;
                },
                (error) => alert(error.error),
                () => this.areProductsLoading = false
            );
        } else {
            this.productRestClient.query().then(
                (paginator: PaginatorInterface<ProductInterface>) => {
                    this.products = paginator.items;
                    this.areProductsLoading = false;
                },
                (error) => {
                    this.areProductsLoading = false;
                    console.log(error);
                }
            );
        }
    }

    public edit(product: ProductInterface): void {
        console.log(product);
    }

    public update(product: ProductInterface): void {
        let productEntity = new Product(product);
        this.areProductsLoading = true;
        if (this.customRestClient) {
            this.productCustomRestClient.update(productEntity).subscribe(
                (productItem: ProductInterface) => {
                    let element = this.products.find((item) => item._id === productItem._id);
                    element.description = productItem.description;
                    element.name = productItem.name;
                    element.price = productItem.price;
                },
                (error: ApiError) => {
                    this.areProductsLoading = false;
                    alert(error.error);
                },
                () => this.areProductsLoading = false
            );
        } else {
            this.productRestClient.update(productEntity).then(
                (productItem: ProductInterface) => {
                    let element = this.products.find((item) => item._id === productItem._id);
                    element.description = productItem.description;
                    element.name = productItem.name;
                    element.price = productItem.price;
                    this.areProductsLoading = false;
                },
                (error: ApiError) => {
                    this.areProductsLoading = false;
                    alert(error.error);
                },
            );
        }
    }
}
