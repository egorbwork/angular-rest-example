import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
import { AppState } from './app.service';

import '../styles/styles.scss';
import '../styles/headings.css';

// PrimeNG
import {
    DataTableModule,
    InputTextModule,
    InputTextareaModule,
    SharedModule
} from 'primeng/primeng';

// NGX-REST
import { RestModule } from 'rest-ngx';
import { RestHandler } from 'rest-core';

// Components
import { BaseComponent } from './components/base.component';
import { ProductListComponent } from './components/products/product-list.component';

// Services
import { AuthenticationManager } from './services/authentication/authentication.manager';
import {
  LocalRestHandler, ProductRestClient, ProductCustomRestClient
} from './services/rest';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

export function localHandlerFactory(http: HttpClient) {
    return new LocalRestHandler(http);
}

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    BaseComponent,
    ProductListComponent,
    AppComponent
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
    InputTextModule,
    InputTextareaModule,
    SharedModule,
    RestModule.forRoot({
        handler: { provide: RestHandler, useFactory: (localHandlerFactory), deps: [HttpClient] }
    }),
    RouterModule.forRoot(appRoutes, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    })
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    AuthenticationManager,
    ProductCustomRestClient,
    ProductRestClient,
    environment.ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {}
