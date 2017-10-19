import { MroError } from './../mro-error-handler';
import { Action } from '@ngrx/store';
export const INIT_MRO_TABLES = 'init_mro_tables';
export const INIT_MRO_TABLES_SUCCESS = 'init_mro_tables';
export const INIT_MRO_TABLES_FAILURE = 'init_mro_tables_failure';
export const APP_THROWS_ERROR = 'app_throws_error';
export const APP_INITIALIZING = '[App] App_Initializing';
export const APP_INITIALIZIED = '[App] app_initializied';
export class InitTables implements Action {
  readonly type = INIT_MRO_TABLES;
  constructor(public payload: any) { }
}
export class InitTablesSuccess implements Action {
  readonly type = INIT_MRO_TABLES_SUCCESS;
  constructor(public payload: any) { }
}
export class InitTablesFailed implements Action {
  readonly type = INIT_MRO_TABLES_FAILURE;
  constructor(public payload: any) { }
}
export class AppThrowsError implements Action {
  readonly type = APP_THROWS_ERROR;
  constructor(public payload: MroError) { }
}
export class AppInitializing implements Action {
  readonly type = APP_INITIALIZING;
  constructor(public payload: any) { }
}
export class AppInitialized implements Action {
  readonly type = APP_INITIALIZIED;
  constructor(public payload: any) { }
}
export type Actions =
  InitTables
  | InitTablesFailed
  | InitTablesSuccess
  | AppThrowsError
  | AppInitializing
  | AppInitialized
