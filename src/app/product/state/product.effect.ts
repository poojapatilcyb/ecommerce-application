import { Injectable, inject } from "@angular/core";
import { ProductService } from "../../service/product/product.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './product.action';
import { catchError, map, of, switchMap } from "rxjs";
import { error } from "console";
@Injectable()
export class ProductEffect {

    private api = inject(ProductService);
    action$ = inject(Actions);
    loadProducts$ = createEffect(() => 
        this.action$.pipe(
            ofType(ProductActions.loadProduct),
            switchMap(()=>
                this.api.getProducts().pipe(
                    map((res)=> ProductActions.loadProductSuccess({products: res})),
                    catchError((error: {message: string}) => of(
                        ProductActions.loadProductFail({errorMessage: 'fail to load product'}))
                    ) 
                )
            )
        )
    )
}