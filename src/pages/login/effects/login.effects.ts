import { Effect, Actions } from "@ngrx/effects";
import { Injectable } from '@angular/core';
import * as LoginActions from "../actions/login.actions";
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginEffects {
  constructor(private action$: Actions) { }
  @Effect()
  login$ = this.action$.ofType(LoginActions.LOGIN)
    .switchMap((action: LoginActions.Login) => {
      return Observable.empty();
    })
}
