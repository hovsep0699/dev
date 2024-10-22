import { takeLatest, put, select } from 'redux-saga/effects';

import { actionSearchSubmit, actionSearchClear } from '../../../../container/filter/store/actions';
import { selectPathName } from '../../../../store/selects';
import { DOCUMENT } from '../../../../common/Url';

import { actionDocumentRequest, actionDocumentFilter } from '../actions';
import { selectFilter, selectMode } from '../selects';

// Search Submit
// ----------------
export function* ducumentSearchSubmit() {
  yield takeLatest(actionSearchSubmit, sagaSearchSubmit);
}

function* sagaSearchSubmit({ payload: { formData } }: any) {
  const pathname: string = yield select(selectPathName);
  if (pathname.substr(0, DOCUMENT.length) !== DOCUMENT) {
    return;
  }

  const mode = yield select(selectMode);
  const { labels } = yield select(selectFilter);

  let filter: any = {};
  if (labels) {
    filter['labels'] = labels;
  }

  if (mode !== 'folder' && mode !== 'redirect') {
    filter['documentStatuses'] = [mode];
  }

  filter = { ...filter, ...formData };

  yield put(actionDocumentFilter({ filter, offset: 0 }));
  yield put(actionDocumentRequest({}));
  try {
  } catch ({ message }) {}
}

// Search Clear
// ----------------
export function* ducumentSearchClear() {
  yield takeLatest(actionSearchClear, sagaSearchClear);
}

function* sagaSearchClear() {
  const pathname: string = yield select(selectPathName);
  if (pathname.substr(0, DOCUMENT.length) !== DOCUMENT) {
    return;
  }

  const { documentStatuses, labels } = yield select(selectFilter);

  yield put(actionDocumentFilter({ filter: { documentStatuses, labels }, offset: 0 }));
  yield put(actionDocumentRequest({}));
}
