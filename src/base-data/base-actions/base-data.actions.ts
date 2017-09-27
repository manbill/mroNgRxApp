import * as DictActions from '../dictionary/actions/dictionary.actions';
import * as IntructorActions from "../manual-instrutors/actions/instructor.actions";
import { IFetchDataAction } from '../../shared/common';
export const BaseDataFetchActions: IFetchDataAction[] = [
  {
    syncAction: DictActions.FETCH_DICTIONARY_DATA
  },
  {
    syncAction: IntructorActions.FETCH_INSTRUCTOR_DATA
  }
]
