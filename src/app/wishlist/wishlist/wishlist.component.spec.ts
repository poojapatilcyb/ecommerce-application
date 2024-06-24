import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http'; // Import HttpClientModule and HttpClient

import { WishlistComponent } from './wishlist.component';
import { ProductService } from '../../service/product/product.service';
import { LocalstorageService } from '../../service/localstorage/localstorage.service';

describe('WishlistComponent', () => {
  let component: WishlistComponent;
  let fixture: ComponentFixture<WishlistComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WishlistComponent],
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        ProductService,
        LocalstorageService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WishlistComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
