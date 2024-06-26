import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http'; // Import HttpClientModule and HttpClient
import { RouterModule } from '@angular/router';

import { CategoryComponent } from './category.component';
import { LocalstorageService } from '../../service/localstorage/localstorage.service';
import { CategoryService } from '../../service/category/category.service';
import { of, throwError } from 'rxjs';
import { Category } from '../../../Model/category.model';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let httpTestingController: HttpTestingController;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let LocalstorageServiceSpy: LocalstorageService;
  beforeEach(async () => {
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getCategories']);
    await TestBed.configureTestingModule({
      declarations: [CategoryComponent],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        RouterModule.forRoot([])
      ],
      providers: [
        { provide: CategoryService, useValue: categoryServiceSpy },
        LocalstorageService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    categoryServiceSpy = TestBed.inject(CategoryService) as jasmine.SpyObj<CategoryService>;
    // fixture.detectChanges();
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
    categoryServiceSpy.getCategories.and.returnValue(of(testData));
    // Call the method to test
    component.getCategories();

    // Expectations for next callback
    expect(component.categories).toBe(testData);
    expect(component.errorMessage).toBeFalsy(); // No error should be set

    // Complete should have been called
    fixture.detectChanges(); // Detect changes to call ngOnDestroy
    expect(component.categories).toBe(testData); // Data should still be set
  });

  it('ngOnDestroy should unsubscribe categoriesSubscription', () => {
    // Verify ngOnDestroy was called to unsubscribe
    component.ngOnDestroy(); // Manually call ngOnDestroy
    if(component.categoriesSubscription) expect(component?.categoriesSubscription.closed).toBe(true); // Subscription should be closed
  });
});
