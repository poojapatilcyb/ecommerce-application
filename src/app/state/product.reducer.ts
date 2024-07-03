import { createReducer, on } from "@ngrx/store";
import { Product } from "../../Model/product.model";
import * as ProductActions from './product.action';
import { ProductState } from "./product.state";

export const initialProductState: ProductState = {
    product: [],
    error: null
}

export const productReducer = createReducer(
    initialProductState,
    on(ProductActions.loadProductSuccess, (state, {products})=> {
        console.log(products);
        return {
        ...state,
        products: products,
        error: null
    }
    }),
    on(ProductActions.loadProductFail, (state, {errorMessage})=> ({
        ...state,
        error: errorMessage
    }))
)