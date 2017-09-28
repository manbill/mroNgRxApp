import * as fromDictionary from "../dictionary/reducer/dictionary.reducer";
import * as fromInstructor from "../manual-instrutors/reducer/intructor.reducer";
import * as fromMaterial from "../materials/reducers/material.reducer";
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromWarehouse from "../warehouse/reducer/warehouse.reducer";
export interface BaseDataState {
  manualInstructor: fromInstructor.InstructorState;
  dictionary: fromDictionary.DictionaryState;
  material: fromMaterial.MaterialState;
  warehouse: fromWarehouse.WarehouseState;
}
export const reducers: ActionReducerMap<BaseDataState> = {
  dictionary: fromDictionary.reducer,
  manualInstructor: fromInstructor.reducer,
  material: fromMaterial.reducer,
  warehouse: fromWarehouse.reducer
}
export const getBaseDataFeatureState = createFeatureSelector<BaseDataState>('baseData');
//---------------------------------------dictionary-------------------------------------------
export const getDirctionaryFeatureState = createFeatureSelector<fromDictionary.DictionaryState>('dictionary');
export const getDictionaryState = createSelector(getBaseDataFeatureState, getDirctionaryFeatureState);
export const getDictionaryPendingStatus = createSelector(getDictionaryState, fromDictionary.getDictionaryPendingStatus);
export const getDictionaryentitites = createSelector(getDictionaryState, fromDictionary.getDictionaryentitites);
export const getDictionaryIds = createSelector(getDictionaryState, fromDictionary.getDictionaryIds);
export const getDictionaries = createSelector(getDictionaryIds, getDictionaryentitites, (ids, entities) => ids.map(id => entities[id]));
//---------------------------------------dictionary-----------------------------------------------

//======================================manual intructor============================================
export const getInstructorFeatureState = createFeatureSelector<fromInstructor.InstructorState>('manualInstructor');
export const getInstructorState = createSelector(getBaseDataFeatureState, getInstructorFeatureState);
export const getInstructorIds = createSelector(getInstructorState, fromInstructor.getInstructorIds);
export const getInstructorEntitites = createSelector(getInstructorState, fromInstructor.getInstructorEntitites);
export const getInstructorPendingStatus = createSelector(getInstructorState, fromInstructor.getInstructorPendingStatus);
export const getSelectedInstructorId = createSelector(getInstructorState, fromInstructor.getSelectedInstructorId);
export const getSelectedInstructor = createSelector(getSelectedInstructorId, getInstructorEntitites, (id, entities) => entities[id]);
export const getInstructors = createSelector(getInstructorIds, getInstructorEntitites, (ids, entitites) => ids.map(id => entitites[id]));
//======================================manual intructor============================================

//-----------------------------------------material-------------------------------------------------
export const getMaterialFeatureState = createFeatureSelector<fromMaterial.MaterialState>('material');
export const getMaterialState = createSelector(getBaseDataFeatureState, getMaterialFeatureState);
export const getSelectedMaterialId = createSelector(getMaterialState, fromMaterial.getSelectedMaterialId);
export const getMaterialIds = createSelector(getMaterialState, fromMaterial.getMaterialIds);
export const getMaterialEntities = createSelector(getMaterialState, fromMaterial.getMaterialEntities);
export const getMaterialPendingStatus = createSelector(getMaterialState, fromMaterial.getMaterialPendingStatus);
export const getSelectedMaterial = createSelector(getSelectedMaterialId, fromMaterial.getMaterialEntities, (id, entities) => entities[id]);
export const getMaterials = createSelector(getMaterialIds, getMaterialEntities, (ids, entitites) => ids.map(id => entitites[id]));
//-----------------------------------------material-------------------------------------------------

//=========================================warehouse===============================================
export const getWarehouseFeatureState = createFeatureSelector<fromWarehouse.WarehouseState>('warehouse');
export const getWarehouseState = createSelector(getBaseDataFeatureState, getWarehouseFeatureState);
export const getWarehouseIds = createSelector(getWarehouseState, fromWarehouse.getWarehouseIds);
export const getWarehouseEntities = createSelector(getWarehouseState, fromWarehouse.getWarehouseEntities);
export const getWarehousePendingStatus = createSelector(getWarehouseState, fromWarehouse.getWarehousePendingStatus);
export const getSelectedWarehouseId = createSelector(getWarehouseState, fromWarehouse.getSelectedWarehouseId);
export const getSelectedWarehouse = createSelector(getWarehouseEntities, fromWarehouse.getSelectedWarehouseId, (entities, id) => entities[id]);
export const getWarehouses = createSelector(getWarehouseIds, getWarehouseEntities, (ids, entities) => ids.map(id => entities[id]));
//=========================================warehouse===============================================
