import { takeLatest } from 'redux-saga/effects';

import { addNaturalEntityToGroup } from '../actions';
import { Flash } from '../../../../common/flash/Flash';
import { ContractorApiServices } from '../../services/contractors.api';

export function* addNaturalEntityToGroupEffect() {
  yield takeLatest(addNaturalEntityToGroup, addNaturalEntityToGroupWorker);
}

interface Payload {
  groupId: number;
  contractorId: number;
}

/** Добавление ФЛ вгруппу */
function* addNaturalEntityToGroupWorker({ payload }: { payload: Payload }) {
  try {
    const { groupId, contractorId } = payload;
    yield ContractorApiServices.addToGroup({
      groupId,
      contractorId
    });
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}
