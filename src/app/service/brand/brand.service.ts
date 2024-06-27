import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../../../Model/brand.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl: string = environment.API_URL + '/brands';
 
  constructor(private http: HttpClient) {}
 
  getBrand(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.apiUrl);
  }
}
