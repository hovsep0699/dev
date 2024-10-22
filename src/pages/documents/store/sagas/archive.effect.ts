import { takeLatest, put, select, call } from 'redux-saga/effects';

import {
  actionArchive,
  actionArchiveFailure,
  actionArchiveRequest,
  actionArchiveSuccess,
  actionDocumentRequest
} from '../actions';
import { Flash } from '../../../../common/flash/Flash';
import { DocumentType } from '../../helpers/documents.typings';
import { isArchivable } from '../../helpers/documnets.helpers';
import { selectList, selectSelected } from '../selects';
import { DocumentsApiServices } from '../../services/documents.api';

export function* ducumentArchive() {
  yield takeLatest(actionArchive, sagaArchive);
}

function* sagaArchive() {
  yield put(actionArchiveRequest());

  const list: DocumentType[] = yield select(selectList);
  const selected: string[] = yield select(selectSelected);

  const archivable: string[] = [];
  for (const { packageId, packageState } of list) {
    if (selected.includes(packageId) && isArchivable(packageState)) {
      archivable.push(packageId);
    }
  }
  try {
    yield call(DocumentsApiServices.archive, archivable);

    yield put(actionDocumentRequest({}));
    yield put(actionArchiveSuccess());
  } catch ({ message }) {
    yield put(actionArchiveFailure());
    yield Flash.error(message || 'Возникла ошибка');
  }
}
