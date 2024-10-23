import { createAction } from 'redux-actions';

import {
  INIT,
  CLEAR,
  CHECK_LIST_REQUEST,
  CHECK_LIST_SUCCESS,
  CHECK_LIST_FAILURE,
  AUTOSIGNING,
  STOP_PROCESS,
  START_PROCESS,
  SIGN_TOTAL,
  SIGN_CURRENT,
  SET_HAS_INCOMPLETE_ROLE
} from './constants';

export const actionInit = createAction(INIT);
export const actionClear = createAction(CLEAR);

export const actionAutosigning = createAction(AUTOSIGNING);

export const actionCheckListRequest = createAction(CHECK_LIST_REQUEST);
export const actionCheckListSuccess = createAction(CHECK_LIST_SUCCESS);
export const actionCheckListFailure = createAction(CHECK_LIST_FAILURE);

export const actionStopProcess = createAction(STOP_PROCESS);
export const actionStartProcess = createAction(START_PROCESS);

export const actionSignTotal = createAction(SIGN_TOTAL);
export const actionSignCurrent = createAction(SIGN_CURRENT);

export const setHasRoleIncomplete = createAction(SET_HAS_INCOMPLETE_ROLE);
