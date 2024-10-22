import { takeLatest, put } from 'redux-saga/effects';

import { getWaitingAnswerContractor, setWaitingAnswerContractors } from '../actions';
import { Flash } from '../../../../common/flash/Flash';
import { ContractorApiServices } from '../../services/contractors.api';

export function* getWaitingAnswerEffect() {
  yield takeLatest(getWaitingAnswerContractor, getWaitingAnswerWorker);
}

type Payload = {
  offset?: number;
  limit?: number;
  name?: string;
  surname?: string;
  patronymic?: string;
  inn?: string;
};

function* getWaitingAnswerWorker({ payload }: { payload: Payload }) {
  try {
    const response = yield ContractorApiServices.getInvitationOutcome(payload);
    yield put(
      setWaitingAnswerContractors({ waitingAnswer: { ...response, searchParams: payload } })
    );
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}
