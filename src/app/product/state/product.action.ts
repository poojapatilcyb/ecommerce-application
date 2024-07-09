import { createAction, props } from '@ngrx/store';
import { Product } from "../../../Model/product.model";

export const loadProduct = createAction('[Product Component] loadProduct');

export const loadProductSuccess = createAction(
    '[Product Component] loadProductSuccess',
    props<{product: Product[]}>()
);

export const loadProductFail = createAction(
    '[Product Component] loadProductFail',
    props<{errorMessage: string}>()
);
