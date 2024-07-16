import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpTestingController: HttpTestingController;
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CategoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch category data from API', (done) => {
    const mockData = [
      {
        "id": 1,
        "name": "Mobile"
    },
    {
        "id": 2,
        "name": "Microwave"
    },
  ];

    service.getCategories().subscribe(data => {
      expect(data).toBeTruthy();
      expect(data).toEqual(mockData);
      expect(data.length).toBe(2);
      done();
    });
    // Expect a single request to the apiUrl
    const req = httpTestingController.expectOne('http://localhost:3000/categories');
    expect(req.request.method).toEqual('GET');

    req.flush(mockData); // Simulate response
  });

  afterEach(() => {
    httpTestingController.verify();
  })
});
