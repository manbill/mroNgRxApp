import { Action } from '@ngrx/store';
export const INIT_MRO_TABLES = 'init_mro_tables';
export const INIT_MRO_TABLES_SUCCESS = 'init_mro_tables';
export const INIT_MRO_TABLES_FAILURE = 'init_mro_tables_failure';
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
export type Actions =
  InitTables
  | InitTablesFailed
  | InitTablesSuccess
