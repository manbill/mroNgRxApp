import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { MroHttpWithApis, MroResponse } from './../../../providers/api/mro.http-apis';
import * as ProjectActions from "../actions/project.actions";
import * as LoginActions from "../../../pages/login/actions/login.actions";
import * as AppActions from "../../../app/actions/app.actions";
@Injectable()
export class ProjectEffects {
  constructor(private httpApi: MroHttpWithApis, private action$: Actions) { }
  @Effect()
  fetchProjects$ = this.action$.ofType(ProjectActions.FETCH_USER_PROJECTS, LoginActions.LOGIN_SUCCESS)
    .switchMap(() => {
      return this.httpApi.http.post(this.httpApi.apis.fetchProjectsApi, {})
        .map((res: MroResponse) => new ProjectActions.FetchProjectsSuccess(res.data))
        .catch(e => {
          console.error(e);
          return Observable.of(new AppActions.AppThrowsError(e));
        })
    })
}
