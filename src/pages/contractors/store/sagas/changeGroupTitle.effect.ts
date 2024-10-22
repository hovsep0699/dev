import { takeLatest, put } from 'redux-saga/effects';

import { changeContractorsGroupTitle, getContractorsGroup } from '../actions';
import { Flash } from '../../../../common/flash/Flash';
import { ContractorApiServices } from '../../services/contractors.api';

export function* changeGroupTitleEffect() {
  yield takeLatest(changeContractorsGroupTitle, changeGroupTitleWorker);
}

interface Payload {
  id: number;
  title: string;
}

/** Изменение названия группы */
function* changeGroupTitleWorker({ payload }: { payload: Payload }) {
  try {
    yield ContractorApiServices.changeContractorsGroupTitle(payload.id, payload.title);
    yield put(getContractorsGroup());
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}
