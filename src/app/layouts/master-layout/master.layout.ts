import { booleanAttribute, Component, inject, input, model, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ProductService } from '../../services/porducts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-master-layout',
  templateUrl: './master.layout.html',
  imports: [RouterOutlet, MatListModule, FormsModule, ReactiveFormsModule],
  providers: [ProductService],
})
export class MasterLayoutComponent implements OnInit {
  productService = inject(ProductService);
  route = inject(Router);
  searchText = model<string>('');
  isLoading = model<boolean>(true);

  productCategories = signal<string[]>([]);
  constructor() {}

  ngOnInit(): void {
    this.productService.getAllProductCategories().subscribe({
      next: (category: string[]) => {
        this.productCategories.update((preVal) => {
          return [...preVal, ...category];
        });
      },
    });
    this.isLoading.set(false);
  }
  handelCategorySelection(category: string) {
    this.route.navigate([`products/category/`, category]);
  }
  handleSearch() {
    this.route.navigate(['products/search'], { queryParams: { q: this.searchText() } });
  }
}
