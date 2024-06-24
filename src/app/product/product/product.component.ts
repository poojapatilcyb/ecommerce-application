import { AfterContentChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../Model/product.model';
import { ProductService } from '../../service/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { LocalstorageService } from '../../service/localstorage/localstorage.service';
import { FilterService, MinMaxRange } from '../../service/filter/filter.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';

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
  errorMessage: string = '';
  private productSubscription: Subscription | undefined;
  private categroywiseProductsSubscription: Subscription | undefined;
  private filterProductsSubscription: Subscription | undefined;
  private ratingsProductsSubscription: Subscription | undefined;
  private RateRangeProductsSubscription: Subscription | undefined;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private localStorageService: LocalstorageService,
    private filterService: FilterService
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

    // filter the product kist based on filter string
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

    // this.filterService.getselectedBrandBehaviourSubject().subscribe((data) => {
    //   console.log(data);
    //   if(data){
    //     this.productService.getProducts().subscribe(product =>{
    //       // data.map((selectedBrand) => { console.log(selectedBrand.id)
    //       //   this.products = product.filter((prod)=> { console.log(prod.id)
    //       //     return selectedBrand.id == prod.brand_id;
    //       //   })
    //       // })
    //       this.products = product.filter(product =>
    //         data.some(brand => brand.id === product.brand_id)
    //       );           
    //     })
    //   }
      
    // })
  }
 
  getProducts(){
    this.productSubscription = this.productService.getProducts().subscribe({
      next: (data: Product[]) => { this.products = data; return this.products;},
      error: (error: string) => { this.errorMessage = error; },
      complete: () => { console.log('complete getProducts Observable')}
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
    const existingIds = this.localStorageService.getItem('wishlistItemIds');
    let idsArray: number[] = [];
    if(existingIds !== null){
      idsArray = JSON.parse(existingIds);
      idsArray.includes(id) ? '' : idsArray.push(id);
      this.localStorageService.setItem('wishlistItemIds', JSON.stringify(idsArray));
    }else {
      idsArray.push(id);
      this.localStorageService.setItem('wishlistItemIds', JSON.stringify(idsArray));
    }
    this.localStorageService.setItem('wishlistItemCount', JSON.stringify(idsArray.length));
  }
 
  onClickCart(id:number){
    const existingIds = this.localStorageService.getItem('cartItemIds');
    let idsArray: number[] = [];
    if(existingIds !== null){
      idsArray = JSON.parse(existingIds);
    }
      idsArray.push(id);
      this.localStorageService.setItem('cartItemIds', JSON.stringify(idsArray));
      this.localStorageService.setItem('cartItemCount', JSON.stringify(idsArray.length));
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
