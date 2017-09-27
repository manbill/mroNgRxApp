import { ActionReducerMap } from '@ngrx/store';
import * as fromMaterials from "./material";
export interface MaterialState {
  materials: fromMaterials.State
}
export const reducers: ActionReducerMap<MaterialState> = {
  materials: fromMaterials.reducer
}
