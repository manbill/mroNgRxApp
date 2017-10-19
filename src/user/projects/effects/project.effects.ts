import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { MroHttpWithApis, MroResponse } from './../../../providers/api/mro.http-apis';
import * as ProjectActions from "../actions/project.actions";
import * as LoginActions from "../../../pages/login/actions/login.actions";
import * as AppActions from "../../../app/actions/app.actions";
import { Db } from '../../../providers/db/db';
import { tableNames } from '../../../providers/db/mro.tables';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app/reducers/app.reducer';
import * as fromUser from "../../reducer/user.reducer";
@Injectable()
export class ProjectEffects {
  constructor(private httpApi: MroHttpWithApis, private action$: Actions, private db: Db, private store: Store<AppState>) { }
  @Effect()
  fetchProjects$ = this.action$.ofType(ProjectActions.FETCH_USER_PROJECTS,LoginActions.LOGIN_SUCCESS)
    .switchMap(() => {
      return this.httpApi.http.post(this.httpApi.apis.fetchProjectsApi, {})
        .map((res: MroResponse) => new ProjectActions.FetchProjectsSuccess(res.data))
        .catch(e => {
          console.error(e);
          return Observable.of(new AppActions.AppThrowsError(e));
        })
    });
  @Effect({dispatch:false})
  selectProject$ = this.action$.ofType(ProjectActions.SELECT_PROJECT)
    .switchMap(() => {
      console.log('update userstate');
      const userState$ = this.store.select(fromUser.getUserFeatureState);
      let userState = null;
      let userId = null;
      const stateSubscription = userState$.subscribe((state => {
        userState = state;
        userId = state.login.user.id;
        console.log('stateSubscription', stateSubscription);
        console.log(userState);
      }));
      console.log('stateSubscription', stateSubscription);
      stateSubscription!.unsubscribe();
      console.log(userId);
      return this.db.executeSql(`update ${tableNames.eam_user} set userStateJson=? where userId=?`, [JSON.stringify(userState), userId])
        .do(() => console.log("userstate updated "))
        .map(() => ({ type: 'userstate updated success' }))
        .catch(e => {
          console.error(e);
          return Observable.throw(e);
        })
    })
}
