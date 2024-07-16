import { TestBed } from '@angular/core/testing';

import { FilterService } from './filter.service';
import { Filter, FilterConstants } from '../../constants/filter.constants';

describe('FilterService', () => {
  let service: FilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ FilterService ]
    });
    service = TestBed.inject(FilterService);
  });

  it('name filterSubject should emit new value', () => {
    const newValue = 'Nike';
    service.updateNameFilter(newValue);
    service.nameFilter$.subscribe(value => {
      expect(value).toEqual(newValue);
    });
  });

  it('rating filterSubject should emit new value', (done) => {
    const mockFilter: Filter = {
      filterType: FilterConstants.RATEING_FILTER,
      filterValue: 5
    };
    service.filter$.subscribe(value => {
      expect(value.filterType).toEqual(mockFilter.filterType);
      expect(value.filterValue).toEqual(mockFilter.filterValue);
      done();
    });
    service.updateRatingsValue(5);
  });

  it('rate range filterSubject should emit new value', (done) => {
    const mockFilter: Filter = {
      filterType: FilterConstants.RATE_RANGE_FILTER,
      filterValue: {min:10000, max:20000}
    }
    service.filter$.subscribe(value => {
      console.log(value.filterValue);
      expect(value.filterType).toEqual(mockFilter.filterType);
      expect(value.filterValue).toEqual(mockFilter.filterValue);
      done();
    });
    service.applyRateRangeFilter(10000,20000);
  });

  it('brand filterSubject should emit new value', (done) => {
    const mockFilter: Filter = {
      filterType: FilterConstants.BRAND_FILTER,
      filterValue: 8
    }
    service.filter$.subscribe(value => {
      expect(value.filterType).toEqual(mockFilter.filterType);
      expect(value.filterValue).toEqual(mockFilter.filterValue);      
      done();
    });
    service.addSelectedBrandFilter(8);   
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
