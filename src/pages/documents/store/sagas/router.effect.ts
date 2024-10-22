import { takeLatest, put, select } from 'redux-saga/effects';

import { actionChangeRoute } from '../../../../store/actions';
import { selectPathName } from '../../../../store/selects';
import { DOCUMENT } from '../../../../common/Url';
import {
  actionMode,
  actionDocumentInit,
  actionDocumentTools,
  actionDocumentFilter,
  actionDocumentRequest
} from '../actions';

const document = DOCUMENT.split('/')
  .filter(Boolean)
  .join('/');

export function* ducumentRouter() {
  yield takeLatest(actionChangeRoute, sagaRouter);
}

function* sagaRouter() {
  const pathname: string = yield select(selectPathName);
  if (pathname.substr(0, DOCUMENT.length) === DOCUMENT) {
    const paths = pathname
      .toLowerCase()
      .split('/')
      .filter(Boolean);

    let mode = paths.slice(0, 2).pop();
    mode = mode === document ? 'redirect' : mode;

    yield put(actionDocumentInit());
    yield put(actionMode({ mode }));

    if (mode !== 'redirect') {
      let defaultFilter: any = {};
      if (mode === 'folder') {
        const folderId = paths.slice(0, 3).pop();
        if (folderId) {
          defaultFilter['labels'] = [parseInt(folderId)];
        }
      }

      yield put(actionDocumentFilter({ filter: defaultFilter, offset: 0 }));
      yield put(actionDocumentTools());
      yield put(actionDocumentRequest({}));
    }
  }
}
