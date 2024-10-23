import { put } from 'redux-saga/effects';
import * as TYPES from '../types';
import DocumentsFolderService from '@distate/core/dist/application/documents/common/DocumentsFolderService';
import Flash from '../../flash/Flash';

export default function attachDocuments(id: string, title: string, packageIds: string[]) {
  return {
    type: TYPES.ATTACH_DOCUMENTS_LOADING,
    id,
    title,
    packageIds
  };
}

export function* attachDocumentsSaga({ id, title, packageIds }: { [key: string]: any }) {
  try {
    yield DocumentsFolderService.attachDocuments(id.toString(), packageIds);
    yield put({ type: TYPES.ATTACH_DOCUMENTS_SUCCESS });
    yield Flash.success(`Документы добавлены в папку ${title}.`);
  } catch (error) {
    yield put({ type: TYPES.FOLDERS_ERROR, payload: error });
  }
}
