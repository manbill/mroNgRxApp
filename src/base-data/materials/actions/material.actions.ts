import { Material } from './../../../modals/material/material.modal';
import { MroError } from './../../../app/mro-error-handler';
import { Action } from '@ngrx/store';
export const FETCH_MATERIALS_DATA = '[Material] fetch_materials_data';
export const FETCH_MATERIALS_DATA_SUCCESS = '[Material] fetch_materials_data_success';
export const FETCH_MATERIALS_DATA_FAILED = '[Material] fetch_materials_data_failed';
export class FetchMaterialsData implements Action {
  readonly type = FETCH_MATERIALS_DATA;
  constructor(public payload: any) { };
}
export class FetchMaterialsDataSuccess implements Action {
  readonly type = FETCH_MATERIALS_DATA_SUCCESS;
  constructor(public payload: Material[]) { };
}
export class FetchMaterialsDataFailed implements Action {
  readonly type = FETCH_MATERIALS_DATA_FAILED;
  constructor(public payload: MroError) { };
}
export type All = FetchMaterialsData | FetchMaterialsDataSuccess | FetchMaterialsDataFailed
