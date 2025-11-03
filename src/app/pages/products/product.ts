import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/porducts';
import { Product, ProductResponse } from '../../types/product.interfaace';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule, MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'porducts',
  templateUrl: './product.html',
  providers: [ProductService, MatProgressSpinnerModule],
  imports: [
    MatListModule,
    MatProgressSpinner,
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    MatIconModule,
  ],
})
export class ProductComponent implements OnInit {
  productList = signal<Product[]>([]);
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

  handelProductCLick(o: Product) {
    this.route.navigate([`products/`, o.id]);
  }
}
