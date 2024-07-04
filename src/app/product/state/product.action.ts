import { createAction, props } from "@ngrx/store";
import { Product } from "../../../Model/product.model";

export const loadProduct = createAction('[Product Component] Load Products');
export const loadProductsSuccess = createAction(
  '[Product Component] Load Products Success',
  props<{ product: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Product Component] Load Products Failure',
  props<{ error: any }>()
);