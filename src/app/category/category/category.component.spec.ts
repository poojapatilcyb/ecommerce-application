import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http'; // Import HttpClientModule and HttpClient
import { RouterModule } from '@angular/router';

import { CategoryComponent } from './category.component';
import { CategoryService } from '../../service/category/category.service';
import { of } from 'rxjs';
import { Category } from '../../../Model/category.model';
import { CartService } from '../../service/cart/cart.service';
import { WishlistService } from '../../service/wishlist/wishlist.service';
import { jest } from '@jest/globals';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let httpTestingController: HttpTestingController;
  let categoryServiceSpy: { getCategories: jest.Mock };
  beforeEach(async () => {
    categoryServiceSpy =  {
      getCategories: jest.fn(),
    };
    await TestBed.configureTestingModule({
      declarations: [CategoryComponent],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        RouterModule.forRoot([])
      ],
      providers: [
        { provide: CategoryService, useValue: categoryServiceSpy },

        CartService,
        WishlistService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getCategories should fetch category data successfully', () => {
    const testData: Category[] = [
      {
          "id": 1,
          "name": "Mobile"
      },
      {
          "id": 2,
          "name": "Microwave"
      }
    ];
    categoryServiceSpy.getCategories.mockReturnValue(of(testData));
    // Call the method to test
    component.getCategories();

    // Expectations for next callback
    expect(component.categories).toEqual(testData);
    expect(component.errorMessage).toBeFalsy(); // No error should be set
    console.log(component.categories);
    // Complete should have been called
    fixture.detectChanges();
    expect(component.categories).toBe(testData);
  });

  it('ngOnDestroy should unsubscribe categoriesSubscription', () => {
    component.ngOnDestroy(); 
    if(component.categoriesSubscription) expect(component?.categoriesSubscription.closed).toBe(true); // Subscription should be closed
  });
  
});
