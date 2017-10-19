import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { MroHttpWithApis, MroResponse } from './../../providers/api/mro.http-apis';
import { Injectable } from '@angular/core';
import * as UserActions from "../actions/user.actions";
import * as fromUser from "../reducer/user.reducer";
import * as LoginActions from "../../pages/login/actions/login.actions";
import * as AppActions from "../../app/actions/app.actions";
import { Db } from '../../providers/db/db';
import { tableNames } from '../../providers/db/mro.tables';
import { Store } from '@ngrx/store';
@Injectable()
export class UserEffects {
  constructor(private httpApi: MroHttpWithApis,
    private store: Store<fromUser.UserState>, private db: Db, private action$: Actions) { }
  @Effect({ dispatch: false })
  cacheUserState$ = this.action$.ofType(LoginActions.LOGIN_SUCCESS)
    .switchMap(() => {
      const sqls = [];
      const user = fromUser.getLoginUser(this.store);
      const userState = fromUser.getUserFeatureState(this.store);
      console.log(userState);
      console.log(user);
      sqls.push(`delete from ${tableNames.eam_user}`);
      sqls.push([`insert into ${tableNames.eam_user}(userId,userStateJson)values(?,?)`, [user.id, JSON.stringify(userState)]]);
      return this.db.sqlBatch(sqls);
    })
}
