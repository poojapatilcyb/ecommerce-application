import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../../../Model/brand.model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl: string = 'http://localhost:3000/brands';
 
  constructor(private http: HttpClient) {}
 
  getBrand(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.apiUrl);
  }
}
