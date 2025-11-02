import { Routes } from '@angular/router';

export const pageRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./products/product').then((c) => c.ProductComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('./product-item/product-item').then((c) => c.ProductItemComponent),
  },
];
