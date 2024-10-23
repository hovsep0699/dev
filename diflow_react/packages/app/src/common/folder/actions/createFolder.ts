import { put } from 'redux-saga/effects';
import * as TYPES from '../types';
import DocumentsFolderService from '@distate/core/dist/application/documents/common/DocumentsFolderService';
import Flash from '../../flash/Flash';

export default function createFolder(title: string) {
  return {
    type: TYPES.CREATE_FOLDER_LOADING,
    title
  };
}

export function* createFolderSaga({ title, isVisible }: any) {
  try {
    const res = yield DocumentsFolderService.create(title);
    yield put({
      type: TYPES.CREATE_FOLDER,
      payload: { id: res.data.id, title, isVisible, editing: false }
    });
    yield Flash.success(`Папка ${title} успешно создана.`);
  } catch (error) {
    yield put({ type: TYPES.FOLDERS_ERROR, payload: error });
  }
}
