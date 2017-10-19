import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { MroHttpWithApis, MroResponse } from './../../providers/api/mro.http-apis';
import { Injectable } from '@angular/core';
import * as  projectActions from "../projects/actions/project.actions";
import * as fromUser from "../reducer/user.reducer";
import * as AppActions from "../../app/actions/app.actions";
import { Db } from '../../providers/db/db';
import { tableNames } from '../../providers/db/mro.tables';
import { Store } from '@ngrx/store';
@Injectable()
export class UserEffects {
  constructor(private httpApi: MroHttpWithApis,
    private store: Store<fromUser.UserState>, private db: Db, private action$: Actions) { }
  @Effect({dispatch:false})
  cacheUserState$ = this.action$.ofType(projectActions.SELECT_PROJECT)
    .switchMap((action) => {
      // console.log("cacheUserState",action);
      const sqls = [];
      let store = null;
      this.store.subscribe(s =>{
        store = s;
      },console.error);
      const user = fromUser.getLoginUser(store);
      const userState = fromUser.getUserFeatureState(store);
      console.log(userState);
      console.log(user);
      sqls.push(`delete from ${tableNames.eam_user}`);
      sqls.push([`insert into ${tableNames.eam_user}(userId,userStateJson)values(?,?)`, [user.id, JSON.stringify(userState)]]);
      return this.db.sqlBatch(sqls)
      // .mapTo(()=>Observable.of({type:"cacheUserState success"}))
      .catch(e=>{
        console.error(e);
        return Observable.throw(new AppActions.AppThrowsError(e));
      })
    })
}
