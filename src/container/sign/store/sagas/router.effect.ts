import { takeLatest } from 'redux-saga/effects';

import { actionChangeRoute } from '../../../../store/actions';
// import { actionInit } from '../actions';

export function* routerRoot() {
  yield takeLatest(actionChangeRoute, sagaRouter);
}

function* sagaRouter() {
  // yield put(actionInit());
}
