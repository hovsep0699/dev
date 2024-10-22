import { takeLatest, call } from 'redux-saga/effects';

import { createPersonInvitation } from '../actions';
import { Flash } from '../../../../common/flash/Flash';
import { ContractorApiServices } from '../../services/contractors.api';
import { DestinationType } from '../../helpers/contractors.typings';

export function* invitationEffect() {
  yield takeLatest(createPersonInvitation, createPersonInvitationWatcher);
}

type Payload = {
  type: DestinationType;
  personID: number;
};

/** ФЛ */
function* createPersonInvitationWatcher({ payload }: { payload: Payload }) {
  try {
    const { type, personID } = payload;
    const response = yield call(ContractorApiServices.createLocalInvitationPerson, {
      type,
      personID
    });
    response?.data?.id && Flash.success('Приглашение отправлено');
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}
