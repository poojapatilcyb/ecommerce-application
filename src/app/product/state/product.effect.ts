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
      // Effect to load products by category
    loadProductsByGivenId$ = createEffect(() =>
        this.action$.pipe(
            ofType(ProductActions.loadProductsByGivenId),
            switchMap((action)=>
                this.api.getProducts(action.id).pipe(
                    map((res)=> ProductActions.loadProductSuccess({product: res})),
                    catchError((error: {message: string}) => of(
                        ProductActions.loadProductFail({errorMessage: error.message}))
                    ) 
                )
            )
        )
    );

    loadProductByNameFilter$ = createEffect(() =>
        this.action$.pipe(
            ofType(ProductActions.loadProductByNameFilter),
            switchMap((action)=>
                this.api.getProducts().pipe(
                    map((res)=>{
                        const filteredResponse = res.filter(product =>
                            product.name.toLowerCase().includes(action.name.toLowerCase())
                        ); 
                        return ProductActions.loadProductSuccess({product: filteredResponse})
                    }),
                    catchError((error: {message: string}) => of(
                        ProductActions.loadProductFail({errorMessage: 'Fail to load products!!!'}))
                    ) 
                )
            )
        )
    );

    loadProductByRatings$ = createEffect(() =>
        this.action$.pipe(
            ofType(ProductActions.loadProductByRatings),
            switchMap((action)=>
                this.api.getProducts().pipe(
                    map((res)=>{
                        const filteredResponse = res.filter(item => item?.rating >= action.rating)
                        return ProductActions.loadProductSuccess({product: filteredResponse})
                    }),
                    catchError((error: {message: string}) => of(
                        ProductActions.loadProductFail({errorMessage: 'Fail to load products!!!'}))
                    ) 
                )
            )
        )
    );

    loadProductByRateRange$ = createEffect(() =>
        this.action$.pipe(
            ofType(ProductActions.loadProductByRateRange),
            switchMap((action)=>
                this.api.getProducts().pipe(
                    map((res)=>{
                        let filteredResponse: Product[] = [];
                        if(res){
                            filteredResponse = res;
                            if(action.range.max === 50001){
                                filteredResponse = res.filter(item => item?.price >= action.range.min);
                            }else {
                                filteredResponse = res.filter(item => item?.price >= action.range.min && item.price < action.range.max );
                            }
                          } 
                        return ProductActions.loadProductSuccess({product: filteredResponse})
                    }),
                    catchError((error: {message: string}) => of(
                        ProductActions.loadProductFail({errorMessage: 'Fail to load products!!!'}))
                    ) 
                )
            )
        )
    );

}