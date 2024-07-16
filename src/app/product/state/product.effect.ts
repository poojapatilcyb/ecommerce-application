import { Injectable, inject } from "@angular/core";
import { ProductService } from "../../service/product/product.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './product.action';
import { catchError, map, of, switchMap } from "rxjs";
import { Product } from "../../../Model/product.model";
@Injectable()
export class ProductEffect {

    private api = inject(ProductService);
    action$ = inject(Actions);
    // Effect to load all products
    loadProducts$ = createEffect(() => 
        this.action$.pipe(
            ofType(ProductActions.loadProduct),
            switchMap(()=>
                this.api.getProducts().pipe(
                    map((res)=> ProductActions.loadProductSuccess({product: res})),
                    catchError((error: {message: string}) => of(
                        ProductActions.loadProductFail({errorMessage: 'Fail to load products!!!'}))
                    ) 
                )
            )
        )
    );
}