import { takeLatest, put, select } from 'redux-saga/effects';

import { Flash } from '../../../../common/flash/Flash';
import { DocumentDetachPayload, DocumentType } from '../../helpers/documents.typings';
import { actionDocumentDetachFolder, actionDocumentUpdate } from '../actions';
import { selectList } from '../selects';

export function* ducumentDetachFolder() {
  yield takeLatest(actionDocumentDetachFolder, sagaDetachFolder);
}

function* sagaDetachFolder({ payload: { packageId, folderId } }: DocumentDetachPayload) {
  const documents: DocumentType[] = yield select(selectList);
  try {
    const documentIndex = documents.findIndex(item => item.packageId === packageId);
    const document = documents[documentIndex];

    document.labels = document.labels.filter(item => item.id.toString() !== folderId.toString());

    yield put(actionDocumentUpdate({ list: [...documents] }));
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}
