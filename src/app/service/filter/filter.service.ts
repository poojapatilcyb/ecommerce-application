import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Brand } from '../../../Model/brand.model';

@Injectable({
  providedIn: 'root'
})

export class FilterService {


  private filterSubject = new Subject<string>();
  private ratingSubject = new Subject<number>();
  private minMaxSubject = new Subject<any>();
  private brands: Brand[] = []; // Array to hold subjects
  private selectedBrandBehaviourSubject: BehaviorSubject<Brand[]>; // BehaviorSubject to emit changes


  filter$ = this.filterSubject.asObservable();

  constructor(){
    this.selectedBrandBehaviourSubject = new BehaviorSubject<Brand[]>(this.brands);
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
  getselectedBrandBehaviourSubject(): Observable<Brand[]> {
    return this.selectedBrandBehaviourSubject.asObservable();
  }
  addSelectedBrandBehaviourSubject(subject: Brand): void {
    this.brands.push(subject); // Push object into array
    this.selectedBrandBehaviourSubject.next(this.brands); // Emit new array to subscribers
  }
}
