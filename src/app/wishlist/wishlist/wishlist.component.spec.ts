import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http'; // Import HttpClientModule and HttpClient

import { WishlistComponent } from './wishlist.component';
import { ProductService } from '../../service/product/product.service';
import { WishlistService } from '../../service/wishlist/wishlist.service';
import { of, throwError } from 'rxjs';

describe('WishlistComponent', () => {
  let component: WishlistComponent;
  let fixture: ComponentFixture<WishlistComponent>;
  let mockProductService: Partial<ProductService>;
  let mockWishlistService: Partial<WishlistService>;

  beforeEach(async () => {
    mockProductService = {
      getProducts: jest.fn(() => of([
        {
          "id": 1,
          "name": "Nike sneaker",
          "price": 15000,
          "rating": 1,
          "categoryId": 5,
          "img": "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0558cdb5-4d42-4f4d-9b37-5038f1f97f9f/pegasus-41-road-running-shoes-RZm89S.png",
          "description": "Air Max 2017 Sneakers For Men  (Blue)",
          "brand_id": 1
        },
        {
          "id": 2,
          "name": "Nike sneaker",
          "price": 15000,
          "rating": 1,
          "categoryId": 5,
          "img": "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0558cdb5-4d42-4f4d-9b37-5038f1f97f9f/pegasus-41-road-running-shoes-RZm89S.png",
          "description": "Air Max 2017 Sneakers For Men  (Blue)",
          "brand_id": 1
        },
        {
          "id": 3,
          "name": "Nike sneaker",
          "price": 15000,
          "rating": 1,
          "categoryId": 5,
          "img": "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0558cdb5-4d42-4f4d-9b37-5038f1f97f9f/pegasus-41-road-running-shoes-RZm89S.png",
          "description": "Air Max 2017 Sneakers For Men  (Blue)",
          "brand_id": 1
        }
      ]))
    };

    mockWishlistService = {
      getWishlist: jest.fn(() => of([1, 3])), // Mock wishlist items IDs
      removeFromWishlist: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [ WishlistComponent ],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { provide: WishlistService, useValue: mockWishlistService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch wishlist products on init', () => {
    component.ngOnInit();
    expect(component.wishlistData.length).toBe(2); 
  });

  it('should remove product from wishlist', () => {
    const productId = 2;
    component.removeFromWishlistItem(productId);

    // Expectation: removeFromWishlist should have been called with productId
    expect(mockWishlistService.removeFromWishlist).toHaveBeenCalledWith(productId);
  });

  it('should unsubscribe from subscriptions on component destroy', () => {
    const unsubscribeSpy = jest.spyOn(component.productsSubscription!, 'unsubscribe');

    component.ngOnDestroy();

    // Expectations: Unsubscribe method should have been called
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('should handle error when fetching products', () => {
    // Mock successful getWishlist response
    mockWishlistService.getWishlist = jest.fn(() => of([1, 2, 3]));

    // Mock ProductService to throw an error
     mockProductService.getProducts = jest.fn(() => throwError(()=>'Failed to fetch products'));

    component.getWishlistProducts();

    // Expectation: errorMessage should be updated with the error message
    expect(component.errorMessage).toBe('Failed to fetch products');
  });
});
