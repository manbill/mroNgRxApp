import { User } from './../../../../modals/user/user.modal';
import { Authenticate } from './../authenticate';
import { Action } from "@ngrx/store/store";

export const LOGIN = 'login';
export const LOGOUT = 'logout';
export const LOGIN_SUCCESS = 'login_success';
export const LOGIN_FAILED = 'login_failed';
export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: Authenticate) { }
}
export class Logout implements Action {
  readonly type = LOGOUT;
  constructor(public payload: number) { }
}
export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: User) {
  }
}
export class LoginFailed implements Action {
  readonly type = LOGIN_FAILED;
  constructor(public payload: any) { }
}
export type Actions = Login
  | LoginSuccess
  | LoginFailed
  | Logout
