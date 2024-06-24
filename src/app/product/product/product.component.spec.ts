import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute, ParamMap, convertToParamMap } from '@angular/router';

import { ProductComponent } from './product.component';
import { FilterService } from '../../service/filter/filter.service';
import { ProductService } from '../../service/product/product.service';
import { LocalstorageService } from '../../service/localstorage/localstorage.service';
import { FilterModule } from '../../filter/filter.module';
import { BehaviorSubject, of } from 'rxjs';

class MockActivatedRoute {
  // Use this to mock different scenarios
  // Example: paramMap: of(convertToParamMap({ id: '123' }))
  // Example: snapshot: { paramMap: convertToParamMap({ id: '123' }) }
  // Example: queryParams: of({ id: '123' })
}

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let httpTestingController: HttpTestingController;
  let activatedRoute: ActivatedRoute;
  let paramMapSubject: BehaviorSubject<ParamMap>;
  beforeEach(waitForAsync(() => {
    paramMapSubject = new BehaviorSubject(convertToParamMap({}));

    activatedRoute = {
      snapshot: {
        paramMap: convertToParamMap({}), // Default paramMap
      },
      paramMap: paramMapSubject.asObservable(),
    } as unknown as ActivatedRoute;
  }));

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        ProductComponent,
      ],
      imports: [
        FilterModule,
        HttpClientTestingModule
      ],
      providers: [
        ProductService,
        FilterService,
        LocalstorageService,
        { provide: ActivatedRoute, useClass: activatedRoute }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });
  // xit('should fetch product details when productId param is present', () => {
  //   const mockProductId = '1';
  //   const mockProductDetails = [{
  //     "id": 1,
  //     "name": "SAMSUNG Galaxy",
  //     "price": 10000,
  //     "rating": 4,
  //     "categoryId": 1,
  //     "img": "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1705640892/Croma%20Assets/Communication/Mobiles/Images/303817_cc5lmd.png?tr=w-640",
  //     "description": "Behold the Samsung Galaxy S24 Ultra smartphone, an exceptional amalgamation of incredible technology and superior sophistication. Whether you're typing up a storm or jotting something down, Note Assist makes a long story short. Behold the Samsung Galaxy S24 Ultra smartphone, an exceptional amalgamation of incredible technology and superior sophistication. Whether you're typing up a storm or jotting something down, Note Assist makes a long story short.",
  //     "brand_id": 8
  // }];

  //   // Emit mock paramMap with 'productId' present
  //   paramMapSubject.next(convertToParamMap({ productId: mockProductId }));

  //   spyOn(component, 'getProducts');

  //   // Trigger ngOnInit or any method that subscribes to paramMap
  //   component.ngOnInit(); // Example, adjust as per your component's lifecycle or method

  //   // Assert that getProductDetails was called with mockProductId
  //   expect(component.products).toEqual(mockProductDetails);

  //   // Assert component behavior after fetching product details
  //   // Example:
  //   // expect(component.productDetails).toEqual(mockProductDetails);
  //   // expect(component.errorMessage).toBeUndefined();
  // });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
