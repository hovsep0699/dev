import { takeLatest } from 'redux-saga/effects';
import * as TYPES from './types';
import { fetchFoldersSaga } from './actions/fetchFolders';
import { createFolderSaga } from './actions/createFolder';
import { deleteFolderSaga } from './actions/deleteFolder';
import { editFolderSaga } from './actions/editFolder';
import { attachDocumentsSaga } from './actions/attachDocuments';
import { detachDocumentSaga } from './actions/detachDocument';

export function* watchFetchFolders() {
  yield takeLatest(TYPES.LOAD_FOLDERS_LOADING, fetchFoldersSaga);
}

export function* watchCreateFolder() {
  yield takeLatest(TYPES.CREATE_FOLDER_LOADING, createFolderSaga);
}

export function* watchDeleteFolder() {
  yield takeLatest(TYPES.DELETE_FOLDER_LOADING, deleteFolderSaga);
}

export function* watchEditFolder() {
  yield takeLatest(TYPES.EDIT_FOLDER_LOADING, editFolderSaga);
}

export function* watchAttachDocuments() {
  yield takeLatest(TYPES.ATTACH_DOCUMENTS_LOADING, attachDocumentsSaga);
}

export function* watchDetachDocument() {
  // TODO check takeEvery
  yield takeLatest(TYPES.DETACH_DOCUMENT_LOADING, detachDocumentSaga);
}
