import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule and HttpClient

import { CartComponent } from './cart.component';
import { ProductService } from '../../service/product/product.service';
import { CartService } from '../../service/cart/cart.service';
import { BehaviorSubject } from 'rxjs';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;  
  let httpTestingController: HttpTestingController;
  let cartService: CartService;

  beforeEach(async () => {
    // Mock CartService
    const cartItemsSubject = new BehaviorSubject<number[]>([]);
    const cartServiceMock = {
      cartItems$: cartItemsSubject.asObservable(),
      addToCart: jest.fn((item: number) => {
        const currentItems = cartItemsSubject.getValue();
        const updatedItems = [...currentItems, item];
        cartItemsSubject.next(updatedItems);
      })
    };
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        ProductService,
        { provide: CartService, useValue: cartServiceMock }
      ]
    })
    .compileComponents();
    cartService = TestBed.inject(CartService); // Inject mocked CartService
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
