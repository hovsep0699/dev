import { takeLatest, call, put } from 'redux-saga/effects';
import { SystemService } from '@distate/core/dist/application/system';

import { connectersRequest, connectersFailure, connectersSuccess } from '../actions';

export function* connectersEffect() {
  yield takeLatest(connectersRequest, request);
}

function* request({ payload: { id } }: any) {
  try {
    const service = new SystemService();
    const connecters = yield call(service.operators, id);

    yield put(connectersSuccess({ connecters: connecters }));
  } catch (error) {
    yield put(connectersFailure({ error }));
  }
}
