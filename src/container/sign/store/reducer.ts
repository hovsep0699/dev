import { handleActions } from 'redux-actions';

import { DefaultState } from '../helpers/sign.typings';
import {
  INIT,
  CLEAR,
  AUTOSIGNING,
  CHECK_LIST_SUCCESS,
  CHECK_LIST_FAILURE,
  CHECK_LIST_REQUEST,
  STOP_PROCESS,
  START_PROCESS,
  SIGN_TOTAL,
  SIGN_CURRENT,
  SET_HAS_INCOMPLETE_ROLE
} from './constants';

export const defaultState: DefaultState = {
  start: false,
  hasAutosigning: null,
  signListLoading: false,
  signListFailure: null,
  signList: [],
  signTotal: 0,
  signCurrent: 0
};

export const reducer = handleActions(
  {
    [INIT]: () => defaultState,

    [CLEAR]: () => ({ ...defaultState }),

    [CHECK_LIST_REQUEST]: state => ({ ...state, signListLoading: true }),

    [CHECK_LIST_SUCCESS]: (state, { payload: { signList } }) => ({
      ...state,
      signList,
      signListLoading: false
    }),

    [CHECK_LIST_FAILURE]: (state, { payload: { signListFailure } }) => ({
      ...state,
      signListLoading: false,
      signListFailure
    }),

    [AUTOSIGNING]: (state, { payload: { hasAutosigning } }) => ({ ...state, hasAutosigning }),

    [STOP_PROCESS]: state => ({ ...state, start: false }),

    [START_PROCESS]: state => ({ ...state, start: true }),

    [SIGN_TOTAL]: (state, { payload: { signTotal } }) => ({ ...state, signTotal }),

    [SIGN_CURRENT]: (state, { payload: { signCurrent } }) => ({ ...state, signCurrent }),

    [SET_HAS_INCOMPLETE_ROLE]: (state, { payload: { hasRoleIncomplete } }) => ({
      ...state,
      hasRoleIncomplete
    })
  },
  defaultState
);
