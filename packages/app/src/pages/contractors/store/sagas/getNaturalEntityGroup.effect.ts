import { takeLatest, put } from 'redux-saga/effects';

import { getNaturalEntityGroup, setNaturalEntityGroup } from '../actions';
import { Flash } from '../../../../common/flash/Flash';
import { ContractorApiServices } from '../../services/contractors.api';

export function* getNaturalEntityGroupEffect() {
  yield takeLatest(getNaturalEntityGroup, getNaturalEntityGroupWorker);
}

interface Payload {
  id: number;
  offset: number;
  limit: number;
  name: string;
  surname: string;
  patronymic: string;
  socialNumber: string;
}

/** Получение списка ФЛ, которых можно добавить в группу */
function* getNaturalEntityGroupWorker({ payload }: { payload: Payload }) {
  try {
    const { id, offset, limit, name, surname, patronymic, socialNumber } = payload;
    const naturalEntityInfo = yield ContractorApiServices.getNaturalEntityGroup({
      id,
      inverseJoin: true,
      offset,
      limit,
      name,
      surname,
      patronymic,
      socialNumber
    });
    yield put(setNaturalEntityGroup(naturalEntityInfo));
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}
