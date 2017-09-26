import {storeFreeze} from 'ngrx-store-freeze';
import * as fromUser from "../../user/reducer/user.reducer";
import { MetaReducer, createFeatureSelector, ActionReducer, ActionReducerMap } from '@ngrx/store';
import { User } from '../../modals/user/user.modal';
export const isDebug = true;
export interface AppState {
    user: fromUser.UserState
}
export const getUserFeatureState = createFeatureSelector<fromUser.UserState>('user');
export const RootReducers: ActionReducerMap<AppState> = {
    user: fromUser.reducer
}
export function mroLogger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return function(state: AppState, action: any): AppState {
        console.debug('action: ', action);
        console.debug('state: ', state);
        return reducer(state, action);
    }
}
export const metaReducers: MetaReducer<AppState>[] = isDebug ? [mroLogger,storeFreeze] : [];
