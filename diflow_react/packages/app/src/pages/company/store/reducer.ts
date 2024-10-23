import { handleActions } from 'redux-actions';
import {
  SET_DETAIL_ERRORS,
  CLEAR_ERRORS,
  SET_ADDRESS_ERRORS,
  SET_CONNECTOR_ERRORS,
  SET_CONNECTOR,
  SET_CONNECTORS,
  SET_STAFF,
  SET_STAFF_WAITING,
  SET_STAFF_DEACTIVATED,
  SET_EMPLOYEE,
  SET_EMPLOYEE_ROLES,
  SET_EMPLOYEE_NO_ROLES,
  SET_EMPLOYEE_CERTIFICATE,
  SET_EMPLOYEE_DIVISIONS,
  SET_EMPLOYEE_CONTRACTOR_GROUPS,
  SET_EMPLOYEE_NO_CONTRACTOR_GROUPS,
  SET_STAFF_ROLES,
  SET_STAFF_FOR_ROLE,
  SET_NO_STAFF_FOR_ROLE,
  SET_DOCUMENT_FLOW_ROLES,
  SET_COMPANY_DIVISIONS,
  SET_CREATE_DIVISION_ERROR,
  SET_DIVISION_EMPLOYEE,
  SET_NO_DIVISION_EMPLOYEE,
  SET_STAFF_FILTER,
  SET_CONNECTOR_STATUS,
  SET_COMPANY_DETAILS
} from './constants';

export const defaultState = {
  errors: {},
  connector: {}
};

export const reducer = handleActions(
  {
    /** установка информации о компании */
    [SET_COMPANY_DETAILS]: (state, { payload }) => {
      return {
        ...state,
        details: payload
      };
    },

    /** установка ошибок раздела Реквизиты компании*/
    [SET_DETAIL_ERRORS]: (state, { payload }) => {
      return {
        ...state,
        errors: {
          ...state.errors,
          details: { ...payload }
        }
      };
    },

    /** удаление ошибок */
    [CLEAR_ERRORS]: state => {
      return {
        ...state,
        errors: {}
      };
    },

    /** установка ошибок раздела Юридический адрес */
    [SET_ADDRESS_ERRORS]: (state, { payload }) => {
      return {
        ...state,
        errors: {
          ...state.errors,
          address: { ...payload }
        }
      };
    },

    /** установка ошибок раздела Коннекторы */
    [SET_CONNECTOR_ERRORS]: (state, { payload }) => {
      return {
        ...state,
        errors: {
          ...state.errors,
          connector: { ...payload }
        }
      };
    },

    /** установка списка коннекторов */
    [SET_CONNECTORS]: (state, { payload }) => {
      return {
        ...state,
        connectors: payload
      };
    },

    /** установка описания коннектора */
    [SET_CONNECTOR]: (state, { payload }) => {
      return {
        ...state,
        connector: payload
      };
    },

    /** установка статус коннектора */
    [SET_CONNECTOR_STATUS]: (state, { payload }) => {
      return {
        ...state,
        connector: {
          ...state.connector,
          status: payload
        }
      };
    },

    /** установить список сотрудников */
    [SET_STAFF]: (state, { payload }) => {
      return {
        ...state,
        staff: payload
      };
    },

    /** установить список сотрудников в заявках на активацию */
    [SET_STAFF_WAITING]: (state, { payload }) => {
      return {
        ...state,
        staffWaiting: payload
      };
    },

    /** установить список отключенных сотрудников */
    [SET_STAFF_DEACTIVATED]: (state, { payload }) => {
      return {
        ...state,
        staffDeactivated: payload
      };
    },

    /** установить информацию о сотруднике */
    [SET_EMPLOYEE]: (state, { payload }) => {
      return {
        ...state,
        employee: payload
      };
    },

    /** установить текущие роли сотрудника */
    [SET_EMPLOYEE_ROLES]: (state, { payload }) => {
      return {
        ...state,
        employeeRoles: payload
      };
    },

    /** установить роли, которые можно добавить сотруднику */
    [SET_EMPLOYEE_NO_ROLES]: (state, { payload }) => {
      return {
        ...state,
        employeeNoRoles: payload
      };
    },

    /** установка сертификатов сотрудника */
    [SET_EMPLOYEE_CERTIFICATE]: (state, { payload }) => {
      return {
        ...state,
        employeeCertificate: payload
      };
    },

    /** установка подразделения */
    [SET_EMPLOYEE_DIVISIONS]: (state, { payload }) => {
      return {
        ...state,
        employeeDivisions: payload
      };
    },

    /** установка групп контрагентов сотрудника */
    [SET_EMPLOYEE_CONTRACTOR_GROUPS]: (state, { payload }) => {
      return {
        ...state,
        employeeContractorGroups: payload
      };
    },

    /** установка групп контрагентов сотрудника возможных для добавления */
    [SET_EMPLOYEE_NO_CONTRACTOR_GROUPS]: (state, { payload }) => {
      return {
        ...state,
        employeeNoContractorGroups: payload
      };
    },

    /** установить роли сотрудников */
    [SET_STAFF_ROLES]: (state, { payload }) => {
      return {
        ...state,
        staffRoles: payload
      };
    },

    /** установить сотрудников роли */
    [SET_STAFF_FOR_ROLE]: (state, { payload }) => {
      return {
        ...state,
        staffForRole: payload
      };
    },

    /** установить сотрудников котороых можно добавить в роли */
    [SET_NO_STAFF_FOR_ROLE]: (state, { payload }) => {
      return {
        ...state,
        noStaffForRole: payload
      };
    },

    /** установить правила документооборота для сотрудника */
    [SET_DOCUMENT_FLOW_ROLES]: (state, { payload }) => {
      return {
        ...state,
        documentFlowRoles: payload
      };
    },

    /** установить подразделения компании */
    [SET_COMPANY_DIVISIONS]: (state, { payload }) => {
      return {
        ...state,
        divisions: payload
      };
    },

    /** установить ошибки при создания нового подразделения */
    [SET_CREATE_DIVISION_ERROR]: (state, { payload }) => {
      return {
        ...state,
        createDivisionError: payload
      };
    },

    /** установить список сотрудников подразделения */
    [SET_DIVISION_EMPLOYEE]: (state, { payload }) => {
      return {
        ...state,
        divisionEmployee: payload
      };
    },

    /** установить список сотрудников не в подразделении */
    [SET_NO_DIVISION_EMPLOYEE]: (state, { payload }) => {
      return {
        ...state,
        noDivisionEmployee: payload
      };
    },

    /** установить значения фильтра сотрудников */
    [SET_STAFF_FILTER]: (state, { payload }) => {
      return {
        ...state,
        staffFilter: payload
      };
    }
  },
  defaultState
);
