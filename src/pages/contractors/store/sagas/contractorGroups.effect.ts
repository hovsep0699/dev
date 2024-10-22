import { takeLatest, put } from 'redux-saga/effects';

import {
  getContractorGroups,
  setContractorGroups,
  deleteContractorGroup,
  getNoContractorGroups,
  setNoContractorGroups,
  addContractorToGroup
} from '../actions';
import { Flash } from '../../../../common/flash/Flash';
import { ContractorApiServices } from '../../services/contractors.api';

export function* contractorGroupsEffect() {
  yield takeLatest(getContractorGroups, getContractorGroupsWorker);
  yield takeLatest(deleteContractorGroup, deleteContractorGroupWorker);
  yield takeLatest(getNoContractorGroups, getNoContractorGroupsWorker);
  yield takeLatest(addContractorToGroup, addContractorToGroupWorker);
}

type GetContractorGroupPayload = {
  id: number;
  inverseJoin?: boolean;
  offset?: number;
  limit?: number;
};

/** Получить группы контрагента */
function* getContractorGroupsWorker({ payload }: { payload: GetContractorGroupPayload }) {
  try {
    const { id, offset, limit } = payload;
    const res = yield ContractorApiServices.getContractorGroups({
      id,
      offset,
      limit
    });
    yield put(setContractorGroups({ currentContractor: { groups: res } }));
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}

type DeleteContractorGroup = {
  groupId: number;
  contractorId: number;
};

/** удаление контрагента из группы */
function* deleteContractorGroupWorker({ payload }: { payload: DeleteContractorGroup }) {
  try {
    yield ContractorApiServices.deleteContractorGroup(payload);
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}

type GetNoContractorGroupPayload = {
  id: number;
  inverseJoin?: boolean;
  offset?: number;
  limit?: number;
};
/** получение групп, в которых еще нет контрагента */
function* getNoContractorGroupsWorker({ payload }: { payload: GetNoContractorGroupPayload }) {
  try {
    const { id, offset, limit } = payload;
    const res = yield ContractorApiServices.getContractorGroups({
      id,
      offset,
      limit,
      inverseJoin: true
    });
    yield put(setNoContractorGroups({ currentContractor: { newGroups: res } }));
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}

type Payload = { groupId: number; contractorId: number };

/** добавление пользователя в группу */
function* addContractorToGroupWorker({ payload }: { payload: Payload }) {
  try {
    yield ContractorApiServices.addContractorToGroup(payload);
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}
