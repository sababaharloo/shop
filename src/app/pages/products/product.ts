import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/porducts';
import { Product, ProductDetail, ProductResponse } from '../../types/product.interfaace';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatBadgeModule} from '@angular/material/badge';


@Component({
  selector: 'porducts',
  templateUrl: './product.html',
  providers: [ProductService, MatProgressSpinnerModule],
  imports: [MatListModule, MatCardModule, MatChipsModule, MatProgressBarModule, MatIconModule,MatBadgeModule],
})
export class ProductComponent implements OnInit {
  productList = signal<ProductDetail[]>([]);
  isLoading = signal(false);
  productService = inject(ProductService);
  route = inject(Router);
  constructor() {}

  ngOnInit(): void {
    this.isLoading.set(true);
    this.productService.getProductList().subscribe({
      next: (value: ProductResponse) => {
        this.productList.update((preVal) => {
          return [...preVal, ...value.products];
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.isLoading.set(false);
  }

  handelProductCLick(o: ProductDetail) {
    this.route.navigate([`products/`, o.id]);
  }
}
