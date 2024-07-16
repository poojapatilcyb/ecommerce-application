import { TestBed } from '@angular/core/testing';

import { WishlistService } from './wishlist.service';
import { LocalstorageService } from '../localstorage/localstorage.service';

describe('WishlistService', () => {
  let service: WishlistService;
  let localStorageService: LocalstorageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WishlistService,
        LocalstorageService
      ]
    });
    localStorageService = TestBed.inject(LocalstorageService);
    const mockLocalStorage = (() => {
      let store: Record<string, string> = {};

      return {
        getItem: (key: string) => (key in store ? store[key] : null),
        setItem: (key: string, value: string) => (store[key] = value),
        removeItem: (key: string) => delete store[key],
        clear: () => (store = {}),
      };
    })();

    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
    });
    service = TestBed.inject(WishlistService);
  });

  it('should add item to empty wishlist', () => {
    const id = 1;
    service.addToWishlist(id);
    expect(localStorageService.getItem('wishlistItemIds')).toEqual(JSON.stringify([id]));
    service.getWishlist().subscribe(items => {
      expect(items).toEqual([id]);
    });
  });

  it('should add item to non-empty wishlist', () => {
    const initialItems = [1, 2, 3];
    const idToAdd = 4;

    localStorageService.setItem('wishlistItemIds', JSON.stringify(initialItems));

    service.addToWishlist(idToAdd);
    expect(localStorageService.getItem('wishlistItemIds')).toEqual(JSON.stringify([...initialItems, idToAdd]));

    service.getWishlist().subscribe(items => {
      expect(items).toEqual([...initialItems, idToAdd]);
    });
  });

  it('should not add duplicate item to wishlist', () => {
    const initialItems = [1, 2, 3];
    const idToAdd = 2;
    localStorageService.setItem('wishlistItemIds', JSON.stringify(initialItems));

    service.addToWishlist(idToAdd);
    expect(localStorageService.getItem('wishlistItemIds')).toEqual(JSON.stringify(initialItems));
    service.getWishlist().subscribe(items => {
      expect(items).toEqual(initialItems);
    });
  });

  it('should remove item from wishlist', () => {
    const id = 1;
    const initialItems = [1, 2, 3];

    let mockdata = initialItems;
    const indexToRemove = initialItems.indexOf(id);
    if(indexToRemove>=0) {
      mockdata.splice(indexToRemove, 1);
    }

    service.removeFromWishlist(id);
    expect(localStorageService.getItem('wishlistItemIds')).toEqual(JSON.stringify(mockdata));
  });

  it('should not remove item from wishlist if id is not present in wishlist', () => {
    const id = 5;
    const initialItems = [1, 2, 3];
    localStorageService.setItem('wishlistItemIds', JSON.stringify(initialItems));

    service.removeFromWishlist(id);
    expect(localStorageService.getItem('wishlistItemIds')).toEqual(JSON.stringify(initialItems));
  });

  it('should remove item from wishlist', () => {
    const id = 1;
    localStorageService.setItem('wishlistItemIds', JSON.stringify([id]));
    const wishlistItemsSpy = jest.spyOn(service['wishlistItemsSubject'], 'next');
    service.removeFromWishlist(id); 
    expect(localStorageService.getItem('wishlistItemIds')).toEqual('[]');
    expect(wishlistItemsSpy).toHaveBeenCalledWith([]);
  });

  it('should get wishlist items', (done) => {
    const mockItems = [1, 2, 3];
    service.getWishlist().subscribe(items => {
      expect(items).toEqual(mockItems);
      done();
    });
    service['wishlistItemsSubject'].next(mockItems);
  });

  it('should handle empty wishlist', (done) => {
    service.getWishlist().subscribe(items => {
      expect(items).toEqual([]);
      done();
    });
  });
});
