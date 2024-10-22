import { takeLatest, put } from 'redux-saga/effects';

import { removeEmployeeFromGroup, getAddedGroupEmployee } from '../actions';
import { Flash } from '../../../../common/flash/Flash';
import { ContractorApiServices } from '../../services/contractors.api';

export function* removeEmployeeFromGroupEffect() {
  yield takeLatest(removeEmployeeFromGroup, removeEmployeeFromGroupWorker);
}

interface Payload {
  groupId: number;
  contractorId: number;
}

/** Удаление контрагента из группы */
function* removeEmployeeFromGroupWorker({ payload }: { payload: Payload }) {
  try {
    yield ContractorApiServices.removeEmployeeFromGroup({
      groupId: payload.groupId,
      contractorId: payload.contractorId
    });
    yield put(getAddedGroupEmployee({ id: payload.groupId }));
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}
