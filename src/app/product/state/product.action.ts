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

export const loadProductsByGivenId = createAction(
    '[Product Component] loadProductByBrandId',
    props<{id: {[key: string]: string}}>()
);

export const loadProductByNameFilter = createAction(
    '[Product Component] loadProductByNameFilter',
    props<{name: string}>()
);

export const loadProductByRatings = createAction(
    '[Product Component] loadProductByNameFilter',
    props<{rating: number}>()
);

export const loadProductByRateRange = createAction(
    '[Product Component] loadProductByNameFilter',
    props<{range: {min: number, max:number}}>()
);