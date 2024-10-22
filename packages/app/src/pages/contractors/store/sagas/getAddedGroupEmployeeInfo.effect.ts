import { takeLatest, put } from 'redux-saga/effects';

import { getAddedGroupEmployee, setAddedGroupEmployee } from '../actions';
import { Flash } from '../../../../common/flash/Flash';
import { ContractorApiServices } from '../../services/contractors.api';

export function* getAddedGroupInfo() {
  yield takeLatest(getAddedGroupEmployee, getAddedGroupInfoWorker);
}

interface Payload {
  id: number;
  offset?: number;
  limit?: number;
  name?: string;
  surname?: string;
  patronymic?: string;
  position?: string;
}

/** Получение информации о группе контрагентов (уже добавленных) */
function* getAddedGroupInfoWorker({ payload }: { payload: Payload }) {
  try {
    const { id, offset, limit, name, surname, patronymic, position } = payload;
    const employeeInfo = yield ContractorApiServices.getEmployeeGroup({
      id,
      offset,
      limit,
      name,
      surname,
      patronymic,
      position
    });
    yield put(setAddedGroupEmployee(employeeInfo));
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}
