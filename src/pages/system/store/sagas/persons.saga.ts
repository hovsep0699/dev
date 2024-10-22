import { takeLatest, put } from 'redux-saga/effects';
import SystemGateway from '@distate/core/dist/application/system/SystemGateway';

import { getPersons, setPersons } from '../actions';
import { Flash } from '../../../../common/flash';

export function* personsEffect() {
  yield takeLatest(getPersons, getPersonsWorker);
}

/** получение информации о физ-лицах */
function* getPersonsWorker({ payload }: { payload: {} }) {
  try {
    const systemGateway = new SystemGateway();
    const persons = yield systemGateway.personList(payload);
    yield put(setPersons({ persons }));
  } catch (error) {
    yield Flash.error('Произошла ошибка');
  }
}
