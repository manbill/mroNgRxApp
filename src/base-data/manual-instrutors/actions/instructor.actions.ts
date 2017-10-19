import { Action } from '@ngrx/store';
import { MroError } from '../../../app/mro-error-handler';
import { ManualInstructor } from '../../../modals/instructor/instructor.modal';
export const FETCH_INSTRUCTOR_DATA = '[Instructor] fetch_instructor_data';
export const FETCH_INSTRUCTOR_DATA_FAILED = '[Instructor] fetch_instructor_data_failed';
export const FETCH_INSTRUCTOR_DATA_SUCCESS = '[Instructor] fetch_instructor_data_success';
export const INIT_INSTRUCTOR_STATE = '[Instructor] init_instructor_state';
export class FetchInstructorData implements Action {
  readonly type = FETCH_INSTRUCTOR_DATA;
  constructor(public payload: any) { }
}
export class InitInstructorState implements Action {
  readonly type = INIT_INSTRUCTOR_STATE;
  constructor(public payload: any) { }
}
export class FetchInstructorDataFailed implements Action {
  readonly type = FETCH_INSTRUCTOR_DATA_FAILED;
  constructor(public payload: MroError) { }
}
export class FetchInstructorDataSuccess implements Action {
  readonly type = FETCH_INSTRUCTOR_DATA_SUCCESS;
  constructor(public payload: ManualInstructor[]) { }
}
export type All =
  FetchInstructorData
  | FetchInstructorDataFailed
  | FetchInstructorDataSuccess
