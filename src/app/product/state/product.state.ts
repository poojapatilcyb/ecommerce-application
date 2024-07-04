import { Product } from "../../../Model/product.model";

export interface ProductState {
    product: Product[],
    loading: boolean;
    error: any;
};

export const productInitialState: ProductState = {
    product: [],
    loading: false,
    error: null
}