import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FilterService {
  private filterSubject1 = new Subject<filter>;
  filter1$ = this.filterSubject1.asObservable();


  private NameFilterSubject = new Subject<string>();
  filter$ = this.NameFilterSubject.asObservable();

  constructor(){}

  updateNameFilter(filterValue: string) {
    this.NameFilterSubject.next(filterValue);
  }
  updateRatingsValue(rating: number) {
    this.filterSubject1.next({
      filterType: 'rating_filter',
      filterValue: rating
    });
  }

  applyRateRangeFilter(min: number, max: number) {
    this.filterSubject1.next({
      filterType: 'rate_range_filter',
      filterValue: {min, max}
    });
  }


  addSelectedBrandFilter(id: number): void {
    this.filterSubject1.next({
      filterType: 'brand_filter',
      filterValue: id
    });
  }
}

export interface MinMaxRange {
  min: number;
  max: number;
}

export interface filter {
  filterType: string;
  filterValue: string | number | MinMaxRange;
}