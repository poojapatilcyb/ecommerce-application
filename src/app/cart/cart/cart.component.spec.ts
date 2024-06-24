import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http'; // Import HttpClientModule and HttpClient

import { CartComponent } from './cart.component';
import { ProductService } from '../../service/product/product.service';
import { LocalstorageService } from '../../service/localstorage/localstorage.service';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;  
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        ProductService,
        LocalstorageService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
