import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { FilterService, MinMaxRange } from './filter.service';

describe('FilterService', () => {
  let service: FilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ FilterService ]
    });
    service = TestBed.inject(FilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('filterSubject should emit new value', () => {
  //   const newValue = 'Nike';
  //   service.updateFilter(newValue);
  //   service.filter$.subscribe(value => {
  //     console.log(value);
  //     expect(value).toEqual(newValue);
  //   });
  // });

  // it('ratingSubject should emit new value', () => {
  //   const newValue = 4;
  //   service.updateRatingsValue(newValue);
  //   service.getRatingsValue().subscribe(value => {
  //     expect(value).toEqual(newValue);
  //   });
  // });

  // it('minMaxSubject should emit new value', () => {
  //   const newValue: MinMaxRange = {min: 10000, max:50000};
  //   service.applyRateRangeFilter(10000, 50000);
  //   service.getRateRangeFilter().subscribe(value => {
  //     expect(value).toEqual(newValue);
  //   });
  // });

});
