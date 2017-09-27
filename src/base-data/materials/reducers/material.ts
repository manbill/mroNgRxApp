import { Material } from './../../../modals/material/material.modal';
import * as MaterialActions from "../actions/material.actions";
export interface State {
  selectedId: number;
  ids: number[];
  entities: {
    [id: number]: Material;
  }
  pending: boolean;
}
export const initState: State = {
  ids: [],
  selectedId: null,
  entities: {},
  pending: false
}
export function reducer(state: State = initState, action: MaterialActions.All): State {
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
