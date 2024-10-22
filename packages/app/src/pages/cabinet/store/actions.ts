import { createAction } from 'redux-actions';
import {
  GET_EMPLOYEE_INFO,
  SET_EMPLOYEE_INFO,
  CHANGE_EMPLOYEE_INFO,
  SET_EMPLOYEE_ERROR,
  GET_NOTIFICATION_SETTING,
  SET_NOTIFICATION_SETTING,
  CHANGE_NOTIFICATION_SETTING,
  GET_CERTIFICATES,
  SET_CERTIFICATES,
  CHANGE_USE_CERTIFICATE
} from './constants';

/** Получить данные сотрудника */
export const getEmployeeInfo = createAction(GET_EMPLOYEE_INFO);
/** Установить данные сотрудника */
export const setEmployeeInfo = createAction(SET_EMPLOYEE_INFO);
/** Изменить данные сотрудника */
export const changeEmployeeInfo = createAction(CHANGE_EMPLOYEE_INFO);
/** Установить ошибку */
export const setEmployeeError = createAction(SET_EMPLOYEE_ERROR);

/** Получить настройки уведомления */
export const getNotificationSetting = createAction(GET_NOTIFICATION_SETTING);
/** Установить настройки уведомления */
export const setNotificationSetting = createAction(SET_NOTIFICATION_SETTING);
/** Изменить настройки уведомления */
export const changeNotificationSetting = createAction(CHANGE_NOTIFICATION_SETTING);

/** Получить сертификаты */
export const getCertificates = createAction(GET_CERTIFICATES);
/** Установить сертификаты */
export const setCertificates = createAction(SET_CERTIFICATES);

/** сменить используемый сертификат */
export const changeUseCertificate = createAction(CHANGE_USE_CERTIFICATE);
