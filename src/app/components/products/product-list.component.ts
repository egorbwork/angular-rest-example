import {Component, OnInit} from '@angular/core';
import { ProductCustomRestClient } from '../../services/rest/product-custom-rest.client';
import {PaginatorInterface, PartialProductInterface, ProductInterface} from '../../models';

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

    public partialUpdate(product: ProductInterface): void {
        this.productCustomRestClient.put(product).subscribe(
            (productItem: ProductInterface) => {
                let element = this.products.find((item) => item._id === productItem._id);
                element.description = productItem.description;
                element.name = productItem.name;
                element.price = productItem.price;
            }
        );
    }
}
