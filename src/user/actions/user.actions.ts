import { Action } from '@ngrx/store';
import { UserState } from '../reducer/user.reducer';
export const INIT_USER_STATE = '[user] init_user_state';
export class InitUser implements Action {
  readonly type = INIT_USER_STATE;
  constructor(public payload: UserState) { }
}
export type Actions =
  InitUser
