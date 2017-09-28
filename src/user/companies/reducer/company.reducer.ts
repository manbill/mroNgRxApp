import { Company } from '../../../modals/company/company.modal';
import * as CompanyActions from "../actions/company.actions";
import { createSelector } from '@ngrx/store';
import { SelectCompany } from '../actions/company.actions';
export interface CompanyState {
  selectedCompanyId: number;
  ids: number[];
  entities: {
    [id: number]: Company;
  }
  pending: boolean;
}
export const initState: CompanyState = {
  selectedCompanyId: null,
  ids: [],
  entities: {},
  pending: false
}
export function reducer(state: CompanyState = initState, action: CompanyActions.All): CompanyState {
  switch (action.type) {
    default:
      return state;
    case CompanyActions.FETCH_USER_COMPANIES_SUCCESS: {
      const companies = (<CompanyActions.FetchCompaniesSuccess>action).payload;
      return {
        ...state,
        pending: false,
        ids: companies.map(c => c.companyId),
        entities: companies.reduce((e, c) => { e[c.companyId] = c; return e; }, {}),
      }
    }
    case CompanyActions.SELECT_COMPANIE: {
      const company = (<CompanyActions.SelectCompany>action).payload;
      return {
        ...state,
        pending: false,
        selectedCompanyId: company.companyId
      }
    }
    case CompanyActions.FETCH_USER_COMPANIES_FAILED: {
      return {
        ...state,
        pending: false
      }
    }
    case CompanyActions.FETCH_USER_COMPANIES: {
      return {
        ...state,
        pending: true
      }
    }
  }
}
export const getSelectedCompanyId = (state: CompanyState) => state.selectedCompanyId;
export const getCompanyIds = (state: CompanyState) => state.ids;
export const getCompanyEntitites = (state: CompanyState) => state.entities;
export const getCompanies = createSelector(getCompanyIds, getCompanyEntitites, (ids, entities) => ids.map(id => entities[id]));
export const getCompanyPendingStatus = (state: CompanyState) => state.pending;
