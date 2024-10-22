import { takeLatest, put } from 'redux-saga/effects';

import {
  blockingContractor,
  getLegalEntityContractors,
  getNaturalEntityContractors
} from '../actions';
import { Flash } from '../../../../common/flash/Flash';
import { ContractorApiServices } from '../../services/contractors.api';
import { ContractorTypes } from '../../helpers/contractors.typings';

/** Вотчер блокировки контрагента */
export function* blockingEffect() {
  yield takeLatest(blockingContractor, blockingWorker);
}

interface Payload {
  id: number;
  contractorType: ContractorTypes;
}

function* blockingWorker({ payload }: { payload: Payload }) {
  try {
    const { id, contractorType } = payload;
    /** блокирование контрагента */
    yield ContractorApiServices.blockContractor(id);
    /** обновление списка ЮЛ */
    if (contractorType === ContractorTypes.legal_entity) {
      /** если ЮЛ */
      yield put(getLegalEntityContractors({}));
    } else {
      /** если ФЛ */
      yield put(getNaturalEntityContractors({}));
    }
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}
