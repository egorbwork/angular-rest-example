import { EntityInterface } from './entity.interface';

export interface ProductInterface extends EntityInterface {
    name: string;
    description: string;
    price: number;
}
