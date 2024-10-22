import { createAction } from 'redux-actions';

import * as CONST from './constants';

export const actionInit = createAction(CONST.INIT);

export const companyIdConnecters = createAction(CONST.COMPANY_ID_CONNECTER);

export const legalsRequest = createAction(CONST.LEGALS_REQUEST);
export const legalsSuccess = createAction(CONST.LEGALS_SUCCESS);
export const legalsFailure = createAction<any>(CONST.LEGALS_FAILURE);

export const connectersRequest = createAction(CONST.CONNECTERS_REQUEST);
export const connectersSuccess = createAction(CONST.CONNECTERS_SUCCESS);
export const connectersFailure = createAction<any>(CONST.CONNECTERS_FAILURE);

export const updateConnectersRequest = createAction(CONST.UPDATE_CONNECTERS_REQUEST);
export const updateConnectersSuccess = createAction(CONST.UPDATE_CONNECTERS_SUCCESS);
export const updateConnectersFailure = createAction<any>(CONST.UPDATE_CONNECTERS_FAILURE);

/** получение отчета по роуминговым документам */
export const getRoamingDocumentsReport = createAction(CONST.GET_ROAMING_DOCUMENTS_REPORT);
/** установка отчета по роуминговым документам */
export const setRoamingDocumentsReport = createAction(CONST.SET_ROAMING_DOCUMENTS_REPORT);

/** получение информации о лицензии */
export const getLicenseInfo = createAction(CONST.GET_LICENSE_INFO);
/** установка информации о лицензии */
export const setLicenseInfo = createAction(CONST.SET_LICENSE_INFO);

/** получить список юр-лиц */
export const getCompanies = createAction(CONST.GET_COMPANIES);
/** установить список юр-лиц */
export const setCompanies = createAction(CONST.SET_COMPANIES);

/** получить информацию о компании */
export const getCompanyInfo = createAction(CONST.GET_COMPANY_INFO);
/** установить информацию о компании */
export const setCompanyInfo = createAction(CONST.SET_COMPANY_INFO);

/** получить инрформацию о сотрудниках */
export const getCompanyEmployee = createAction(CONST.GET_COMPANY_EMPLOYEE);
/** установить информацию о сотрудниках */
export const setCompanyEmployee = createAction(CONST.SET_COMPANY_EMPLOYEE);

/** получить сертификаты сотрудника */
export const getCertificates = createAction(CONST.GET_CERTIFICATES);
/** установить сертификаты сотрудника */
export const setCertificates = createAction(CONST.SET_CERTIFICATES);

/** получить список физ-лиц */
export const getPersons = createAction(CONST.GET_PERSONS);
/** установить список физ-лиц */
export const setPersons = createAction(CONST.SET_PERSONS);

/** получить информацию о физ лице */
export const getPersonInfo = createAction(CONST.GET_PERSON_INFO);
/** установить информацию о физ лице */
export const setPersonInfo = createAction(CONST.SET_PERSON_INFO);

/** получить тарифы */
export const getTariffs = createAction(CONST.GET_TARIFFS);
/** установить тарифы */
export const setTariffs = createAction(CONST.SET_TARIFFS);

/** активация компании */
export const companyActivation = createAction(CONST.COMPANY_ACTIVATION);
/** удаление компании */
export const companyDelete = createAction(CONST.COMPANY_DELETE);
