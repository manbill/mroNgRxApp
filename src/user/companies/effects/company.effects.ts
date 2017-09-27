import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { MroHttpWithApis } from '../../../providers/api/mro.http-apis';
import * as CompanyActions from "../actions/company.actions";
import * as ProjectActions from "../../projects/actions/project.actions";
import { Company } from '../../../modals/company/company.modal';
import { Observable } from 'rxjs/Observable';
// import * as LoginActions from "../../../pages/login/actions/login.actions";
import { AppState } from '../../../app/reducers/app.reducer';
import { Store } from '@ngrx/store';
import * as fromUser from "../../reducer/user.reducer";
@Injectable()
export class CompanyEffects {
  constructor(private httpApi: MroHttpWithApis, private action$: Actions, private store: Store<AppState>) { }
  @Effect()
  fetchCompanies$ = this.action$.ofType(CompanyActions.FETCH_USER_COMPANIES, ProjectActions.FETCH_USER_PROJECTS_SUCCESS/* LoginActions.LOGIN_SUCCESS */)
    .switchMap(() => {
      const companies: Company[] = [{
        companyId: 1,
        companyName: "上海电气风电集团有限公司",
        projectIds: []
      }];
      this.store.select(fromUser.getProjectIds).subscribe(ids => companies[0].projectIds = ids);
      return Observable.of(new CompanyActions.FetchCompaniesSuccess(companies));
    });
}
