import { put } from 'redux-saga/effects';
import * as TYPES from '../types';
import DocumentsFolderService from '@distate/core/dist/application/documents/common/DocumentsFolderService';

export default function deleteFolder(id: string) {
  return {
    type: TYPES.DELETE_FOLDER_LOADING,
    id
  };
}

export function* deleteFolderSaga({ id }: any) {
  try {
    yield DocumentsFolderService.delete(id);
    yield put({
      type: TYPES.DELETE_FOLDER,
      payload: { id }
    });
  } catch (error) {
    yield put({ type: TYPES.FOLDERS_ERROR, payload: error });
  }
}
