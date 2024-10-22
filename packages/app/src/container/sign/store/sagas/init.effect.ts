import { takeLatest, call, put } from 'redux-saga/effects';
import SecurityService from '@distate/core/dist/application/security/SecurityService';

import { SingApiServices } from '../../services/sign.api';
import {
  actionInit,
  actionAutosigning,
  actionCheckListRequest,
  actionCheckListSuccess,
  actionCheckListFailure,
  actionSignTotal,
  setHasRoleIncomplete
} from '../actions';

export function* initRoot() {
  yield takeLatest(actionInit, sagaInit);
  yield takeLatest(actionCheckListRequest, sageCheckList);
}

function* sagaInit() {
  const hasAutosigning = SecurityService.hasRole('ROLE_RECEIPTS_AUTOSIGNING');
  const hasRoleIncomplete = SecurityService.hasRole('ROLE_INCOMPLETE');

  yield put(setHasRoleIncomplete({ hasRoleIncomplete }));

  yield put(actionAutosigning({ hasAutosigning }));
  yield put(actionCheckListRequest());
}

function* sageCheckList() {
  try {
    const list = yield call(SingApiServices.getList);
    yield put(actionCheckListSuccess({ signList: list }));
    yield put(actionSignTotal({ signTotal: list.length }));
  } catch (error) {
    yield put(actionCheckListFailure({ signListFailure: error }));
  }
}
