import { Action } from "@ngrx/store";
import { Authenticate } from '../modal/login.modal';
import { User } from '../../../modals/user/user.modal';
export const LOGIN = '[Login] login';
export const LOGOUT = '[Login] logout';
export const LOGIN_SUCCESS = '[Login] login_success';
export const LOGIN_FAILURE = '[Login] login_failure';
export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: Authenticate) { }
}
export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: User) { }
}
export class Logout implements Action {
  readonly type = LOGOUT;
  constructor(public payload: any) { }
}
export class LoginFailure implements Action {
  readonly type = LOGIN_FAILURE;
  constructor(public payload: any) { }
}
export type Actions =
  Login | LoginFailure | LoginSuccess | Logout;
