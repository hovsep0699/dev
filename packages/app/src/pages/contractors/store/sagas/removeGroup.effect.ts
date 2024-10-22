import { takeLatest, put } from 'redux-saga/effects';

import { removeGroup, getContractorsGroup } from '../actions';
import { Flash } from '../../../../common/flash/Flash';
import { ContractorApiServices } from '../../services/contractors.api';

export function* removeGroupEffect() {
  yield takeLatest(removeGroup, removeGroupWorker);
}

interface Payload {
  id: number;
  offset?: number;
}

/** Удаление группы */
function* removeGroupWorker({ payload }: { payload: Payload }) {
  try {
    yield ContractorApiServices.removeGroup(payload.id);
    yield put(getContractorsGroup({ offset: payload.offset }));
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}
