import { handleActions } from 'redux-actions';

import {
  SET_EMPLOYEE_INFO,
  SET_EMPLOYEE_ERROR,
  SET_NOTIFICATION_SETTING,
  SET_CERTIFICATES
} from './constants';
import { DefaultState } from '../helpers/cabinet.typings';

export const defaultState: DefaultState = {};

export const reducer = handleActions(
  {
    /** установка информациии о пользователе */
    [SET_EMPLOYEE_INFO]: (state, { payload }) => {
      return {
        ...state,
        employee: payload.employee
      };
    },

    /** установить ошибки */
    [SET_EMPLOYEE_ERROR]: (state, { payload }) => {
      return {
        ...state,
        errors: payload.errors
      };
    },

    /** установить настройки уведомления */
    [SET_NOTIFICATION_SETTING]: (state, { payload }) => {
      return {
        ...state,
        notificationSetting: payload.notificationSetting
      };
    },

    /** установить сертификат */
    [SET_CERTIFICATES]: (state, { payload }) => {
      return {
        ...state,
        certificates: payload.certificates
      };
    }
  },
  defaultState
);
