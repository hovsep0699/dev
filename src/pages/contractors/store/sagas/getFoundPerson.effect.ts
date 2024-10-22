import { takeLatest, call, put } from 'redux-saga/effects';

import { getFoundPerson, setFoundPersonContractor } from '../actions';
import { ContractorApiServices } from '../../services/contractors.api';
import { Flash } from '../../../../common/flash/Flash';

export function* getFoundPersonEffect() {
  yield takeLatest(getFoundPerson, getFoundPersonWorker);
}

type Payload = {
  name?: string;
  surname?: string;
  patronymic?: string;
  socialNumber?: string;
  offset?: number;
  limit?: number;
};

function* getFoundPersonWorker({ payload }: { payload: Payload }) {
  try {
    const { name, surname, patronymic, socialNumber, offset, limit } = payload;
    const person = yield call(ContractorApiServices.searchNaturalEntity, {
      name,
      surname,
      patronymic,
      socialNumber,
      offset,
      limit
    });
    yield put(
      setFoundPersonContractor({
        search: { person: { ...person, offset, searchParams: payload } }
      })
    );
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}
