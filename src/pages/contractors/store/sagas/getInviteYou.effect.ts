import { takeLatest, put } from 'redux-saga/effects';

import { getInviteYouContractor, setInviteYouContractors } from '../actions';
import { Flash } from '../../../../common/flash/Flash';
import { ContractorApiServices } from '../../services/contractors.api';

export function* getInviteYouEffect() {
  yield takeLatest(getInviteYouContractor, getInviteYouWorker);
}

type Payload = {
  offset?: number;
  limit?: number;
  name?: string;
  surname?: string;
  patronymic?: string;
  inn?: string;
};

function* getInviteYouWorker({ payload }: { payload: Payload }) {
  try {
    const response = yield ContractorApiServices.getInvitationIncome(payload);
    yield put(setInviteYouContractors({ inviteYou: { ...response, searchParams: payload } }));
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}
