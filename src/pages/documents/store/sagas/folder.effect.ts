import { takeLatest, put } from 'redux-saga/effects';

import { actionDocumentRequest } from '../actions';
import { actionRemoveSuccess } from '../../../../container/folder/store/actions';

export function* folderRemove() {
  yield takeLatest(actionRemoveSuccess, sagaDocumentRequets);
}

function* sagaDocumentRequets() {
  yield put(actionDocumentRequest({}));
}
