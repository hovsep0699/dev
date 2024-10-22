import { takeLatest } from 'redux-saga/effects';

import { addEmployeeToGroup } from '../actions';
import { Flash } from '../../../../common/flash/Flash';
import { ContractorApiServices } from '../../services/contractors.api';

export function* addEmployeeToGroupEffect() {
  yield takeLatest(addEmployeeToGroup, addEmployeeToGroupWorker);
}

interface Payload {
  groupId: number;
  contractorId: number;
}

/** Добавление сотрудника вгруппу */
function* addEmployeeToGroupWorker({ payload }: { payload: Payload }) {
  try {
    yield ContractorApiServices.addEmployeeToGroup({
      groupId: payload.groupId,
      contractorId: payload.contractorId
    });
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}
