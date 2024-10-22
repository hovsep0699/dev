import { takeLatest, put } from 'redux-saga/effects';

import { getAddedGroupLegalEntity, setAddedGroupLegalEntity } from '../actions';
import { Flash } from '../../../../common/flash/Flash';
import { ContractorApiServices } from '../../services/contractors.api';

export function* getAddedGroupLegalEntityEffect() {
  yield takeLatest(getAddedGroupLegalEntity, getAddedGroupLegalEntityWorker);
}

interface Payload {
  id: number;
  offset?: number;
  limit?: number;
  name?: string;
  inn?: string;
}

/** получение списка добавленных в группу ЮЛ */
function* getAddedGroupLegalEntityWorker({ payload }: { payload: Payload }) {
  try {
    const { id, offset, limit, name, inn } = payload;
    const response = yield ContractorApiServices.getLegalEntityGroup({
      id,
      offset,
      limit,
      name,
      inn
    });
    yield put(setAddedGroupLegalEntity(response));
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}
