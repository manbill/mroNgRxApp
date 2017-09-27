import { Dictionary } from '../../../modals/dictionary/dictionary.modal';
export interface DictionaryState {
  ids: number[];
  entitites: {
    [id: number]: Dictionary;
  }
  pending: boolean;
}
export function reducer(state: DictionaryState, action: any): DictionaryState {
  switch (action.type) {
    default:
      return state;
  }
}
export const getDictionaryIds=(state:DictionaryState)=>state.ids;
export const getDictionaryentitites=(state:DictionaryState)=>state.entitites;
export const getDictionaryPendingStatus=(state:DictionaryState)=>state.pending;
