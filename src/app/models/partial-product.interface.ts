import { EntityInterface } from './entity.interface';

export interface PartialProductInterface extends EntityInterface {
    name?: string;
    description?: string;
    price?: number;
}
