import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product, ProductDetail, ProductResponse } from '../types/product.interfaace';

@Injectable()
export class ProductService {
  httpClient = inject(HttpClient);

  getProductList(): Observable<ProductResponse> {
    return this.httpClient.get('https://dummyjson.com/products') as Observable<ProductResponse>;
  }
  getProductDetail(id: number) {
    return this.httpClient.get(`https://dummyjson.com/products/${id}`) as Observable<ProductDetail>;
  }
}
