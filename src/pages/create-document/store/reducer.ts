import { handleActions } from 'redux-actions';

import {
  SET_FLOW_TYPE,
  SET_UNFORMALIZED_FLOW,
  SET_UNFORMALIZED_DIVISION_EMPLOYEE,
  SET_UNFORMALIZED_ERROR,
  SET_DOCUMENT_JSON
} from './constants';
import { DefaultState } from '../helpers/createDocument.typings';

export const defaultState: DefaultState = {};

export const reducer = handleActions(
  {
    /** установить тип документооборота */
    [SET_FLOW_TYPE]: (state, { payload }) => {
      return {
        ...state,
        fileResponse: payload.fileResponse
      };
    },

    /** установка вида документов */
    [SET_UNFORMALIZED_FLOW]: (state, { payload }) => {
      return {
        ...state,
        flow: payload.flow
      };
    },

    /** установка подразделений отправителя */
    [SET_UNFORMALIZED_DIVISION_EMPLOYEE]: (state, { payload }) => {
      return {
        ...state,
        divisionsEmployee: payload.divisionsEmployee
      };
    },

    /** установить ошибки неформализованного документа */
    [SET_UNFORMALIZED_ERROR]: (state, { payload }) => {
      return {
        ...state,
        errors: payload.errors
      };
    },

    /** установить данные документа */
    [SET_DOCUMENT_JSON]: (state, { payload }) => {
      return {
        ...state,
        documentJson: payload.documentJson
      };
    }
  },
  defaultState
);
