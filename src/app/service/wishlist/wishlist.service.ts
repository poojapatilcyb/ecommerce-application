import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalstorageService } from '../localstorage/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private wishlistItemsSubject = new BehaviorSubject<number[]>([]);
  wishlistItems$ = this.wishlistItemsSubject.asObservable();
  constructor(
    private localStorageService: LocalstorageService
  ) { 
    const wishlistItems = JSON.parse(this.localStorageService.getItem('wishlistItemIds') || '[]');
    this.wishlistItemsSubject.next(wishlistItems);
  }

  addToWishlist(id: number): void {
    let idsArray: number[] = JSON.parse(this.localStorageService.getItem('wishlistItemIds') || '[]');
    if(idsArray !== null){
      idsArray.includes(id) ? '' : idsArray.push(id);
    }else {
      idsArray = [];
      idsArray.push(id);
    }
    this.localStorageService.setItem('wishlistItemIds', JSON.stringify(idsArray));
    this.wishlistItemsSubject.next(idsArray);
  }

  removeFromWishlist(id: number){
    let idsArray: number[] = JSON.parse(this.localStorageService.getItem('wishlistItemIds') || '[]');
    const indexToRemove = idsArray.indexOf(id);
    if(indexToRemove>=0) {
      idsArray.splice(indexToRemove, 1);
      this.localStorageService.setItem('wishlistItemIds', JSON.stringify(idsArray));
      this.wishlistItemsSubject.next(idsArray);
    }
  }
}
