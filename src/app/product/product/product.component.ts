import { AfterContentChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../Model/product.model';
import { ProductService } from '../../service/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { LocalstorageService } from '../../service/localstorage/localstorage.service';
import { FilterService, MinMaxRange } from '../../service/filter/filter.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, Subscription, of } from 'rxjs';
import { CartService } from '../../service/cart/cart.service';
import { WishlistService } from '../../service/wishlist/wishlist.service';
import { Store } from '@ngrx/store';
import * as ProductSelector from '../state/product.selector';
import { AppState } from '../../app.state';
import { loadProduct } from '../state/product.action';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit, OnDestroy{
  cartItemCount: number = 0;
  products: Product[] = [];
  categoryId: string | null = null;
  rating: number = 0;
  productStore$: Observable<Product[]> = of([]);
  errorMessage: string = 'No Data Found';
  private productSubscription: Subscription | undefined;
  private categroywiseProductsSubscription: Subscription | undefined;
  private filterProductsSubscription: Subscription | undefined;
  private ratingsProductsSubscription: Subscription | undefined;
  private RateRangeProductsSubscription: Subscription | undefined;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private filterService: FilterService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private store: Store<AppState>
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
       },
      error: (error: string) => { this.errorMessage = error; },
      complete: () => { console.log('complete getProducts Observable')}
    });

    // filter the product list based on filter string
    this.filterService.filter$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe({
      next: (filterValue)=> {
      if(filterValue) {
        this.filterProducts(filterValue);
      }},
      error: (error: string) => { this.errorMessage = error; },
      complete: () => { console.log('complete getProducts Observable')}
    });

    // get productlist according to ratings
    this.filterService.getRatingsValue().subscribe({
      next: (rating: number)=> {
      if(rating > 0) {
        this.getRatingsProducts(rating);
      }},
      error: (error: string) => { this.errorMessage = error; },
      complete: () => { console.log('complete getProducts Observable')}
  });

    this.filterService.getRateRangeFilter().subscribe({
      next: (range) => {
        if(range) {
          this.getRateRangeProducts(range);
        }
      },
      error: (error: string) => { this.errorMessage = error; },
      complete: () => { console.log('complete getProducts Observable')}
    });

    // get productlist according to brands
    this.filterService.getselectedBrandFilter().subscribe({
      next: (brandId: number)=> {
        this.getBrandsProducts(brandId);},
      error: (error: string) => { this.errorMessage = error; },
      complete: () => { console.log('complete getProducts Observable')}
      });
  }
 
  getProducts() {
      //   this.productSubscription = this.productService.getProducts().subscribe({
      //     next: (data: Product[]) => { 
      //       this.products = data; return this.products;
      //     },
      //     error: (error: string) => { this.errorMessage = error; },
      //     complete: () => { console.log('complete getProducts Observable')}
      // });
    this.store.dispatch(loadProduct());
    this.store.select(ProductSelector.selectAllProducts).subscribe((data)=> {
        this.products = data;
    });
  }
 
  getCategroywiseProducts(){
    let params = {'categoryId' : this.categoryId}
    this.categroywiseProductsSubscription = this.productService.getProducts(params).subscribe({
      next: (data: Product[]) => { this.products = data; },
      error: (error) => { this.errorMessage = error; },
      complete: () => { console.log('complete getCategroywiseProducts Observable')}
  });  
  }

  filterProducts(filterValue: string) {
    this.productService.getProducts().subscribe({
      next: (product: Product[]) => {
        this.products = product.filter(product =>
        product.name.toLowerCase().includes(filterValue.toLowerCase())
        ); 
      },
      error: (error: string) => { this.errorMessage = error; },
      complete: () => { console.log('complete filterProducts Observable')}
    });  
  }

  getRatingsProducts(rating: number){
    this.ratingsProductsSubscription = this.productService.getProducts().subscribe({
      next: (product: Product[]) => {
        this.products = product.filter(item => item?.rating >= rating);
      },
      error: (error: string) => { this.errorMessage = error; },
      complete: () => { console.log('complete filterProducts Observable')}
    });  
  }

  getRateRangeProducts(range: MinMaxRange) {
    this.RateRangeProductsSubscription = this.productService.getProducts().subscribe({
      next: (product: Product[]) => {
        if(product){
          this.products = product;
          if(range.max === 50001){
            this.products = product.filter(item => item?.price >= range.min);
          }else {
            this.products = product.filter(item => item?.price >= range.min && item.price < range.max );
          }
        }
      },
      error: (error: string) => { this.errorMessage = error; },
      complete: () => { console.log('complete filterProducts Observable')}
    });  
  }

  getBrandsProducts(brand_id: number) {
    this.productService.getProducts().subscribe({
      next: (product: Product[]) => {
        this.products = product.filter(product => product.brand_id === brand_id ); 
      },
      error: (error: string) => { this.errorMessage = error; },
      complete: () => { console.log('complete filterProducts Observable')}
    });  
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
    // const existingIds = this.localStorageService.getItem('wishlistItemIds');
    // let idsArray: number[] = [];
    // if(existingIds !== null){
    //   idsArray = JSON.parse(existingIds);
    //   idsArray.includes(id) ? '' : idsArray.push(id);
    //   this.localStorageService.setItem('wishlistItemIds', JSON.stringify(idsArray));
    // }else {
    //   idsArray.push(id);
    //   this.localStorageService.setItem('wishlistItemIds', JSON.stringify(idsArray));
    // }
    // this.localStorageService.setItem('wishlistItemCount', JSON.stringify(idsArray.length));
    this.wishlistService.addToWishlist(id);
  }
 
  onClickCart(id:number){
    this.cartService.addToCart(id);
  }

  ngOnDestroy(): void {
    if(this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
    if(this.categroywiseProductsSubscription) {
      this.categroywiseProductsSubscription.unsubscribe();
    }
    if(this.filterProductsSubscription) {
      this.filterProductsSubscription.unsubscribe();
    }
    if(this.ratingsProductsSubscription) {
      this.ratingsProductsSubscription.unsubscribe();
    }
    if(this.RateRangeProductsSubscription) {
      this.RateRangeProductsSubscription.unsubscribe();
    }
  }
}
