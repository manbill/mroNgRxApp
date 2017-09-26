import * as UserActions from "../actions/user.actions";
import * as fromLogin from "../../pages/login/reducer/login.reducer";
import * as fromProject from "../projects/reducer/project.reducer";
import { createFeatureSelector, createSelector, ActionReducerMap } from "@ngrx/store";
export interface UserState {
  login: fromLogin.LoginState;
  project: fromProject.ProjectState
}
export const initState: UserState = {
  login: fromLogin.initState,
  project: fromProject.inintState
}
export const reducer: ActionReducerMap<UserState> = {
  login: fromLogin.reducer,
  project: fromProject.reducer
}

export const getLoginState = createFeatureSelector<fromLogin.LoginState>('login');
export const getLoggedIn = createSelector(getLoginState, fromLogin.getLoggedIn);
export const getLoginUser = createSelector(getLoginState, fromLogin.getLoginUser);
