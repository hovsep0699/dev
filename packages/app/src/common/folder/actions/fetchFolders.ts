import { put } from 'redux-saga/effects';
import * as TYPES from '../types';
import DocumentsFolderService from '@distate/core/dist/application/documents/common/DocumentsFolderService';
import formatResponse from '../utils/formatResponse';

export default function fetchFolders() {
  return {
    type: TYPES.LOAD_FOLDERS_LOADING
  };
}

export function* fetchFoldersSaga() {
  try {
    const folders = yield DocumentsFolderService.get();
    yield put({ type: TYPES.LOAD_FOLDERS, payload: formatResponse(folders.rows) });
  } catch (error) {
    yield put({ type: TYPES.FOLDERS_ERROR, payload: error });
  }
}
