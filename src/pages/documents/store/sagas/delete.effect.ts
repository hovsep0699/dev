import { takeLatest, put, select, call } from 'redux-saga/effects';

import {
  actionDelete,
  actionDeleteFailure,
  actionDeleteRequest,
  actionDeleteSuccess,
  actionDocumentRequest
} from '../actions';
import { selectSelected } from '../selects';
import { Flash } from '../../../../common/flash/Flash';
import { DocumentsApiServices } from '../../services/documents.api';

export function* ducumentDelete() {
  yield takeLatest(actionDelete, sagaDelete);
}

function* sagaDelete() {
  yield put(actionDeleteRequest());
  const selected: string[] = yield select(selectSelected);

  try {
    yield call(DocumentsApiServices.delete, selected);

    yield put(actionDocumentRequest({}));
    yield put(actionDeleteSuccess());

    yield Flash.success('Удалено');
  } catch ({ message }) {
    yield put(actionDeleteFailure());
    yield Flash.error('Возникла ошибка во время удаления');
  }
}
