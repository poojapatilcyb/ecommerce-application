import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../Model/product.model';
import { ProductService } from '../../service/product/product.service';
import { LocalstorageService } from '../../service/localstorage/localstorage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit, OnDestroy{
  wishlistData: Product[] = [];
  private productsSubscription: Subscription | undefined;
  errorMessage: string = 'No products found in wishlist. Please add product.';
  constructor(
    private service: ProductService,
    private localStorageService: LocalstorageService
  ){}
 
  ngOnInit(): void {
    this.getWishlistProducts();
  }
 
  getWishlistProducts(){
    let localArray = this.localStorageService.getItem('wishlistItemIds');
    if(localArray !== null) {
      let idsArray: number[] = JSON.parse(localArray);
      this.productsSubscription = this.service.getProducts().subscribe({
        next: (data: Product[]) => { this.wishlistData = data.filter(item => idsArray?.includes(item.id)); },
        error: (error: string) => { this.errorMessage = error; },
        complete: () => { console.log('complete getProducts Observable')}
      });  
    }
  }

  ngOnDestroy(): void {
    this.productsSubscription?.unsubscribe();
  }
}
