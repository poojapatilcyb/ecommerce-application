import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpErrorResponse,} from '@angular/common/http';
import { throwError } from 'rxjs';
import { ErrorHandlerInterceptor } from './error-handler.service';

describe('ErrorHandlerService', () => {
  let interceptor: ErrorHandlerInterceptor;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorHandlerInterceptor] 
    });
    interceptor = TestBed.inject(ErrorHandlerInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should handle client-side error correctly', () => {
    const mockErrorEvent = new ErrorEvent('error', {
      message: 'Client-side error message',
    });
    const mockError = new HttpErrorResponse({
      error: mockErrorEvent,
      status: 400,
      statusText: 'Bad Request',
    })
    interceptor
    .intercept(new HttpRequest<any>('GET', '/api/test'), {
      handle: () => throwError(() => mockError),
    }).subscribe({
      next: () => {},
      error: (error) => {
        expect(error.message).toBe(`Error: ${mockErrorEvent.message}`);
        expect(console.error).toHaveBeenCalledWith(`Error: ${mockErrorEvent.message}`);
      }
    });
  });

  it('should handle server-side error correctly', () => {
    const mockError = new HttpErrorResponse({
      error: 'Server-side error message',
      status: 500,
      statusText: 'Internal Server Error',
    });

    interceptor
      .intercept(new HttpRequest<any>('GET', '/api/test'), {
        handle: () => throwError(() => mockError),
      })
      .subscribe({
        next: () => {},
        error: (error) => {
          expect(error.message).toBe(`Error: ${mockError.message}`);
          expect(console.error).toHaveBeenCalledWith(`Error: ${mockError.message}`);
        }
      });
  });
});
