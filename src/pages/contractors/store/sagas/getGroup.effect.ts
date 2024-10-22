import { takeLatest, put } from 'redux-saga/effects';

import { getContractorsGroup, setContractorsGroup } from '../actions';
import { Flash } from '../../../../common/flash/Flash';
import { ContractorApiServices } from '../../services/contractors.api';

export function* getGroupEffect() {
  yield takeLatest(getContractorsGroup, getGroupWorker);
}

/** Получение групп контрагентов */
function* getGroupWorker({ payload = {} }: any) {
  try {
    const { offset } = payload;
    const response = yield ContractorApiServices.getContractorsGroup({ offset });
    yield put(setContractorsGroup({ groups: response }));
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}
