import { takeLatest, put } from 'redux-saga/effects';

import { getLegalEntityContractors, setLegalEntityContractors } from '../actions';
import { Flash } from '../../../../common/flash/Flash';
import { ContractorApiServices } from '../../services/contractors.api';
import { getLegalEntityContractorsPayload } from '../../helpers/contractors.typings';

export function* getLegalEntityEffect() {
  yield takeLatest(getLegalEntityContractors, getLegalEntityWorker);
}

function* getLegalEntityWorker({ payload = {} }: { payload: getLegalEntityContractorsPayload }) {
  try {
    const response = yield ContractorApiServices.getLegalEntityContractors(payload);
    yield put(setLegalEntityContractors({ legalEntity: response }));
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}
