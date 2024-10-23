import { takeLatest, put, select } from 'redux-saga/effects';

import { Flash } from '../../../../common/flash/Flash';
import { DocumentAttachPayload, DocumentType } from '../../helpers/documents.typings';
import { actionDocumentAttachFolder, actionDocumentUpdate } from '../actions';
import { selectList } from '../selects';

export function* ducumentAttachFolder() {
  yield takeLatest(actionDocumentAttachFolder, sagaAttachFolder);
}

function* sagaAttachFolder({ payload: { packageIds, folder } }: DocumentAttachPayload) {
  if (!folder) return;

  const documents: DocumentType[] = yield select(selectList);
  try {
    const list: DocumentType[] = [];
    documents.forEach(doc => {
      let isChange = packageIds.includes(doc.packageId);
      if (isChange) {
        const folderId = folder.id;
        const isFolder = doc.labels.find(item => item.id === folderId);

        if (!isFolder) {
          doc.labels.push(folder);
        }
      }

      list.push(doc);
    });

    yield put(actionDocumentUpdate({ list }));
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}
