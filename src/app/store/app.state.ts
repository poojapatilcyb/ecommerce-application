import { productReducer } from "../product/state/product.reducer";
import { ProductState } from "../product/state/product.state";

export interface appState {
    product: ProductState
}

export const appReducer = {
    product: productReducer
}