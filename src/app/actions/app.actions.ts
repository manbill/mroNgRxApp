import { MroError } from './../mro-error-handler';
import { Action } from '@ngrx/store';
export const INIT_MRO_TABLES = 'init_mro_tables';
export const INIT_MRO_TABLES_SUCCESS = 'init_mro_tables';
export const INIT_MRO_TABLES_FAILURE = 'init_mro_tables_failure';
export const APP_THROWS_ERROR = 'app_throws_error';
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
export type Actions =
  InitTables
  | InitTablesFailed
  | InitTablesSuccess
  | AppThrowsError
