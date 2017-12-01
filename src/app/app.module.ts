import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/*
 * Platform and Environment providers/directives/pipes
 */
import { environment } from 'environments/environment';
import { appRoutes } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { HomeComponent } from './components/home';
import { AboutComponent } from './components/about';
import { NoContentComponent } from './components/no-content';
import { XLargeDirective } from './components/home/x-large';
import { DevModuleModule } from './components/+dev-module';

import '../styles/styles.scss';
import '../styles/headings.css';

// PrimeNG
import {
    DataTableModule,
    SharedModule
} from 'primeng/primeng';

// Services
import { AuthenticationManager } from './services/authentication/authentication.manager';
import { ProductCustomRestClient } from './services/rest/product-custom-rest.client';
import { BaseComponent } from './components/base.component';
import {ProductListComponent} from "./components/products/product-list.component";

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    BaseComponent,
    ProductListComponent,
    AppComponent,
    AboutComponent,
    HomeComponent,
    NoContentComponent,
    XLargeDirective
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DataTableModule,
    SharedModule,
    RouterModule.forRoot(appRoutes, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),

    /**
     * This section will import the `DevModuleModule` only in certain build types.
     * When the module is not imported it will get tree shaked.
     * This is a simple example, a big app should probably implement some logic
     */
    ...environment.showDevModule ? [ DevModuleModule ] : [],
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    AuthenticationManager,
    ProductCustomRestClient,
    environment.ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {}
