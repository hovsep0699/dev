import { put } from 'redux-saga/effects';
import * as TYPES from '../types';
import DocumentsFolderService from '@distate/core/dist/application/documents/common/DocumentsFolderService';

export default function detachDocument(id: string, packageId: string) {
  return {
    type: TYPES.DETACH_DOCUMENT_LOADING,
    id,
    packageId
  };
}

export function* detachDocumentSaga({ id, packageId }: { [key: string]: any }) {
  try {
    yield DocumentsFolderService.detachDocument(id, packageId);
    yield put({ type: TYPES.DETACH_DOCUMENT_SUCCESS });
  } catch (error) {
    yield put({ type: TYPES.FOLDERS_ERROR, payload: error });
  }
}
