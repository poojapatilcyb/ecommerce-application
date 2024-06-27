import { AfterContentChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../../service/category/category.service';
import { LocalstorageService } from '../../service/localstorage/localstorage.service';
import { Category } from '../../../Model/category.model';
import { Subscription } from 'rxjs';
import { CartService } from '../../service/cart/cart.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit, AfterContentChecked, OnDestroy{
  wishlistItemCount: number = 0;
  cartItemCount: number = 0;
  categories: Category[] = [];
  errorMessage: string = '';
  categoriesSubscription: Subscription | undefined;
  constructor(
    private service: CategoryService,
    private localStorageService: LocalstorageService,
    private cartService: CartService
  ) {}
 
  ngOnInit(): void {
    this.getCategories();
  }
 
  getCategories(){
    this.categoriesSubscription = this.service.getCategories().subscribe({
      next: (data: Category[]) => { this.categories = data; },
      error: (error) => { this.errorMessage = error; },
      complete: () => { console.log('complete getBrand Observable')}
    });
  }
 
  ngAfterContentChecked(): void {
    this.getWishlistItemCount();
    this.getCartItemCount();
  }
 
  getWishlistItemCount(){
    if(typeof document !== 'undefined') {
      const itemcount = this.localStorageService.getItem('wishlistItemCount');
      this.wishlistItemCount = itemcount ? JSON.parse(itemcount) : null;
    }
  }
 
  getCartItemCount(){
    this.cartService.cartItems$.subscribe((localArray)=> { 
      this.cartItemCount = localArray.length
    })
  }

  ngOnDestroy(): void {
    if(this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }
}
