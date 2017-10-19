import { MroError } from './../../../app/mro-error-handler';
import { Http } from '@angular/http';
import { MroHttpWithApis } from './../../../providers/api/mro.http-apis';
import { Effect, Actions } from "@ngrx/effects";
import { Injectable } from '@angular/core';
import * as LoginActions from "../actions/login.actions";
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import * as AppActions from "../../../app/actions/app.actions";
import { NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/reducers/app.reducer';
import { Db } from '../../../providers/db/db';
import { tableNames } from '../../../providers/db/mro.tables';
import { MroUtils } from '../../../shared/utils';
import { AppThrowsError } from '../../../app/actions/app.actions';

@Injectable()
export class LoginEffects {
  constructor(private action$: Actions, private db: Db, private store: Store<AppState>, private httpApi: MroHttpWithApis) { }
  @Effect()
  login$ = this.action$.ofType(LoginActions.LOGIN)
    .do(() => console.log('login effects'))
    .switchMap((action: LoginActions.Login) => {
      return this.httpApi.http.post(this.httpApi.apis.loginApi, action.payload)
        .do(res => console.log(res))
        .map(res => new LoginActions.LoginSuccess(res['data']))
        .catch(e => {
          console.error(e);
          return Observable.of(new AppActions.AppThrowsError(e));
        })
    });
  @Effect({dispatch:false})
  downloadBaseData$ = this.action$.ofType(LoginActions.LOGIN_SUCCESS)
    .switchMap(() => {
      return this.db.executeSql(`select * from ${tableNames.eam_sync_actions} where syncStatus=?`, [0])
        .map(MroUtils.changeDbResult2Array)
        .map(res => {
          console.log(res);
          if (res.length > 0) {
            res.forEach(action => {
              this.store.dispatch({ type: action.syncAction });
            });
          }
        })
        .map(() => ({ type: "downloadBaseData" }));
    })
}
