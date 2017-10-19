import { User } from '../../../modals/user/user.modal';
import * as LoginActions from "../actions/login.actions";
export interface LoginState {
  loggedIn: boolean;
  user: User;
}
export const initState: LoginState = {
  loggedIn: false,
  user: null
}
export function reducer(state: LoginState = initState, action: LoginActions.Actions): LoginState {
  switch (action.type) {
    default:
      return state;
    case LoginActions.LOGIN_SUCCESS: {
      console.log((<LoginActions.LoginSuccess>action).payload);
      return {
        ...state,
        loggedIn: true,
        user: (<LoginActions.LoginSuccess>action).payload
      }
    }
    case LoginActions.LOGOUT:
    case LoginActions.LOGIN_FAILURE: {
      return {
        ...state,
        loggedIn: false,
        user:null
      }
    }
  }
}
export const getLoginUser = (state: LoginState) => state.user;
export const getLoggedIn = (state: LoginState) => state.loggedIn;
