import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Brand } from '../../../Model/brand.model';
import { Product } from '../../../Model/product.model';
import { ProductService } from '../product/product.service';

@Injectable({
  providedIn: 'root'
})

export class FilterService {

  productSubject = new BehaviorSubject<Product[]>([]);
  productObservable = this.productSubject.asObservable();

  constructor(
    private productService: ProductService
  ){
    this.loadInitialProducts();
  }

  loadInitialProducts(){
    this.productService.getProducts().subscribe((product) => {
      this.updateProduct(product);
    });
  }

  updateProduct(product: Product[]) {
    this.productSubject.next(product);
  }

  updateFilter(filterValue: string) {
    let prod: Product[] = [];
    this.productObservable.subscribe((product)=> {
      if(product.length > 0){
        prod = product.filter(product =>
          product.name.toLowerCase().includes(filterValue.toLowerCase())
        );
      }else {
        prod =[];
      }
      this.updateProduct(prod);
   
    });
  }

  updateRatingsValue(rating: number) {
    let prod: Product[] = [];
    this.productObservable.subscribe((product)=> {
      console.log('product', product,)
      if(product.length > 0) {
      prod = product.filter(item => item?.rating >= rating);
      console.log( '\n prod', prod, '\n rating', rating);
      }else {
        prod = [];
      }
    });
    this.updateProduct(prod);
  }

  applyRateRangeFilter(min: number, max: number) {
    let prod: Product[] = [];
    this.productObservable.subscribe((product)=> {
      console.log('product', product,)
      if(product.length > 0){
        prod = product;
        if(max === 50001){
          prod = product.filter(item => item?.price >= min);
        }else {
          prod = product.filter(item => item?.price >= min && item.price < max );
        }
      }else {
        prod = [];
      }
    });
    this.updateProduct(prod);
  }

  addSelectedBrandFilter(id: number): void {
    let prod: Product[] = [];
    this.productObservable.subscribe((product)=> {
      console.log('product', product,)
      if(product.length > 0) {
      prod = product.filter(item => item?.brand_id === id);
      }else {
        prod = [];
      }
    });
    this.updateProduct(prod);
  }
}

export interface MinMaxRange {
  min: number;
  max: number;
}