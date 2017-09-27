import * as fromDictionary from "../dictionary/reducer/dictionary.reducer";
import * as fromInstructor from "../manual-instrutors/reducer/intructor.reducer";
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
export interface BaseDataState {
  manualInstructor: fromInstructor.InstructorState;
  dictionary: fromDictionary.DictionaryState;
}
export const reducers: ActionReducerMap<BaseDataState> = {
  dictionary: fromDictionary.reducer,
  manualInstructor: fromInstructor.reducer
}
export const getBaseDataFeatureState = createFeatureSelector<BaseDataState>('baseData');
//---------------------------------------dictionary-------------------------------------------
export const getDirctionaryFeatureState = createFeatureSelector<fromDictionary.DictionaryState>('dictionary');
export const getDictionaryState = createSelector(getBaseDataFeatureState, getDirctionaryFeatureState);
export const getDictionaryPendingStatus = createSelector(getDictionaryState, fromDictionary.getDictionaryPendingStatus);
export const getDictionaryentitites = createSelector(getDictionaryState, fromDictionary.getDictionaryentitites);
export const getDictionaryIds = createSelector(getDictionaryState, fromDictionary.getDictionaryIds);
//---------------------------------------dictionary-----------------------------------------------

//======================================manual intructor============================================
export const getInstructorFeatureState = createFeatureSelector<fromInstructor.InstructorState>('manualInstructor');
export const getInstructorState = createSelector(getBaseDataFeatureState, getInstructorFeatureState);
export const getInstructorIds = createSelector(getInstructorState, fromInstructor.getInstructorIds);
export const getInstructorEntitites = createSelector(getInstructorState, fromInstructor.getInstructorEntitites);
export const getInstructorPendingStatus = createSelector(getInstructorState, fromInstructor.getInstructorPendingStatus);
export const getSelectedInstructorId = createSelector(getInstructorState, fromInstructor.getSelectedInstructorId);
//======================================manual intructor============================================
