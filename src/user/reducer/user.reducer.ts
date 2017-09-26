import * as UserActions from "../actions/user.actions";
import * as fromLogin from "../../pages/login/reducer/login.reducer";
import { createFeatureSelector } from "@ngrx/store";
export interface UserState {
    login: fromLogin.LoginState;
}
export const initState: UserState = {
    login: fromLogin.initState
}
export function reducer(state: UserState = initState, action: UserActions.Actions): UserState {
    switch (action.type) {
        default:
            return state;
        case UserActions.INIT_USER_STATE: {
            return {
                ...state,
                login: getLoginState((<UserActions.InitUser>action).payload)
            }
        }
    }
}
export const getLoginState = createFeatureSelector<fromLogin.LoginState>('login');
