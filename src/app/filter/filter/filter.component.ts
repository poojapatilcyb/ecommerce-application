import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilterService } from '../../service/filter/filter.service';
import { Brand } from '../../../Model/brand.model';
import { BrandService } from '../../service/brand/brand.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit, OnDestroy{

  ratings = Array(5).fill(0);
  searchTerm: string = '';
  minPrice: number = 0;
  maxPrice: number = 0;
  minRangeOption: number[] = [0, 10000, 20000, 30000, 40000];
  maxRangeOption: number[] = [];
  defaultmaxRange = [10000,20000, 30000, 40000, 50000];
  selectedOptions: Brand[] = [];
  brandOptions: Brand[] = [];
  clickoptionflag: boolean = false;
  errorMessage: string = '';
  private brandSubscription: Subscription | undefined;

  constructor(
    private filterService: FilterService,
    private brandService: BrandService
  ){
    this.minPrice = 0;
    this.maxPrice = 50001;
    this.maxRangeOption = this.defaultmaxRange;
  }

  ngOnInit(): void {
    this.getBrand();
  }
  clickRating(rating: number) {
    this.filterService.updateRatingsValue(rating);
  }

  filterBrands() {
    this.filterService.updateFilter(this.searchTerm);
  }

  rangeSelectionApply(){
    this.filterService.applyRateRangeFilter(this.minPrice, this.maxPrice);
  }

  onMinOptionSelection() {
    this.maxRangeOption = this.defaultmaxRange;
    this.maxRangeOption = this.maxRangeOption.filter((item)=> item > this.minPrice);
  }

  getBrand(){
    this.brandSubscription = this.brandService.getBrand().subscribe({
        next: (data: Brand[]) => { this.brandOptions = data; },
        error: (error) => { this.errorMessage = error; },
        complete: () => { console.log('complete getBrand Observable')}
    });  
  }

  onSelect(option: Brand) {
    if (this.selectedOptions.some(product => product.id === option.id)) {
      this.selectedOptions = this.selectedOptions.filter(item => item.id !== option.id);
    } else {
      this.selectedOptions.push(option) ;
      this.filterService.addSelectedBrandBehaviourSubject(option);
    }
  }

  isSelected(option: Brand): boolean {
    return this.selectedOptions.includes(option);
  }

  clickoption(){
    this.clickoptionflag = !this.clickoptionflag
    console.log(this.clickoptionflag);
  }

  ngOnDestroy(): void {
    if(this.brandSubscription) {
      this.brandSubscription.unsubscribe();
    }
  }
}
