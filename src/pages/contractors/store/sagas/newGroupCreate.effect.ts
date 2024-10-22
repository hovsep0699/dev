import { takeLatest, put } from 'redux-saga/effects';

import { newGroupCreate, getContractorsGroup } from '../actions';
import { Flash } from '../../../../common/flash/Flash';
import { ContractorApiServices } from '../../services/contractors.api';

export function* newGroupCreateEffect() {
  yield takeLatest(newGroupCreate, newGroupCreateWorker);
}

interface Payload {
  title: string;
  offset: number;
}
/** Создание новой группы */
function* newGroupCreateWorker({ payload }: { payload: Payload }) {
  try {
    const { title, offset } = payload;
    yield ContractorApiServices.newGroupCreate(title);
    yield put(getContractorsGroup({ offset }));
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}
