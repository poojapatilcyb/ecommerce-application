import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Brand } from '../../../Model/brand.model';

@Injectable({
  providedIn: 'root'
})

export class FilterService {
  private filterSubject = new Subject<string>();
  filter$ = this.filterSubject.asObservable();

  private ratingSubject = new Subject<number>();
  private minMaxSubject = new Subject<MinMaxRange>();
  private brandFilterSubject = new Subject<number>(); // BehaviorSubject to emit changes

  constructor(){
  }

  updateFilter(filterValue: string) {
    this.filterSubject.next(filterValue);
  }
  updateRatingsValue(rating: number) {
    this.ratingSubject.next(rating);
  }
  getRatingsValue() {
    return this.ratingSubject.asObservable();
  }
  applyRateRangeFilter(min: number, max: number) {
    this.minMaxSubject.next({min, max});
  }
  getRateRangeFilter() {
    return this.minMaxSubject.asObservable();
  }
  getselectedBrandFilter(): Observable<number> {
    return this.brandFilterSubject.asObservable();
  }
  addSelectedBrandFilter(id: number): void {
    this.brandFilterSubject.next(id);
  }
}

export interface MinMaxRange {
  min: number;
  max: number;
}