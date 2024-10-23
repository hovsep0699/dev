import { takeLatest, put } from 'redux-saga/effects';

import { removeFromGroup, getAddedGroupLegalEntity, getAddedGroupNaturalEntity } from '../actions';
import { Flash } from '../../../../common/flash/Flash';
import { ContractorApiServices } from '../../services/contractors.api';

export function* removeFromGroupEffect() {
  yield takeLatest(removeFromGroup, removeFromGroupWorker);
}

interface Payload {
  groupId: number;
  contractorId: number;
}

/** Удаление контрагента из группы */
function* removeFromGroupWorker({ payload }: { payload: Payload }) {
  try {
    yield ContractorApiServices.removeFromGroup({
      groupId: payload.groupId,
      contractorId: payload.contractorId
    });
    yield put(getAddedGroupLegalEntity({ id: payload.groupId }));
    yield put(getAddedGroupNaturalEntity({ id: payload.groupId }));
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}
