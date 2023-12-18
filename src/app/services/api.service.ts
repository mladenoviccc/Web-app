import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient) { }
  apiUrl = "https://dummyjson.com"


  public getAllProducts(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/products`);
  }

  public getProduct(id: string | null): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/products/${id}`);
  }


}
