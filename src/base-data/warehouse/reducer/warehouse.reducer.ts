import { Warehouse } from '../../../modals/warehouse/warehouse.modal';
import * as WarehouseActions from "../actions/warehouse.actions";
export interface WarehouseState {
  ids: number[];
  entitites: {
    [id: number]: Warehouse;
  };
  pending: boolean;
  selectedId: number;
}
export const initState: WarehouseState = {
  ids: [],
  entitites: {},
  pending: false,
  selectedId: null
}
export function reducer(state: WarehouseState=initState, action: WarehouseActions.All): WarehouseState {
  switch (action.type) {
    default:
      return state;
    case WarehouseActions.SELECT_WAREHOUSE: {
      return {
        ...state,
        selectedId: ((<WarehouseActions.SelectWarehouse>action).payload).repertoryId
      }
    }
    case WarehouseActions.FETCH_WAREHOUSE_DATA: {
      return {
        ...state,
        pending: true
      }
    }
    case WarehouseActions.FETCH_WAREHOUSE_DATA_FAILED: {
      return {
        ...state,
        pending: false
      }
    }
    case WarehouseActions.FETCH_WAREHOUSE_DATA_SUCCESS: {
      const warehouses = (<WarehouseActions.FetchWarehouseDataSuccess>action).payload;
      return {
        ...state,
        ids: warehouses.map(w => w.repertoryId),
        entitites: warehouses.reduce((e, w) => { e[w.repertoryId] = w; return e; }, {}),
        pending: false
      }
    }
  }
}
export const getSelectedWarehouseId=(state:WarehouseState)=>state.selectedId;
export const getWarehouseIds=(state:WarehouseState)=>state.ids;
export const getWarehouseEntities=(state:WarehouseState)=>state.entitites;
export const getWarehousePendingStatus=(state:WarehouseState)=>state.pending;
