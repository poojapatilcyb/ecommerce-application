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
  searchbrandTerm: string = ''
  minPrice: number = 0;
  maxPrice: number = 0;
  minRangeOption: number[] = [0, 10000, 20000, 30000, 40000];
  maxRangeOption: number[] = [];
  defaultmaxRange = [10000,20000, 30000, 40000, 50000];
  selectedOptions: Brand[] = [];
  brandOptions: Brand[] = [];
  clickoptionflag: boolean = false;
  errorMessage: string = '';
  toggleDropdownFlag: boolean = false;
  // private brandSubscription: Subscription | undefined;

  constructor(
    private filterService: FilterService,
    private brandService: BrandService
  ){
    this.minPrice = 0;
    this.maxPrice = 50001;
    this.maxRangeOption = this.defaultmaxRange;
  }

  ngOnInit(): void {
    this.toggleDropdownFlag = false;
    this.getBrands();
  }
  clickRating(rating: number) {
    this.filterService.updateRatingsValue(rating);
  }

  filterBrands() {
    this.filterService.updateNameFilter(this.searchTerm);
  }

  rangeSelectionApply(){
    this.filterService.applyRateRangeFilter(this.minPrice, this.maxPrice);
  }

  onMinOptionSelection() {
    this.maxRangeOption = this.defaultmaxRange;
    this.maxRangeOption = this.maxRangeOption.filter((item)=> item > this.minPrice);
  }

  filterProducts() {
    this.brandService.getBrand().subscribe({
      next: (brands: Brand[]) => {
        this.brandOptions = brands.filter(brand =>
        brand.name.toLowerCase().includes(this.searchbrandTerm.toLowerCase())
        ); 
      },
      error: (error: string) => { this.errorMessage = error; },
      complete: () => { console.log('complete filterProducts Observable')}
    });  
  }
  getBrands() {
    this.brandService.getBrand().subscribe({
      next: (brands: Brand[]) => {
        this.brandOptions = brands; 
      },
      error: (error: string) => { this.errorMessage = error; },
      complete: () => { console.log('complete filterProducts Observable')}
    });  
  }
  onselectbrand(event: Event) {
    this.filterService.addSelectedBrandFilter(parseInt((event.target  as HTMLInputElement).value));
  }
  toggleDropdown() {
    this.toggleDropdownFlag = !this.toggleDropdownFlag;
  }
  ngOnDestroy(): void { }
}
