import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../Model/product.model';
import { ActivatedRoute } from '@angular/router';
import { FilterService, MinMaxRange } from '../../service/filter/filter.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, Subscription, of } from 'rxjs';
import { CartService } from '../../service/cart/cart.service';
import { WishlistService } from '../../service/wishlist/wishlist.service';
import { Store } from '@ngrx/store';
import * as ProductSelector from '../state/product.selector';
import { loadProduct, loadProductsByGivenId, loadProductByNameFilter, loadProductByRatings, loadProductByRateRange} from '../state/product.action';
import { appState } from '../../store/app.state';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{
  cartItemCount: number = 0;
  products$: Observable<Product[]> = of([]);
  errorMessage$: Observable<string | null> = of('');
  categoryId: string | null = null;
  rating: number = 0;
  errorMessage: string = '';
constructor(
    private route: ActivatedRoute,
    private filterService: FilterService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private store: Store<appState>
  ) {}
 
  ngOnInit(): void {
    // Check if the 'categoryId' parameter is present in the route
    this.route.paramMap.subscribe({
      next: (params) => { 
        if (params.has('id')) {
          this.categoryId = params.get('id');
          this.getCategroywiseProducts();
        } else {
          this.getProducts();
        }
       }
    });

    // filter the product list based on filter string
    this.filterProducts();
    this.filterService.filter1$.subscribe((filter) => {
      switch(filter.filterType) {
        case 'rating_filter':
        if(typeof filter.filterValue === 'number'){
          this.getRatingsProducts(filter.filterValue);
        }
        break;

        case 'rate_range_filter':
            this.getRateRangeProducts(filter.filterValue as MinMaxRange);
        break;

        case 'brand_filter':
          if(typeof filter.filterValue === 'number'){
            this.getBrandsProducts(filter.filterValue);
          }
        break;
      }
    })
  }
 
  getProducts(){
    this.store.dispatch(loadProduct());
    this.loadAllProducts();
  }

  loadAllProducts(){
    this.products$ =  this.store.select(ProductSelector.selectAllProducts);
    this.errorMessage$ = this.store.select(ProductSelector.selectProductError);
    this.store.select(ProductSelector.selectProductError).subscribe((err)=> this.errorMessage = err? err : 'No Product Found!!!')
  }
 
  getCategroywiseProducts(){
    if(this.categoryId) {
      let params = {'categoryId' : this.categoryId}
      this.store.dispatch(loadProductsByGivenId({ id: params }));
      this.loadAllProducts();
    } 
  }

  filterProducts() {
    this.filterService.filter$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe({
      next: (filterValue)=> {
      if(filterValue) {
        this.store.dispatch(loadProductByNameFilter({ name: filterValue }));
        this.loadAllProducts();
      }}
    }); 
  }

  getRatingsProducts(rating: number){
    if(rating > 0) {
      this.store.dispatch(loadProductByRatings({ rating: rating }));
      this.loadAllProducts();
    }
  }

  getRateRangeProducts(range: {min: number, max: number}) {
    if(range) {
      this.store.dispatch(loadProductByRateRange({ range: range }));
      this.loadAllProducts();
    }
  }

  getBrandsProducts(brand_id: number) {
    if(brand_id) {
      let params = {'brand_id' : brand_id.toString()}
      this.store.dispatch(loadProductsByGivenId({ 'id': params }));
      this.loadAllProducts();
    } 
  }

  getDescriptionStyle(): { [key: string]: string } {
    // Example: Conditionally apply styles based on description length
    const maxLines = 3;
    const lineHeight = 1.4; // Adjust based on your line-height in CSS
    const maxHeight = `${lineHeight * maxLines}px`;

    return {
      'max-height': maxHeight,
      'overflow': 'hidden',
      'text-overflow': 'ellipsis'
    };
  }

  onClickWishlist(id:number){
    this.wishlistService.addToWishlist(id);
  }
 
  onClickCart(id:number){
    this.cartService.addToCart(id);
  }
}
