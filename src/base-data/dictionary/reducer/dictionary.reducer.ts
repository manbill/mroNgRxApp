import { Dictionary } from '../../../modals/dictionary/dictionary.modal';
export interface DictionaryState {
  ids: number[];
  entitites: {
    [id: number]: Dictionary;
  }
  pending: boolean;
}
export const initState: DictionaryState = {
  ids: [],
  entitites: {},
  pending: false
}
export function reducer(state: DictionaryState = initState, action: any): DictionaryState {
  switch (action.type) {
    default:
      return state;
  }
}
export const getDictionaryIds = (state: DictionaryState) => state.ids;
export const getDictionaryentitites = (state: DictionaryState) => state.entitites;
export const getDictionaryPendingStatus = (state: DictionaryState) => state.pending;
