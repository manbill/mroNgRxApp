import { Action } from '@ngrx/store';
import { MroError } from './../../../app/mro-error-handler';
import { Company } from './../../../modals/company/company.modal';
export const FETCH_USER_COMPANIES = '[Company] fetch_user_companies';
export const SELECT_COMPANIE = '[Company] select_companie';
export const FETCH_USER_COMPANIES_SUCCESS = '[Company] fetch_user_companies_Success';
export const FETCH_USER_COMPANIES_FAILED = '[Company] fetch_user_companies_failed';
export class FetchCompanies implements Action {
  readonly type = FETCH_USER_COMPANIES;
  constructor(public payload?: any) { }
}
export class FetchCompaniesFailed implements Action {
  readonly type = FETCH_USER_COMPANIES_FAILED;
  constructor(public payload: MroError) { }
}
export class FetchCompaniesSuccess implements Action {
  readonly type = FETCH_USER_COMPANIES_SUCCESS;
  constructor(public payload: Company[]) { }
}
export class SelectCompany implements Action {
  readonly type = SELECT_COMPANIE;
  constructor(public payload: Company) { }
}
export type All =
  FetchCompanies
  | FetchCompaniesFailed
  | FetchCompaniesSuccess
  | SelectCompany
