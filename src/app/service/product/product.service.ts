import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { Product } from '../../../Model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl: string = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}
 
  getProducts(params?: any): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, { params });
  }
}
