import { ProductInterface } from './product.interface';
import { PartialProductInterface } from './partial-product.interface';

export class Product implements ProductInterface {
    public _id: string;
    public name: string;
    public description: string;
    public price: number;

    constructor(options: PartialProductInterface) {
        this._id = options._id;
        this.name = options.name || '';
        this.description = options.description
        this.price = Number(options.price) || null;
    }
}
