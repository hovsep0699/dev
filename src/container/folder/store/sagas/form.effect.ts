import { takeLatest, select, call, put } from 'redux-saga/effects';

import { Flash } from '../../../../common/flash/Flash';
import { selectFormLoading } from '../selects';
import { FolderApiServices } from '../../services/folder.api';
import { FormSubmitPayload, RemovePayload } from '../../helpers/folder.typings';
import {
  actionRequest,
  actionFormSubmit,
  actionFormRequest,
  actionFormSuccess,
  actionFormFailure,
  actionRemove,
  actionRemoveSuccess,
  actionRemoveFailure
} from '../actions';

export function* formSubmitEffect() {
  yield takeLatest(actionFormSubmit, sagaForm);
}

export function* formRemoveEffect() {
  yield takeLatest(actionRemove, sagaRemove);
}

function* sagaForm({ payload }: FormSubmitPayload) {
  const loading = yield select(selectFormLoading);
  const { id, title } = payload;

  if (loading) return;

  try {
    yield put(actionFormRequest());

    if (id) {
      yield call(FolderApiServices.update, { id, title });
    } else {
      yield call(FolderApiServices.create, { title });
    }

    yield put(actionFormSuccess());
    yield put(actionRequest());
  } catch (err) {
    yield put(actionFormFailure(err));

    Flash.error('Возникла ошибка при добавлении');
  }
}

function* sagaRemove({ payload: { id } }: RemovePayload) {
  try {
    yield call(FolderApiServices.remove, { id });
    yield put(actionRequest());
    yield put(actionRemoveSuccess());
  } catch (err) {
    yield put(actionRemoveFailure());
  }
}
