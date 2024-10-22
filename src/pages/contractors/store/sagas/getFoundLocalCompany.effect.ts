import { takeLatest, call, put } from 'redux-saga/effects';

import { getFoundLocalCompany, setFoundCompanyContractor } from '../actions';
import { ContractorApiServices } from '../../services/contractors.api';
import { Flash } from '../../../../common/flash/Flash';

export function* getFoundCompanyEffect() {
  yield takeLatest(getFoundLocalCompany, getFoundCompanyWorker);
}

type Payload = {
  inn?: string;
  name?: string;
  offset?: number;
  limit?: number;
};

function* getFoundCompanyWorker({ payload }: { payload: Payload }) {
  try {
    const { inn, name, offset } = payload;
    const company = yield call(ContractorApiServices.searchLocalCompany, {
      inn,
      name,
      offset
    });
    yield put(
      setFoundCompanyContractor({
        search: { company: { ...company, offset, searchParams: payload } }
      })
    );
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}
