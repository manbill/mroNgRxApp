import { Dictionary } from '../../../modals/dictionary/dictionary.modal';
import * as DictionaryActions from "../actions/dictionary.actions";
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
export function reducer(state: DictionaryState = initState, action: DictionaryActions.All): DictionaryState {
  switch (action.type) {
    default:
      return state;
    case DictionaryActions.FETCH_DICTIONARY_DATA: {
      return {
        ...state,
        pending: true
      }
    }
    case DictionaryActions.FETCH_DICTIONARY_DATA_FAILED: {
      return {
        ...state,
        pending: false
      }
    }
    case DictionaryActions.FETCH_DICTIONARY_DATA_SUCCESS: {
      const dicts = (<DictionaryActions.FetchDictionaryDataSuccess>action).payload;
      return {
        ...state,
        pending: false,
        ids: dicts.map(dict => dict.detailId),
        entitites: dicts.reduce((e, dict) => { e[dict.detailId] = dict; return e; }, {})
      }
    }
  }
}
export const getDictionaryIds = (state: DictionaryState) => state.ids;
export const getDictionaryentitites = (state: DictionaryState) => state.entitites;
export const getDictionaryPendingStatus = (state: DictionaryState) => state.pending;
