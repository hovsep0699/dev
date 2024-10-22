import { takeLatest, call, put, select } from 'redux-saga/effects';

import { Flash } from '../../../../common/flash/Flash';
import { actionStopProcess } from '../../../../container/sign/store/actions';

import {
  actionDocumentNext,
  actionDocumentNextRequest,
  actionDocumentNextSuccess,
  actionDocumentNextFailure,
  actionDocumentRequest,
  actionDocumentFailure,
  actionDocumentSuccess
} from '../actions';
import { ADocumentRequestPayload } from '../../helpers/documents.typings';
import { DocumentsApiServices } from '../../services/documents.api';
import { selectIsNext, selectLimit, selectFilter, selectMode, selectOffset } from '../selects';

export function* ducumentRequest() {
  yield takeLatest(actionDocumentRequest, sagaDocumentRequest);
  yield takeLatest(actionStopProcess, sagaDocumentUpdate);
}

export function* documentReloads() {
  yield takeLatest(actionDocumentNext, sagaDocumentNext);
}

function* sagaDocumentUpdate() {
  yield put(actionDocumentRequest({}));
}

function* sagaDocumentRequest(action: ADocumentRequestPayload) {
  const {
    payload: { offset = 0, limit }
  } = action;
  try {
    const mode = yield select(selectMode);
    const count = limit ? limit : yield select(selectLimit);
    const params = yield select(selectFilter) || {};

    const res = yield call(DocumentsApiServices.search, { mode, params, offset, limit: count + 1 });
    const { recordsTotal, rows = [] } = res;

    const isNext = rows.length > count;
    const list = rows.slice(0, count);

    yield put(
      actionDocumentSuccess({
        isNext,
        offset,
        list,
        totalList: recordsTotal
      })
    );
  } catch ({ message }) {
    yield put(actionDocumentFailure(message));
    Flash.error(message || 'Возникла ошибки при попытке получить список документов.');
  }
}

function* sagaDocumentNext() {
  const mode = yield select(selectMode);
  const count = yield select(selectLimit);
  const offset = yield select(selectOffset);
  const params = yield select(selectFilter) || {};

  let isNext = yield select(selectIsNext);
  if (!isNext) return;

  try {
    yield put(actionDocumentNextRequest());

    const step = count + offset;
    const res = yield call(DocumentsApiServices.search, {
      mode,
      params,
      limit: count + 1,
      offset: step
    });

    const { rows = [] } = res;
    isNext = rows.length > count;

    const list = rows.slice(0, count);

    yield put(actionDocumentNextSuccess({ list, isNext, offset: step }));
  } catch ({ message }) {
    yield put(actionDocumentNextFailure());
    Flash.error(message || 'Возникла ошибки при попытке получить список документов.');
  }
}
