import { createReducer, on } from "@ngrx/store";
import * as ProductActions from './product.action';
import { ProductState } from "./product.state";

export const initialProductState: ProductState = {
    product: [],
    error: null
}

export const productReducer = createReducer(
    initialProductState,
    on(ProductActions.loadProductSuccess, (state, {product})=> {
        return {
        ...state,
        product: product,
        error: null
    }
    }),
    on(ProductActions.loadProductFail, (state, {errorMessage})=> ({
        ...state,
        error: errorMessage
    }))
)