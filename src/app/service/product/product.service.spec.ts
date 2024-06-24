import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifies that no requests are outstanding after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch data from API', () => {
    const mockData = [
      {
        "id": 8,
        "name": "SAMSUNG Galaxy",
        "price": 10000,
        "rating": 4,
        "categoryId": 1,
        "img": "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1705640892/Croma%20Assets/Communication/Mobiles/Images/303817_cc5lmd.png?tr=w-640",
        "description": "Behold the Samsung Galaxy S24 Ultra smartphone, an exceptional amalgamation of incredible technology and superior sophistication. Whether you're typing up a storm or jotting something down, Note Assist makes a long story short. Behold the Samsung Galaxy S24 Ultra smartphone, an exceptional amalgamation of incredible technology and superior sophistication. Whether you're typing up a storm or jotting something down, Note Assist makes a long story short.",
        "brand_id": 8
    },
    {
        "id": 9,
        "name": "SAMSUNG Galaxy1",
        "price": 60000,
        "rating": 4,
        "categoryId": 1,
        "img": "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1705640892/Croma%20Assets/Communication/Mobiles/Images/303817_cc5lmd.png?tr=w-640",
        "description": "Behold the Samsung Galaxy S24 Ultra smartphone, an exceptional amalgamation of incredible technology and superior sophistication. Whether you're typing up a storm or jotting something down, Note Assist makes a long story short. Behold the Samsung Galaxy S24 Ultra smartphone, an exceptional amalgamation of incredible technology and superior sophistication. Whether you're typing up a storm or jotting something down, Note Assist makes a long story short.",
        "brand_id": 9
    }
  ];

    service.getProducts().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/products');
    expect(req.request.method).toEqual('GET');

    req.flush(mockData); // Simulate response
  });
});
