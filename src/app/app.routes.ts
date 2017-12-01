import { Routes } from '@angular/router';

import { HomeComponent } from './components/home';
import { AboutComponent } from './components/about';
import { NoContentComponent } from './components/no-content';
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
  },
  // { path: 'home',  component: HomeComponent },
  // { path: 'about', component: AboutComponent },
  // { path: 'detail', loadChildren: './components/+detail#DetailModule'},
  // { path: 'barrel', loadChildren: './components/+barrel#BarrelModule'},
  // { path: '**',    component: NoContentComponent },
];
