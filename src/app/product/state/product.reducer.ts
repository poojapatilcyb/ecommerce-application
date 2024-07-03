import { createReducer, on } from "@ngrx/store";
import { productInitialState } from "./product.state";
import * as productAction from "./product.action";

export const _productReducer = createReducer(
    productInitialState,
    on(productAction.loadProduct, (state) => {
        return {
            ...state,
            product: state.product,
            error: null
        }
    }),
)

export function productReducer(state: any, action: any) {
    return _productReducer(state, action);
}