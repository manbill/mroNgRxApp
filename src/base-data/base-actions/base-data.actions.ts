import * as DictActions from '../dictionary/actions/dictionary.actions';
import * as fromDictionary from '../dictionary/reducer/dictionary.reducer';
import * as IntructorActions from "../manual-instrutors/actions/instructor.actions";
import * as MaterialActions from "../materials/actions/material.actions";
import * as fromMaterial from "../materials/reducers/material.reducer";
import * as WarehouseActions from "../warehouse/actions/warehouse.actions";
import * as fromWarehouse from "../warehouse/reducer/warehouse.reducer";
import * as ManualActions from "../manual-instrutors/actions/instructor.actions";
import * as fromInstructor from "../manual-instrutors/reducer/intructor.reducer";
import { IFetchDataAction, Type2InitialAction } from '../../shared/common';
import { BaseDataState } from '../base-reducer/base.reducer';
export const BaseDataFetchActions: IFetchDataAction[] = [
  {
    syncAction: DictActions.FETCH_DICTIONARY_DATA
  },
  {
    syncAction: IntructorActions.FETCH_INSTRUCTOR_DATA
  },
  {
    syncAction: MaterialActions.FETCH_MATERIALS_DATA
  },
  {
    syncAction: WarehouseActions.FETCH_WAREHOUSE_DATA
  }
]
export const BaseStateTypesInitInfos: Type2InitialAction<BaseDataState> = {
  manualInstructor: {
    type: "manualInstructor",
    initAction: {
      actionName: ManualActions.INIT_INSTRUCTOR_STATE,
      payload: fromInstructor.initState
    }
  },
  dictionary: {
    type: "dictionary",
    initAction: {
      actionName: DictActions.INIT_DICTIONARY_STATE,
      payload: fromDictionary.initState
    }
  },

  material: {
    type: "material",
    initAction: {
      actionName: MaterialActions.INIT_MATERIAL_STATE,
      payload: fromMaterial.initState
    }
  },

  warehouse: {
    type: "warehouse",
    initAction: {
      actionName: WarehouseActions.INIT_WAREHOUSE_STATE,
      payload: fromWarehouse.initState
    }
  }

}
