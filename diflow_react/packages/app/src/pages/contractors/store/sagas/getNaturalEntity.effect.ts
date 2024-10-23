import { takeLatest, put } from 'redux-saga/effects';

import { getNaturalEntityContractors, setNaturalEntityContractors } from '../actions';
import { Flash } from '../../../../common/flash/Flash';
import { ContractorApiServices } from '../../services/contractors.api';
import { getNaturalEntityContractorsPayload } from '../../helpers/contractors.typings';

export function* getNaturalEntityEffect() {
  yield takeLatest(getNaturalEntityContractors, getNaturalEntityWorker);
}

function* getNaturalEntityWorker({
  payload = {}
}: {
  payload: getNaturalEntityContractorsPayload;
}) {
  try {
    const naturalEntity = yield ContractorApiServices.getNaturalEntityContractors(payload);
    yield put(setNaturalEntityContractors({ naturalEntity }));
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}
