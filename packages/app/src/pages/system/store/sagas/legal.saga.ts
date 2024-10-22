import { takeLatest, call, put } from 'redux-saga/effects';
import { SystemService } from '@distate/core/dist/application/system';

import {
  legalsRequest,
  legalsFailure,
  legalsSuccess,
  updateConnectersRequest,
  updateConnectersSuccess,
  updateConnectersFailure
} from '../actions';

export function* legalEffect() {
  yield takeLatest(legalsRequest, request);
  yield takeLatest(updateConnectersRequest, update);
}

function* request() {
  try {
    const service = new SystemService();
    const { total, list } = yield call(service.legal, { limit: 9999 });
    yield put(legalsSuccess({ total, list }));
  } catch (error) {
    yield put(legalsFailure({ error }));
  }
}

function* update({ payload: { id, connectors } }: any) {
  try {
    const service = new SystemService();
    yield call(service.updateOperators, id, connectors);
    yield put(updateConnectersSuccess());
  } catch {
    yield put(updateConnectersFailure({}));
  }
}
