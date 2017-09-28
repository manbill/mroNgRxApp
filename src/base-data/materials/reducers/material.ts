import { Material } from './../../../modals/material/material.modal';
import * as MaterialActions from "../actions/material.actions";
export interface MaterialState {
  selectedId: number;
  ids: number[];
  entities: {
    [id: number]: Material;
  }
  pending: boolean;
}
export const initState: MaterialState = {
  ids: [],
  selectedId: null,
  entities: {},
  pending: false
}
export function reducer(state: MaterialState = initState, action: MaterialActions.All): MaterialState {
  switch (action.type) {
    default:
      return state;
    case MaterialActions.FETCH_MATERIALS_DATA: {
      return {
        ...state,
        pending: true
      }
    }
    case MaterialActions.FETCH_MATERIALS_DATA_SUCCESS: {
      const materials = (<MaterialActions.FetchMaterialsDataSuccess>action).payload;
      return {
        ...state,
        pending: false,
        ids: materials.map(m => m.materialId),
        entities: materials.reduce((e, m) => { e[m.materialId] = m; return e; }, {})
      }
    }
    case MaterialActions.FETCH_MATERIALS_DATA_FAILED: {
      return {
        ...state,
        pending: false
      }
    }
  }
}
export const getSelectedMaterialId = (state: MaterialState) => state.selectedId;
export const getMaterialIds = (state: MaterialState) => state.ids;
export const getMaterialEntities = (state: MaterialState) => state.entities;
export const getMaterialPendingStatus = (state: MaterialState) => state.pending;
