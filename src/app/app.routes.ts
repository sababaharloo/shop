import { Routes } from '@angular/router';
import { ProductComponent } from './pages/products/product';
import { ProductItemComponent } from './pages/product-item/product-item';
import { MasterLayoutComponent } from './layouts/master-layout/master.layout';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products',
  },
  {
    path: 'products',
    component: MasterLayoutComponent,
    loadChildren: () => import('./pages/pages.routes').then((c) => c.pageRoutes),
  },
];
