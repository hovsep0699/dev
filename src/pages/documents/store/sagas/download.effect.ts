import { takeLatest, call, select, put } from 'redux-saga/effects';

import { Flash } from '../../../../common/flash/Flash';
import { DocumentsApiServices } from '../../services/documents.api';
import {
  DefaultState,
  DocumentType,
  ADocumentDownloadPayload
} from '../../helpers/documents.typings';
import { selectSelected, selectList } from '../selects';
import {
  actionDocumentDownloadRequest,
  actionDocumentDownloadSuccess,
  actionDocumentDownloadFailure
} from '../actions';

export function* ducumentDownload() {
  yield takeLatest(actionDocumentDownloadRequest, sagaDocumentDownload);
}

type Selected = Pick<DefaultState, 'selected'>['selected'];

function* sagaDocumentDownload({ payload: { ids } }: ADocumentDownloadPayload) {
  const selected: Selected = ids ? ids : yield select(selectSelected);
  const items: DocumentType[] = yield select(selectList);
  const isCorrect = items
    .filter(item => selected.includes(item.packageId))
    .every(item => item.isSavedCorrectly);

  try {
    if (!isCorrect) {
      throw new Error('Документ содержит ошибки. Скачивание невозможно.');
    }

    yield call(DocumentsApiServices.download, selected);
    yield put(actionDocumentDownloadSuccess());
  } catch ({ message }) {
    yield put(actionDocumentDownloadFailure());
    Flash.error(message || 'Документ содержит ошибки. Скачивание невозможно.');
  }
}
