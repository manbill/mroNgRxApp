import { Project } from './../../../modals/project/project.modal';
import { MroError } from './../../../app/mro-error-handler';
import { Action } from '@ngrx/store';
export const FETCH_USER_PROJECTS = '[Project] fetch_user_projects';
export const SELECT_PROJECT = '[Project] select_project';
export const FETCH_USER_PROJECTS_SUCCESS = '[Project] fetch_user_projects_success';
export const FETCH_USER_PROJECTS_FAILED = '[Project] fetch_user_projects_failed';
export class FetchProjects implements Action {
  readonly type = FETCH_USER_PROJECTS;
  constructor(public payload?: any) { };
}
export class FetchProjectsSuccess implements Action {
  readonly type = FETCH_USER_PROJECTS_SUCCESS;
  constructor(public payload: Project[]) { };
}
export class SelectProject implements Action {
  readonly type = SELECT_PROJECT;
  constructor(public payload: Project) { };
}
export class FetchProjectsFailed implements Action {
  readonly type = FETCH_USER_PROJECTS_FAILED;
  constructor(public payload: MroError) { };
}
export type All =
  FetchProjects
  | FetchProjectsFailed
  | FetchProjectsSuccess
  | SelectProject
