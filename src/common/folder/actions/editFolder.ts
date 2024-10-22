import { put } from 'redux-saga/effects';
import * as TYPES from '../types';
import DocumentsFolderService from '@distate/core/dist/application/documents/common/DocumentsFolderService';

export default function editFolder(id: number, title: string) {
  return {
    type: TYPES.EDIT_FOLDER_LOADING,
    id,
    title
  };
}

export function* editFolderSaga({ id, title }: any) {
  try {
    yield DocumentsFolderService.update(id, title);
    yield put({
      type: TYPES.EDIT_FOLDER,
      payload: { id, title, editing: false }
    });
  } catch (error) {
    yield put({ type: TYPES.FOLDERS_ERROR, payload: error });
  }
}
