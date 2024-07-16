import { TestBed } from '@angular/core/testing';

import { LocalstorageService } from './localstorage.service';

describe('LocalstorageService', () => {
  let service: LocalstorageService;

  beforeEach(() => {
    service = new LocalstorageService();
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalstorageService);
    const mockLocalStorage = (() => {
      let store: Record<string, string> = {};

      return {
        getItem: (key: string) => (key in store ? store[key] : null),
        setItem: (key: string, value: string) => (store[key] = value),
        removeItem: (key: string) => delete store[key],
        clear: () => (store = {}),
      };
    })();

    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
    });
  });

  afterEach(() => {
    localStorage.clear(); // Clear localStorage after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check if localStorage is available', () => {
    expect(service.isLocalStorageAvailable()).toBe(true);
  });

  it('should get item from localStorage', () => {
    localStorage.setItem('wishlistItemIds', '[1,2,3,4]');
    expect(service.getItem('wishlistItemIds')).toBe('[1,2,3,4]');
  });

  it('should return null when getting non-existing item from localStorage', () => {
    expect(service.getItem('nonExistingKey')).toBe(null);
  });

  it('should set item in localStorage', () => {
    service.setItem('testKey', 'testValue');
    expect(localStorage.getItem('testKey')).toBe('testValue');
  });

  it('should remove item from localStorage', () => {
    localStorage.setItem('testKey', 'testValue');
    service.removeItem('testKey');
    expect(localStorage.getItem('testKey')).toBe(null);
  });

  it('should clear localStorage', () => {
    localStorage.setItem('testKey1', 'testValue1');
    localStorage.setItem('testKey2', 'testValue2');
    service.clear();
    expect(service.isLocalStorageAvailable()).toBe(true);
    expect(localStorage.getItem('testKey1')).toBe(null);
    expect(localStorage.getItem('testKey2')).toBe(null);
  });

  it('should not throw error when clearing empty localStorage', () => {
    service.clear();
    expect(service.isLocalStorageAvailable()).toBe(true);
    expect(localStorage.getItem('testKey')).toBe(null);
  });

  it('should return false if localStorage is not available', () => {
    const mockSetItem = jest.spyOn(localStorage, 'setItem');
    mockSetItem.mockImplementation(() => { throw new Error('Test error'); });
    const result = service.isLocalStorageAvailable();
    expect(result).toBe(false);
    expect(mockSetItem).toHaveBeenCalled();
    mockSetItem.mockRestore();
  });

  it('should return null when localStorage is not available', () => {
    jest.spyOn(service, 'isLocalStorageAvailable').mockReturnValue(false);
    const result = service.getItem('anyKey');
    expect(result).toBeNull();
  });

});
