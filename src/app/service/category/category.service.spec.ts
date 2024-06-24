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

  it('should fetch data from API', () => {
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
      expect(data).toEqual(mockData);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/categories');
    expect(req.request.method).toEqual('GET');

    req.flush(mockData); // Simulate response
  });
});
