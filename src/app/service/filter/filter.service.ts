import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Filter, FilterConstants } from '../../constants/filter.constants';

@Injectable({
  providedIn: 'root'
})

export class FilterService {
  private filterSubject = new Subject<Filter>;
  filter$ = this.filterSubject.asObservable();


  private NameFilterSubject = new Subject<string>();
  nameFilter$ = this.NameFilterSubject.asObservable();

  constructor(){}

  updateNameFilter(filterValue: string) {
    this.NameFilterSubject.next(filterValue);
  }
  updateRatingsValue(rating: number) {
    this.filterSubject.next({
      filterType: FilterConstants.RATEING_FILTER,
      filterValue: rating
    });
  }

  applyRateRangeFilter(min: number, max: number) {
    this.filterSubject.next({
      filterType: FilterConstants.RATE_RANGE_FILTER,
      filterValue: {min, max}
    });
  }


  addSelectedBrandFilter(id: number): void {
    this.filterSubject.next({
      filterType: FilterConstants.BRAND_FILTER,
      filterValue: id
    });
  }
}

