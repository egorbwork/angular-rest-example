import { ProductInterface } from './product.interface';

export class Product implements ProductInterface {
    public name: string;
    public description: string;
    public price: number;
    private _id: string;

    constructor(options) {
        Object.assign(this, options);
    }

    public get id(): string {
        return this._id;
    }
}
