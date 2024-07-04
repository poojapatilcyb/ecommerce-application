// product.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as ProductActions from './product.action';
import { ProductService } from '../../service/product/product.service'; // Assuming you have a ProductService

@Injectable()
export class ProductEffect {

  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.loadProduct),
    switchMap(() =>
      this.productService.getProducts().pipe(
        map(products => { console.log(products); return ProductActions.loadProductsSuccess({ product: products })}),
        catchError(error => of(ProductActions.loadProductsFailure({ error })))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}
