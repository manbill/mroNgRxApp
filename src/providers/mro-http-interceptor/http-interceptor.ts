import { AppState } from '../../app/reducers/app.reducer';
import { HttpInterceptorService } from 'ng-http-interceptor';
import { Store } from '@ngrx/store';
import { Provider } from '@angular/core';
import { Http } from '@angular/http';
export const mroHttp = (http: HttpInterceptorService, store: Store<AppState>) => {
  return http;
}
export const HttpProvider: Provider = {
  provide: Http,
  useFactory: (http: HttpInterceptorService, store: Store<AppState>) => mroHttp(http, store),
  deps: [HttpInterceptorService, Store]
}
