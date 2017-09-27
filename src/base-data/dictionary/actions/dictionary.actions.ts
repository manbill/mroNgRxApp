import { Action } from '@ngrx/store';
import { Dictionary } from '../../../modals/dictionary/dictionary.modal';
import { MroError } from '../../../app/mro-error-handler';
export const FETCH_DICTIONARY_DATA = '[Dictionary] fetch_dictionary_data';
export const FETCH_DICTIONARY_DATA_FAILED = '[Dictionary] fetch_dictionary_data_failed';
export const FETCH_DICTIONARY_DATA_SUCCESS = '[Dictionary] fetch_dictionary_data_success';
export class FetchDictionaryData implements Action {
  readonly type = FETCH_DICTIONARY_DATA;
  constructor(public payload?: any) { };
}
export class FetchDictionaryDataFailed implements Action {
  readonly type = FETCH_DICTIONARY_DATA_FAILED;
  constructor(public payload: MroError) { };
}
export class FetchDictionaryDataSuccess implements Action {
  readonly type = FETCH_DICTIONARY_DATA_SUCCESS;
  constructor(public payload: Dictionary[]) { };
}
export type All =
  FetchDictionaryData
  | FetchDictionaryDataFailed
  | FetchDictionaryDataSuccess
