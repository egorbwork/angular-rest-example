import { ProductInterface } from './product.interface';

export class Product implements ProductInterface {
    public _id: string;
    public name: string;
    public description: string;
    public price: number;

    constructor(options) {
        Object.assign(this, options);
    }
}
