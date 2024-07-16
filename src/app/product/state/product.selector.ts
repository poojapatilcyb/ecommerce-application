import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "./product.state";

export const selectProductFeature = createFeatureSelector<ProductState>('product');
export const selectAllProducts = createSelector(
    selectProductFeature,
    (state: ProductState) => state.product
);

export const selectProductError = createSelector(
    selectProductFeature,
    (state: ProductState) => state.error
)