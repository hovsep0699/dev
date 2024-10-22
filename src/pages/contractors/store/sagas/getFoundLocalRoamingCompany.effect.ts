import { takeLatest, call, put } from 'redux-saga/effects';

import { getFoundLocalRoamingCompany, setFoundCompanyContractor } from '../actions';
import { ContractorApiServices } from '../../services/contractors.api';
import { Flash } from '../../../../common/flash/Flash';

export function* getFoundLocalRoamingCompanyEffect() {
  yield takeLatest(getFoundLocalRoamingCompany, getFoundLocalRoamingCompanyWorker);
}

type Payload = {
  inn: string;
  offset: number;
};

function* getFoundLocalRoamingCompanyWorker({ payload }: { payload: Payload }) {
  try {
    const { inn, offset } = payload;
    const localRoamingCompany = yield call(ContractorApiServices.searchLocalRoamingCompany, {
      inn,
      offset
    });
    yield put(
      setFoundCompanyContractor({
        search: {
          localRoamingCompany: {
            ...localRoamingCompany,
            searchParams: { inn }
          }
        }
      })
    );
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}
