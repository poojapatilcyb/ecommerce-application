import { TestBed } from '@angular/core/testing';

import { LocalstorageService } from './localstorage.service';

describe('LocalstorageService', () => {
  let service: LocalstorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalstorageService);
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return service.isLocalStorageAvailable() ? localStorage[key] : null;
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if localStorage is available', () => {
    const isAvailable = service.isLocalStorageAvailable();
    expect(isAvailable).toBe(true);
  });

  it('should return false if localStorage is not available', () => {
    spyOn(localStorage, 'setItem').and.throwError('Test error'); 
    const isAvailable = service.isLocalStorageAvailable();
    expect(isAvailable).toBe(false);
  });

  it('should set and get item from localStorage', () => {
    const key = 'testKey';
    const value = 'testValue';
    service.setItem(key, value);
    const retrievedValue = service.getItem(key);
    expect(retrievedValue).toBe(value);
  });

  it('should return null if item does not exist in localStorage', () => {
    const key = 'nonExistingKey';
    const retrievedValue = service.getItem(key);
    expect(retrievedValue).toBeNull();
  });

  xit('should clear localStorage', () => {
    // Arrange
    const key1 = 'key1';
    const value1 = 'value1';
    const key2 = 'key2';
    const value2 = 'value2';
    service.setItem(key1, value1);
    service.setItem(key2, value2);

    // Act
    service.clear();
    const retrievedValue1 = service.getItem(key1);
    const retrievedValue2 = service.getItem(key2);

    // Assert
    expect(retrievedValue1).toBeNull();
    expect(retrievedValue2).toBeNull();
  });
});
