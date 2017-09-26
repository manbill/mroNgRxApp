import { Project } from './../../../modals/project/project.modal';
import * as ProjectActions from "../actions/project.actions";
export interface ProjectState {
  selectedProjectId: number;
  ids: number[];
  entities: {
    [id: number]: Project;
  };
  pending: boolean;
}
export const inintState: ProjectState = {
  selectedProjectId: null,
  ids: [],
  entities: {},
  pending: false
}
export function reducer(state: ProjectState = inintState, action: ProjectActions.All): ProjectState {
  switch (action.type) {
    default:
      return state;
    case ProjectActions.FETCH_USER_PROJECTS: {
      return {
        ...state,
        pending: true
      }
    }
    case ProjectActions.FETCH_USER_PROJECTS_FAILED: {
      return {
        ...state,
        pending: false
      }
    }
    case ProjectActions.FETCH_USER_PROJECTS_SUCCESS: {
      const projects = (<ProjectActions.FetchProjectsSuccess>action).payload;
      return {
        ...state,
        pending: false,
        ids: projects.map(p => p.projectId),
        entities: projects.reduce((e, p) => { e[p.projectId] = p; return e; }, {})
      }
    }
  }
}
