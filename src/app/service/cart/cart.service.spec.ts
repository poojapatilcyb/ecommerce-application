import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { LocalstorageService } from '../localstorage/localstorage.service';

describe('CartService', () => {
  let service: CartService;
  let localStorageService: LocalstorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartService,
        LocalstorageService
      ]
    });
    localStorageService = TestBed.inject(LocalstorageService);
    service = TestBed.inject(CartService);
  });

  afterEach(() => {
    localStorage.clear(); // Clear localStorage after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add item to empty wishlist', () => {
    const id = 1;
    service.addToCart(id);

    expect(localStorageService.getItem('cartItemIds')).toEqual(JSON.stringify([id]));
    service.cartItems$.subscribe(items => {
      expect(items).toEqual([id]);
    });
  });

  it('should remove item from wishlist', () => {
    const id = 1;
    const initialItems = [1, 2, 3];
    localStorageService.setItem('cartItemIds', JSON.stringify(initialItems));
    let mockdata = initialItems;
    const indexToRemove = initialItems.indexOf(id);
    if(indexToRemove>=0) {
      mockdata.splice(indexToRemove, 1);
    }
    service.removeFromCart(id);
    expect(localStorageService.getItem('cartItemIds')).toEqual(JSON.stringify(mockdata));
  });

});
