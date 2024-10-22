import { takeLatest } from 'redux-saga/effects';

import { actionInit } from '../actions';

export function* ducumentTools() {
  yield takeLatest(actionInit, sagaInit);
}

function* sagaInit() {
  yield console.log('init saga');
}
