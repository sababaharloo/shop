import { Routes } from '@angular/router';

export const pageRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./products/product').then((c) => c.ProductComponent),
  },
  {
    path: 'category/:categoryName',
    loadComponent: () => import('./products/product').then((c) => c.ProductComponent),
  },
  {
    path: 'search',
    loadComponent: () => import('./products/product').then((c) => c.ProductComponent),
  },
  {
    // ask about why when it was in place of search it would not work
    path: ':id',
    loadComponent: () => import('./product-item/product-item').then((c) => c.ProductItemComponent),
  },
];
