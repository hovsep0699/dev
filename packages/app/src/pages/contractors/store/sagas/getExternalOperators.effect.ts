import { takeLatest, put } from 'redux-saga/effects';

import { getExternalOperators, setExternalOperators } from '../actions';
import { Flash } from '../../../../common/flash/Flash';
import { ContractorApiServices } from '../../services/contractors.api';

export function* getExternalOperatorsEffect() {
  yield takeLatest(getExternalOperators, getExternalOperatorsWorker);
}

/** Получение списка внешних операторов */
function* getExternalOperatorsWorker() {
  try {
    const externalOperators = yield ContractorApiServices.getExternalOperators();
    yield put(setExternalOperators({ externalOperators }));
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}
