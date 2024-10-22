import { takeLatest, call, put, select } from 'redux-saga/effects';

import { Flash } from '../../../../common/flash/Flash';
import { FolderApiServices } from '../../services/folder.api';
import { AddPackagePayload, DetchPackagePayload } from '../../helpers/folder.typings';
import {
  actionAddPackage,
  actionAddPackageFailure,
  actionAddPackageRequest,
  actionAddPackageSuccess,
  actionDetachPackage,
  actionDetachPackageFailure,
  actionDetachPackageRequest,
  actionDetachPackageSuccess
} from '../actions';
import { selectFolders } from '../selects';

export function* packageEffectAttach() {
  yield takeLatest(actionAddPackage, sagaAttachPackage);
}

export function* packageEffectDetach() {
  yield takeLatest(actionDetachPackage, sagaDetachPackage);
}

function* sagaAttachPackage({ payload: { folderId, packageIds, callback } }: AddPackagePayload) {
  try {
    yield put(actionAddPackageRequest());
    yield call(FolderApiServices.attachDocuments, { folderId, packageIds });
    yield put(actionAddPackageSuccess());

    const folders = yield select(selectFolders);
    const folder = folders.find((item: any) => item.id === folderId);

    yield Flash.success(`Документы добавлены в папку ${folder.title}`);

    if (callback) yield callback.success();
  } catch (err) {
    yield put(actionAddPackageFailure());
    yield Flash.error('Вознилка ошибка при добавлении в папку');

    if (callback) yield callback.failure();
  }
}

function* sagaDetachPackage({ payload: { folderId, packageId, callback } }: DetchPackagePayload) {
  try {
    yield put(actionDetachPackageRequest());
    yield call(FolderApiServices.detachDocument, { folderId, packageId });
    yield put(actionDetachPackageSuccess());

    if (callback) yield callback.success();
  } catch (err) {
    yield put(actionDetachPackageFailure(err));
    yield Flash.error('Вознилка ошибка удалении документа из папки');

    if (callback) yield callback.failure();
  }
}
