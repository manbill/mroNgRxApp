import { MroError } from './../mro-error-handler';
import { storeFreeze } from 'ngrx-store-freeze';
import * as fromUser from "../../user/reducer/user.reducer";
import * as AppActions from "../actions/app.actions";
import { MetaReducer, createFeatureSelector, ActionReducer, ActionReducerMap, createSelector } from '@ngrx/store';
import { User } from '../../modals/user/user.modal';
export const isDebug = true;
export interface AppErrorState {
  errorCodes: number[];
  errors: {
    [errCode: number]: MroError
  }
}
export interface AppState {
  appErrors: AppErrorState;
  initializing: boolean;
}
export const RootReducers: ActionReducerMap<AppState> = {
  appErrors: appErrorsReducer,
  initializing: InitializeReducer
}
export function InitializeReducer(state: boolean = false, action: AppActions.Actions) {
  switch (action.type) {
    default:
      return state;
    case AppActions.APP_INITIALIZING:
      return true;
    case AppActions.APP_INITIALIZIED:
      return false;
  }
}
export function appErrorsReducer(state: AppErrorState = {
  errorCodes: [],
  errors: {}
}, action: AppActions.Actions): AppErrorState {
  switch (action.type) {
    default:
      return state;
    case AppActions.APP_THROWS_ERROR: {
      const err = (<AppActions.AppThrowsError>action).payload;
      return {
        ...state,
        errorCodes: [...state.errorCodes, err.errorCode],
        errors: Object.assign({}, state.errors, { [err.errorCode]: err })
      }
    }
  }
}
export function mroLogger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function (state: AppState, action: any): AppState {
    console.debug('action: ', action);
    console.debug('state: ', state);
    return reducer(state, action);
  }
}
export const metaReducers: MetaReducer<AppState>[] = isDebug ? [mroLogger, storeFreeze] : [];
