import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalstorageService } from '../localstorage/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItemsSubject = new BehaviorSubject<number[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  constructor(
    private localStorageService: LocalstorageService
  ) { 
    const cartItems = JSON.parse(this.localStorageService.getItem('cartItemIds') || '[]');
    this.cartItemsSubject.next(cartItems);
  }

  addToCart(item: number): void {
    let cartItems = JSON.parse(this.localStorageService.getItem('cartItemIds') || '[]');
    cartItems.push(item);
    this.localStorageService.setItem('cartItemIds', JSON.stringify(cartItems));
    this.cartItemsSubject.next(cartItems); // Notify subscribers
  }

  removeFromCart(id: number){
    let idsArray: number[] = JSON.parse(this.localStorageService.getItem('cartItemIds') || '[]');
    const indexToRemove = idsArray.indexOf(id);
    if(indexToRemove>=0) {
      idsArray.splice(indexToRemove, 1);
      this.localStorageService.setItem('cartItemIds', JSON.stringify(idsArray));
      this.cartItemsSubject.next(idsArray);
    }
  }
}
