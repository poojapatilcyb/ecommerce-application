import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../Model/product.model';
import { Params } from '../../../Model/params.model';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl: string = environment.API_URL + '/products';

  constructor(private http: HttpClient) {}
 
  getProducts(params?: Params): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, { params });
  }
}
