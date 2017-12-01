import { Component, OnInit } from '@angular/core';

import { ApiError } from '../../models/api-error';
import { PaginatorInterface, Product, ProductInterface } from '../../models';
import { ProductCustomRestClient } from '../../services/rest/product-custom-rest.client';

@Component({
    selector: 'product-list',
    templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
    private products: ProductInterface[];
    private areProductsLoading: boolean = false;

    constructor(protected productCustomRestClient: ProductCustomRestClient) {
    }

    public ngOnInit(): void {
        this.areProductsLoading = true;
        this.productCustomRestClient.query().subscribe(
            (paginator: PaginatorInterface<ProductInterface>) => {
                this.products = paginator.items;
            },
            (error) => console.log(error),
            () => this.areProductsLoading = false
        );
    }

    public edit(product: ProductInterface): void {
        console.log(product);
    }

    public update(product: ProductInterface): void {
        let productEntity = new Product(product);
        this.areProductsLoading = true;
        this.productCustomRestClient.put(productEntity).subscribe(
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
    }
}
