import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../services/porducts';
import { Product, ProductDetail, ProductResponse } from '../../types/product.interfaace';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'porducts',
  templateUrl: './product.html',
  providers: [ProductService, MatProgressSpinnerModule],
  imports: [
    MatListModule,
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    MatIconModule,
    MatBadgeModule,
  ],
})
export class ProductComponent implements OnInit {
  productList = signal<ProductDetail[]>([]);
  isLoading = signal(false);
  productService = inject(ProductService);
  route = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  constructor() {
    console.log('comes to product component');
  }

  ngOnInit(): void {
    this.isLoading.set(true);
    let categoryName = '';
    let query = '';
    this.activatedRoute.params.subscribe((params: any) => {
      categoryName = params.categoryName;
      if (categoryName) {
        this.loadProductByCategory(categoryName);
      }
    });
    this.activatedRoute.queryParams.subscribe((params: any) => {
      query = params.q;
      if (query) {
        this.searchProducts(query);
      } else {
        this.loadAllProducts();
      }
    });
    this.isLoading.set(false);
  }

  handelProductCLick(o: ProductDetail) {
    this.route.navigate([`products/`, o.id]);
  }

  loadProductByCategory(categoryName: string) {
    this.productService.getProductsByCategory(categoryName).subscribe({
      next: (value: ProductResponse) => {
        return this.productList.set(value.products);
      },
    });
  }
  loadAllProducts() {
    this.productService.getProductList().subscribe({
      next: (value: ProductResponse) => {
        return this.productList.set(value.products);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  searchProducts(query: string) {
    this.productService.searchProducts(query).subscribe({
      next: (value: ProductResponse) => {
        return this.productList.set(value.products);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
