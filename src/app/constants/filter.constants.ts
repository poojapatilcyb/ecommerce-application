export enum FilterConstants {
    NAME_FILTER= 'name_filter',
    RATEING_FILTER= 'rateing_filter',
    RATE_RANGE_FILTER = 'rate_range_filter',
    BRAND_FILTER = 'brand_filter'
  }

  export interface MinMaxRange {
    min: number;
    max: number;
  }
  
  export interface Filter {
    filterType: string;
    filterValue: string | number | MinMaxRange;
  }
  
  