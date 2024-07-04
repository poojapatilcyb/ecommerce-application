import { createReducer, on } from "@ngrx/store";
import { productInitialState } from "./product.state";
import * as ProductAction from "./product.action";

export const _productReducer = createReducer(
    productInitialState,
    on(ProductAction.loadProduct, (state) => {
        console.log(state.product);
        return {
            ...state,
            product: state.product,
            loading: true,
            error: null
        }
    }),
    on(ProductAction.loadProductsSuccess, (state, { product }) => {
        console.log(state.product);
        return ({
        ...state,
        product: product,
        loading: false
      })}),
      on(ProductAction.loadProductsFailure, (state, { error }) => {
        console.log(state);
        return({
        ...state,
        loading: false,
        error: error
      })})

)

export function productReducer(state: any, action: any) {
    return _productReducer(state, action);
}