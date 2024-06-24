import { TestBed } from '@angular/core/testing';

import { ErrorHandlerInterceptor } from './error-handler.service';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorHandlerInterceptor] 
    });
    service = TestBed.inject(ErrorHandlerInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
