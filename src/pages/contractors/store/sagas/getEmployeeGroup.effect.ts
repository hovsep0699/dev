import { takeLatest, put } from 'redux-saga/effects';

import { getEmployeeGroup, setEmployeeGroup } from '../actions';
import { Flash } from '../../../../common/flash/Flash';
import { ContractorApiServices } from '../../services/contractors.api';

export function* getEmployeeEntityGroupEffect() {
  yield takeLatest(getEmployeeGroup, getEmployeeGroupWorker);
}

interface Payload {
  id: number;
  offset: number;
  limit: number;
  name: string;
  surname: string;
  patronymic: string;
  position: string;
}

/** Получение списка Сотрудников, которых можно добавить в группу */
function* getEmployeeGroupWorker({ payload }: { payload: Payload }) {
  try {
    const { id, offset, limit, name, surname, patronymic, position } = payload;
    const employeeInfo = yield ContractorApiServices.getEmployeeGroup({
      id,
      inverseJoin: true,
      offset,
      limit,
      name,
      surname,
      patronymic,
      position
    });
    yield put(setEmployeeGroup(employeeInfo));
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}
