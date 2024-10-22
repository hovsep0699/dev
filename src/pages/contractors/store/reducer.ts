import { handleActions } from 'redux-actions';

import {
  SET_FOUND_PERSON_CONTRACTORS,
  SET_FOUND_COMPANY_CONTRACTORS,
  SET_FOUND_ERRORS,
  SET_INVITE_YOU_CONTRACTORS,
  SET_LEGAL_ENTITY_CONTRACTORS,
  SET_NATURAL_ENTITY_CONTRACTORS,
  SET_WAITING_ANSWER_CONTRACTORS,
  SET_OPERATORS,
  CLEAR_SEARCH_CONTRACTORS,
  SET_CONTRACTORS_GROUP,
  SET_CONTRACTORS_PAGINATION_GROUP,
  SET_GROUP_CONTRACTORS_INFO,
  SET_ADDED_GROUP_CONTRACTORS_INFO,
  SET_ADDED_GROUP_LEGAL_ENTITY,
  SET_ADDED_GROUP_NATURAL_ENTITY,
  SET_ADDED_GROUP_EMPLOYEE,
  SET_LEGAL_ENTITY_GROUP,
  SET_NATURAL_ENTITY_GROUP,
  SET_EMPLOYEE_GROUP,
  SET_EXTERNAL_OPERATORS,
  SET_CONTRACTOR_GROUPS,
  SET_NO_CONTRACTOR_GROUPS,
  SET_PERSON_INFO,
  SET_COMPANY_INFO
} from './constants';
import { DefaultState } from '../helpers/contractors.typings';

export const defaultState: DefaultState = {
  error: false,
  isLoading: false,
  search: {},
  inviteYou: {},
  waitingAnswer: {},
  legalEntity: {},
  naturalEntity: {},
  operators: [],
  filter: {},
  groups: {
    recordsTotal: 0,
    rows: []
  },
  groupInfo: {
    legalEntityInfo: { recordsTotal: 0, rows: [] },
    naturalEntityInfo: { recordsTotal: 0, rows: [] },
    employeeInfo: { recordsTotal: 0, rows: [] }
  },
  groupInfoAdded: {
    legalEntityInfo: { recordsTotal: 0, rows: [] },
    naturalEntityInfo: { recordsTotal: 0, rows: [] },
    employeeInfo: { recordsTotal: 0, rows: [] }
  },
  externalOperators: {},
  currentContractor: {}
};

export const reducer = handleActions(
  {
    /** очистить список найденных контрагентов */
    [CLEAR_SEARCH_CONTRACTORS]: state => {
      return {
        ...state,
        search: {}
      };
    },

    /** добавление найденных контрагентов  */
    [SET_FOUND_PERSON_CONTRACTORS]: (state, { payload }) => {
      return {
        ...state,
        search: {
          person: payload.search.person
        }
      };
    },

    /** результат поиска ЮЛ локально */
    [SET_FOUND_COMPANY_CONTRACTORS]: (state, { payload }) => {
      return {
        ...state,
        search: payload.search
      };
    },

    /** сохранение ошибок */
    [SET_FOUND_ERRORS]: (state, { payload }) => {
      return {
        ...state,
        search: {
          errors: {
            ...payload
          }
        }
      };
    },

    /** установка в стейт список - Приглашают вас */
    [SET_INVITE_YOU_CONTRACTORS]: (state, { payload }) => {
      return {
        ...state,
        inviteYou: payload.inviteYou
      };
    },

    /** установка в стейт список - Ожидают ответа */
    [SET_WAITING_ANSWER_CONTRACTORS]: (state, { payload }) => {
      return {
        ...state,
        waitingAnswer: payload.waitingAnswer
      };
    },

    /** установка в стейт список контрагентов - ЮЛ */
    [SET_LEGAL_ENTITY_CONTRACTORS]: (state, { payload }) => {
      return {
        ...state,
        legalEntity: payload.legalEntity
      };
    },

    /** установка в стейт список контрагентов - ФЛ */
    [SET_NATURAL_ENTITY_CONTRACTORS]: (state, { payload }) => {
      return {
        ...state,
        naturalEntity: payload.naturalEntity
      };
    },

    /** установка операторов */
    [SET_OPERATORS]: (state, { payload }) => {
      return {
        ...state,
        operators: payload.operators
      };
    },

    /** установить груупу контрагентов */
    [SET_CONTRACTORS_GROUP]: (state, { payload }) => {
      return {
        ...state,
        // groups: payload.groups
        groups: { ...state.groups, ...payload.groups }
      };
    },

    /** установить значения пагинации для группы */
    [SET_CONTRACTORS_PAGINATION_GROUP]: (state, { payload }) => {
      return {
        ...state,
        groups: { ...state.groups, ...payload }
      };
    },

    /** установить информацию о группе (тех, кого можно добавить в группы) */
    [SET_GROUP_CONTRACTORS_INFO]: (state, { payload }) => {
      return {
        ...state,
        groupInfo: { ...state.groupInfo, ...payload.groupInfo }
      };
    },

    /** установить информацию о группе (уже добавленные контрагенты) */
    [SET_ADDED_GROUP_CONTRACTORS_INFO]: (state, { payload }) => {
      return {
        ...state,
        groupInfoAdded: { ...state.groupInfoAdded, ...payload.groupInfoAdded }
      };
    },

    /** установить информацию о группе ЮЛ (уже добавленные контрагенты) */
    [SET_ADDED_GROUP_LEGAL_ENTITY]: (state, { payload }) => {
      return {
        ...state,
        groupInfoAdded: {
          ...state.groupInfoAdded,
          legalEntityInfo: {
            ...state.groupInfoAdded.legalEntityInfo!,
            ...payload
          }
        }
      };
    },

    /** установить информацию о группе ФЛ (уже добавленные контрагенты) */
    [SET_ADDED_GROUP_NATURAL_ENTITY]: (state, { payload }) => {
      return {
        ...state,
        groupInfoAdded: {
          ...state.groupInfoAdded,
          naturalEntityInfo: {
            ...state.groupInfoAdded.naturalEntityInfo!,
            ...payload
          }
        }
      };
    },

    /** установить информацию о группе Сотрудники (уже добавленные контрагенты) */
    [SET_ADDED_GROUP_EMPLOYEE]: (state, { payload }) => {
      return {
        ...state,
        groupInfoAdded: {
          ...state.groupInfoAdded,
          employeeInfo: {
            ...state.groupInfoAdded.employeeInfo!,
            ...payload
          }
        }
      };
    },

    /** Установить ЮЛ которых можно добавить в группу */
    [SET_LEGAL_ENTITY_GROUP]: (state, { payload }) => {
      return {
        ...state,
        groupInfo: {
          ...state.groupInfo,
          legalEntityInfo: {
            ...state.groupInfo.legalEntityInfo!,
            ...payload
          }
        }
      };
    },

    /** Установить ФЛ которых можно добавить в группу */
    [SET_NATURAL_ENTITY_GROUP]: (state, { payload }) => {
      return {
        ...state,
        groupInfo: {
          ...state.groupInfo,
          naturalEntityInfo: {
            ...state.groupInfo.naturalEntityInfo!,
            ...payload
          }
        }
      };
    },

    /** Установить Сотрудников которых можно добавить в группу */
    [SET_EMPLOYEE_GROUP]: (state, { payload }) => {
      return {
        ...state,
        groupInfo: {
          ...state.groupInfo,
          employeeInfo: {
            ...state.groupInfo.employeeInfo!,
            ...payload
          }
        }
      };
    },

    /** установка внешних операторов */
    [SET_EXTERNAL_OPERATORS]: (state, { payload }) => {
      return {
        ...state,
        externalOperators: payload.externalOperators
      };
    },

    /** Установить группы текущего контрагента */
    [SET_CONTRACTOR_GROUPS]: (state, { payload }) => {
      return {
        ...state,
        currentContractor: {
          ...state.currentContractor,
          groups: payload.currentContractor.groups
        }
      };
    },

    /** Установить группы в которых еще нет текущего контрагента */
    [SET_NO_CONTRACTOR_GROUPS]: (state, { payload }) => {
      return {
        ...state,
        currentContractor: {
          ...state.currentContractor,
          newGroups: payload.currentContractor.newGroups
        }
      };
    },

    /** Установить информацию о текущем ФЛ */
    [SET_PERSON_INFO]: (state, { payload }) => {
      return {
        ...state,
        currentContractor: {
          ...state.currentContractor,
          person: payload.currentContractor.person
        }
      };
    },

    /** Установить информацию о текущем ФЛ */
    [SET_COMPANY_INFO]: (state, { payload }) => {
      return {
        ...state,
        currentContractor: {
          ...state.currentContractor,
          company: payload.currentContractor.company
        }
      };
    }
  },
  defaultState
);
