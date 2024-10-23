import Core from '@distate/core/dist/application/Core';
import { takeLatest, select, put, call } from 'redux-saga/effects';

import {
  actionStartProcess,
  actionStopProcess,
  actionClear,
  actionCheckListRequest
} from '../actions';
import { selectList } from '../selects';

export function* signRoot() {
  yield takeLatest(actionStartProcess, sagaSignStart);
}

function* sagaSignStart() {
  const list = yield select(selectList);
  if (!list || !list.length) {
    return;
  }

  try {
    yield call(Core.startReceiptsManualSigning, list);
    yield put(actionClear());
    yield put(actionStopProcess());
    yield put(actionCheckListRequest());
  } catch (error) {
    console.error('sagaSignStart[error]', error);
  }
}
