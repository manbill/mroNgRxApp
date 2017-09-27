import * as UserActions from "../actions/user.actions";
import * as fromLogin from "../../pages/login/reducer/login.reducer";
import * as fromProject from "../projects/reducer/project.reducer";
import * as fromCompany from "../companies/reducer/company.reducer";
import { createFeatureSelector, createSelector, ActionReducerMap } from "@ngrx/store";
export interface UserState {
  login: fromLogin.LoginState;
  project: fromProject.ProjectState;
  company: fromCompany.CompanyState;
}
export const initState: UserState = {
  login: fromLogin.initState,
  project: fromProject.inintState,
  company: fromCompany.initState
}
export const reducers: ActionReducerMap<UserState> = {
  login: fromLogin.reducer,
  project: fromProject.reducer,
  company: fromCompany.reducer
}
export const getUserFeatureState = createFeatureSelector<UserState>('user');
//-------------------------------------login-----------------------------------
export const getLoginFeatureState = createFeatureSelector<fromLogin.LoginState>('login');
export const getLoginState = createSelector(getUserFeatureState, getLoginFeatureState);
export const getLoggedIn = createSelector(getLoginState, fromLogin.getLoggedIn);
export const getLoginUser = createSelector(getLoginState, fromLogin.getLoginUser);
//-------------------------------------login-----------------------------------

//======================================project====================================
export const getProjectFeatureState = createFeatureSelector<fromProject.ProjectState>('project');
export const getProjectState = createSelector(getUserFeatureState, getProjectFeatureState);
export const getProjectEntities = createSelector(getProjectState, fromProject.getProjectEntities);
export const getProjectPendingStatus = createSelector(getProjectState, fromProject.getProjectPendingStatus);
export const getProjectIds = createSelector(getProjectState, fromProject.getProjectIds);
export const getProjects = createSelector(getProjectState, fromProject.getProjects);
export const getSelectedProjectId = createSelector(getProjectState, fromProject.getSelectedProjectId);
//======================================project====================================

//--------------------------------------company-------------------------------------------------
export const getCompanyFeatureState = createFeatureSelector<fromCompany.CompanyState>('company');
export const getCompanyState = createSelector(getUserFeatureState, getCompanyFeatureState);
export const getCompanies = createSelector(getCompanyState, fromCompany.getCompanies);
export const getCompanyEntitites = createSelector(getCompanyState, fromCompany.getCompanyEntitites);
export const getCompanyIds = createSelector(getCompanyState, fromCompany.getCompanyIds);
export const getCompanyPendingStatus = createSelector(getCompanyState, fromCompany.getCompanyPendingStatus);
export const getSelectedCompanyId = createSelector(getCompanyState, fromCompany.getSelectedCompanyId);
//--------------------------------------company-------------------------------------------------
