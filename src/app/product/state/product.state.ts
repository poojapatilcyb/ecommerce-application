import { Product } from "../../../Model/product.model";

export interface ProductState {
    product: Product[],
    error: string | null
}