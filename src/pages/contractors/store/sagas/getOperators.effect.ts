import { takeLatest, put } from 'redux-saga/effects';

import { getOperators, setOperators } from '../actions';
import { Flash } from '../../../../common/flash/Flash';
import { ContractorApiServices } from '../../services/contractors.api';

export function* getOperatorsWatcher() {
  yield takeLatest(getOperators, getOperatorsWorker);
}

function* getOperatorsWorker() {
  try {
    /** получение списка операторов */
    const response = yield ContractorApiServices.getOperators();
    /** занесение в стейт */
    yield put(setOperators({ operators: response.connectors }));
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}
