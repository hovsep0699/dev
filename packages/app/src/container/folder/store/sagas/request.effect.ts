import { takeLatest, call, put } from 'redux-saga/effects';

import { FolderApiServices } from '../../services/folder.api';
import { actionRequest, actionSuccess, actionFailure } from '../actions';

export function* requestEffect() {
  yield takeLatest(actionRequest, sagaRequest);
}

function* sagaRequest() {
  try {
    const res = yield call(FolderApiServices.getFolders);
    yield put(actionSuccess(res));
  } catch (err) {
    yield put(actionFailure(err));
  }
}
