import { takeLatest, put } from 'redux-saga/effects';

import { addLegalEntityToGroup, getLegalEntityGroup, getAddedGroupLegalEntity } from '../actions';
import { Flash } from '../../../../common/flash/Flash';
import { ContractorApiServices } from '../../services/contractors.api';

export function* addLegalEntityToGroupEffect() {
  yield takeLatest(addLegalEntityToGroup, addLegalEntityToGroupWorker);
}

interface Payload {
  groupId: number;
  contractorId: number;
  offset?: number;
}

/** Добавление ЮЛ вгруппу */
function* addLegalEntityToGroupWorker({ payload }: { payload: Payload }) {
  try {
    const { groupId, contractorId, offset } = payload;
    yield ContractorApiServices.addToGroup({
      groupId,
      contractorId
    });
    yield put(getLegalEntityGroup({ id: groupId, offset }));
    yield put(getAddedGroupLegalEntity({ id: groupId, offset }));
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}
