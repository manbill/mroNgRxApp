import { Http } from '@angular/http';
import { MroHttpWithApis } from './../../../providers/api/mro.http-apis';
import { Effect, Actions } from "@ngrx/effects";
import { Injectable } from '@angular/core';
import * as LoginActions from "../actions/login.actions";
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import * as AppActions from "../../../app/actions/app.actions";

@Injectable()
export class LoginEffects {
  constructor(private action$: Actions, private httpApi: MroHttpWithApis) { }
  @Effect()
  login$ = this.action$.ofType(LoginActions.LOGIN)
    .switchMap((action: LoginActions.Login) => {
      return this.httpApi.http.post(this.httpApi.apis.loginApi, action.payload)
        .do(res => console.log(res))
        .map(res => new LoginActions.LoginSuccess(res['data']))
        .catch(e => {
          console.error(e);
          return Observable.of(new AppActions.AppThrowsError(e));
        })
    })
}
