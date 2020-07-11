import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NbThemeModule} from "@nebular/theme";
import {LayoutModule} from "./main/main-layouts/layout/layout.module";
import {AdminLayoutComponent} from "./main/main-layouts/layout/admin-layouts/admin-layout/admin-layout.component";
import {SharedModule} from "./Shared/shared.module";
import {AppRoutingModule} from "./app-routing.module";
import {LocationStrategy, PathLocationStrategy} from "@angular/common";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TokenInterceptorService} from "./services/auth/token-interceptor.service";
import {ErrorInterceptorService} from "./services/auth/error-interceptor.service";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'server'}),
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'default'}),
    LayoutModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.
    register('../../node_modules/@angular/service-worker/ngsw-worker.js',
      { enabled: environment.production }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    },
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
