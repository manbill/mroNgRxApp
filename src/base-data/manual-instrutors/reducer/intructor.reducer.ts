import { ManualInstructor } from '../../../modals/instructor/instructor.modal';
import * as InstructorActions from "../actions/instructor.actions";
export interface InstructorState {
  ids: number[];
  entitites: {
    [id: number]: ManualInstructor;
  };
  pending: boolean;
  selectedId: number;
}
export function reducer(state: InstructorState, action: InstructorActions.All): InstructorState {
  switch (action.type) {
    default:
      return state;
    case InstructorActions.FETCH_INSTRUCTOR_DATA: {
      return {
        ...state,
        pending: true
      }
    }
    case InstructorActions.FETCH_INSTRUCTOR_DATA_FAILED: {
      return {
        ...state,
        pending: false
      }
    }
    case InstructorActions.FETCH_INSTRUCTOR_DATA_SUCCESS: {
      const instructors = (<InstructorActions.FetchInstructorDataSuccess>action).payload;
      return {
        ...state,
        ids: instructors.map(i => i.manualInfoDTO.manualId),
        entitites: instructors.reduce((e, instructor) => { e[instructor.manualInfoDTO.manualId] = instructor; return e; }, {})
      }
    }
  }
}
export const getInstructorIds=(state:InstructorState)=>state.ids;
export const getInstructorEntitites=(state:InstructorState)=>state.entitites;
export const getInstructorPendingStatus=(state:InstructorState)=>state.pending;
export const getSelectedInstructorId=(state:InstructorState)=>state.selectedId;
