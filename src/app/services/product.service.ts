import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Product } from '../model/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public http:HttpClient) { }

  loadProuctInfo(): Observable<Product[]> {
    return this.http.get<Product[]>("http://localhost:9090/api/product/getProductInfo");
  }
}
