import { handleActions } from 'redux-actions';
import { DefaultState } from '../helpers/typings';
import * as CONST from './constants';

export const defaultState: DefaultState = {
  isLoadingConnecters: false,
  isLoadingList: false,
  isLoadingUpdate: false,
  list: [],
  total: 0,
  companyIdConnecters: 0,
  connecters: [],
  connectersError: null,
  error: null,
  roamingDocumentsReport: {}
};

export const reducer = handleActions(
  {
    [CONST.COMPANY_ID_CONNECTER]: (state, { payload: { companyIdConnecters } }) => ({
      ...state,
      companyIdConnecters
    }),

    [CONST.CONNECTERS_REQUEST]: state => ({ ...state, isLoadingConnecters: true }),
    [CONST.CONNECTERS_FAILURE]: state => ({ ...state, isLoadingConnecters: false }),
    [CONST.CONNECTERS_SUCCESS]: (state, { payload: { connecters } }) => ({
      ...state,
      isLoadingConnecters: false,
      connecters
    }),

    [CONST.UPDATE_CONNECTERS_REQUEST]: state => ({ ...state, isLoadingUpdate: true }),
    [CONST.UPDATE_CONNECTERS_SUCCESS]: state => ({ ...state, isLoadingUpdate: false }),
    [CONST.UPDATE_CONNECTERS_FAILURE]: state => ({ ...state, isLoadingUpdate: false }),

    [CONST.LEGALS_REQUEST]: state => ({ ...state, isLoadingList: true }),
    [CONST.LEGALS_FAILURE]: state => ({ ...state, isLoadingList: false }),
    [CONST.LEGALS_SUCCESS]: (state, { payload: { list, total } }) => ({
      ...state,
      isLoadingList: false,
      total,
      list
    }),

    [CONST.SET_ROAMING_DOCUMENTS_REPORT]: (state, { payload: { roamingDocumentsReport } }) => ({
      ...state,
      roamingDocumentsReport
    }),

    /** установить информацию о лицензии */
    [CONST.SET_LICENSE_INFO]: (state, { payload: { license } }) => {
      return {
        ...state,
        license
      };
    },

    /** установить информацию о юр-лицах */
    [CONST.SET_COMPANIES]: (state, { payload: { companies } }) => {
      return {
        ...state,
        companies
      };
    },

    /** установить информацию о текущем юр-лице */
    [CONST.SET_COMPANY_INFO]: (state, { payload: { currentCompany } }) => {
      return {
        ...state,
        currentCompany
      };
    },

    /** установить сотрудников для карточки компании */
    [CONST.SET_COMPANY_EMPLOYEE]: (state, { payload: { employee } }) => {
      return {
        ...state,
        employee
      };
    },

    /** установить сертификат выбранного сотрудника */
    [CONST.SET_CERTIFICATES]: (state, { payload: { certificates } }) => {
      return {
        ...state,
        certificates
      };
    },

    /** установить информацию о физ-лицах */
    [CONST.SET_PERSONS]: (state, { payload: { persons } }) => {
      return {
        ...state,
        persons
      };
    },

    /** установить тарифы */
    [CONST.SET_TARIFFS]: (state, { payload: { tariffs } }) => {
      return {
        ...state,
        tariffs
      };
    }
  },
  defaultState
);
