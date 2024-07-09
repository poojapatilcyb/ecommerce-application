import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../Model/product.model';
import { ProductService } from '../../service/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { FilterService } from '../../service/filter/filter.service';
import { Subscription } from 'rxjs';
import { CartService } from '../../service/cart/cart.service';
import { WishlistService } from '../../service/wishlist/wishlist.service';

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
  errorMessage: string = 'No Data Found';
  private categroywiseProductsSubscription: Subscription | undefined;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private filterService: FilterService,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}
 
  ngOnInit(): void {
    this.filterService.productObservable.subscribe((value) => {
      this.products = value;
    })
    // Check if the 'categoryId' parameter is present in the route
    this.route.paramMap.subscribe({
      next: (params) => { 
        if (params.has('id')) {
          this.categoryId = params.get('id');
          this.filterService.loadInitialProducts();
          this.getCategroywiseProducts();
        }
       },
      error: (error: string) => { this.errorMessage = error; },
      complete: () => { console.log('complete getProducts Observable')}
    });
  }

 
  getCategroywiseProducts(){
    let params = {'categoryId' : this.categoryId}
    this.categroywiseProductsSubscription = this.productService.getProducts(params).subscribe({
      next: (data: Product[]) => { this.products = data; 
        this.filterService.updateProduct(data);
      },
      error: (error) => { this.errorMessage = error; },
      complete: () => { console.log('complete getCategroywiseProducts Observable')}
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
    this.wishlistService.addToWishlist(id);
  }
 
  onClickCart(id:number){
    this.cartService.addToCart(id);
  }

  ngOnDestroy(): void {
    if(this.categroywiseProductsSubscription) {
      this.categroywiseProductsSubscription.unsubscribe();
    }
  }
}
