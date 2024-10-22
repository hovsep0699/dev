import { takeLatest, put } from 'redux-saga/effects';

import { getLegalEntityGroup, setLegalEntityGroup } from '../actions';
import { Flash } from '../../../../common/flash/Flash';
import { ContractorApiServices } from '../../services/contractors.api';

export function* getLegalEntityGroupEffect() {
  yield takeLatest(getLegalEntityGroup, getLegalEntityGroupWorker);
}

interface Payload {
  id: number;
  offset?: number;
  limit?: number;
  name?: string;
  inn?: string;
}

/** Получение списка ЮЛ, которых можно добавить в группу */
function* getLegalEntityGroupWorker({ payload }: { payload: Payload }) {
  try {
    const { id, offset, limit, name, inn } = payload;
    const legalEntityInfo = yield ContractorApiServices.getLegalEntityGroup({
      id,
      inverseJoin: true,
      offset,
      limit,
      name,
      inn
    });
    yield put(setLegalEntityGroup(legalEntityInfo));
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}
