import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { ProductService } from '../../services/porducts';
import { ProductDetail } from '../../types/product.interfaace';
import { ActivatedRoute } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'product-item',
  templateUrl: './product-item.html',
  providers: [ProductService],
  imports: [MatCardModule, MatChipsModule, MatProgressBarModule],
})
export class ProductItemComponent implements OnInit {
  product = signal<ProductDetail>({});
  activeRoute = inject(ActivatedRoute);
  productService = inject(ProductService);

  constructor() {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((p: any) => {
      this.productService.getProductDetail(p.id).subscribe({
        next: (productdetail) => {
          this.product.set(productdetail);
        },
      });
    });
  }
}
