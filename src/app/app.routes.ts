import { Routes } from '@angular/router';

import { ProductListComponent } from './components/products/product-list.component';
import { BaseComponent } from './components/base.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'products',
        component: ProductListComponent,
        data: {
          title: 'Products'
        }
      }
    ]
  }
];
