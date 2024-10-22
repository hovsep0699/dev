import { takeLatest, put } from 'redux-saga/effects';

import { getAddedGroupNaturalEntity, setAddedGroupNaturalEntity } from '../actions';
import { Flash } from '../../../../common/flash/Flash';
import { ContractorApiServices } from '../../services/contractors.api';

export function* getAddedGroupNaturalEntityEffect() {
  yield takeLatest(getAddedGroupNaturalEntity, getAddedGroupNaturalEntityWorker);
}

interface Payload {
  id: number;
  offset?: number;
  limit?: number;
  name?: string;
  surname?: string;
  patronymic?: string;
  socialNumber?: string;
}

/** получение списка добавленных в группу ЮЛ */
function* getAddedGroupNaturalEntityWorker({ payload }: { payload: Payload }) {
  try {
    const { id, offset, limit, name, surname, patronymic, socialNumber } = payload;
    const response = yield ContractorApiServices.getNaturalEntityGroup({
      id,
      offset,
      limit,
      name,
      surname,
      patronymic,
      socialNumber
    });
    yield put(setAddedGroupNaturalEntity(response));
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}
