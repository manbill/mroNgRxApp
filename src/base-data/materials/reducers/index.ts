import { ActionReducerMap } from '@ngrx/store';
import * as fromMaterials from "./material";
import * as fromBase from "../../base-reducer/base.reducer";
export interface State extends fromBase.BaseDataState {
  material: MaterialState
}
export interface MaterialState {
  materials: fromMaterials.State
}
export const reducers: ActionReducerMap<MaterialState> = {
  materials: fromMaterials.reducer
}
