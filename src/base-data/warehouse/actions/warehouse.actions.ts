import { Action } from '@ngrx/store';
import { MroError } from '../../../app/mro-error-handler';
import { Warehouse } from '../../../modals/warehouse/warehouse.modal';
export const FETCH_WAREHOUSE_DATA = '[Warehouse] fetch_warehouse_data';
export const SELECT_WAREHOUSE = '[Warehouse] SELECT_WAREHOUSE';
export const FETCH_WAREHOUSE_DATA_SUCCESS = '[Warehouse] fetch_warehouse_data_success';
export const FETCH_WAREHOUSE_DATA_FAILED = '[Warehouse] fetch_warehouse_data_failed';
export const INIT_WAREHOUSE_STATE = '[Warehouse] Init_Warehouse_State';
export class InitWarehouseState implements Action {
  readonly type = INIT_WAREHOUSE_STATE;
  constructor(public payload: Warehouse) { };
}
export class SelectWarehouse implements Action {
  readonly type = SELECT_WAREHOUSE;
  constructor(public payload: Warehouse) { };
}
export class FetchWarehouseData implements Action {
  readonly type = FETCH_WAREHOUSE_DATA;
  constructor(public payload: any) { };
}
export class FetchWarehouseDataFailed implements Action {
  readonly type = FETCH_WAREHOUSE_DATA_FAILED;
  constructor(public payload: MroError) { };
}
export class FetchWarehouseDataSuccess implements Action {
  readonly type = FETCH_WAREHOUSE_DATA_SUCCESS;
  constructor(public payload: Warehouse[]) { };
}
export type All =
  FetchWarehouseData
  | FetchWarehouseDataFailed
  | FetchWarehouseDataSuccess
  | SelectWarehouse
