import { takeLatest, call, put } from 'redux-saga/effects';

import {
  createPersonInvitation,
  createLocalCompanyInvitation,
  createRoamingCompanyInvitation,
  createLocalRoamingCompanyInvitation,
  createHub1cCompanyInvitation,
  setFoundErrors,
  invitationDecision,
  getInviteYouContractor
} from '../actions';
import { Flash } from '../../../../common/flash/Flash';
import { ContractorApiServices } from '../../services/contractors.api';
import { DestinationType, InvitationDecision } from '../../helpers/contractors.typings';
import { history } from '../../../../App';
import { CONTRACTOR_WAITING_ANSWER } from '../../../../common/Url';

export function* invitationEffect() {
  yield takeLatest(createPersonInvitation, createPersonInvitationWatcher);
  yield takeLatest(createLocalCompanyInvitation, createLocalCompanyInvitationWatcher);
  yield takeLatest(createRoamingCompanyInvitation, createRoamingCompanyInvitationWatcher);
  yield takeLatest(createLocalRoamingCompanyInvitation, createLocalRoamingCompanyInvitationWatcher);
  yield takeLatest(createHub1cCompanyInvitation, createHub1cCompanyInvitationWatcher);
  yield takeLatest(invitationDecision, invitationDecisionWatcher);
}

type PersonPayload = {
  type: DestinationType;
  personID: number;
};

/** Приглашение ФЛ */
function* createPersonInvitationWatcher({ payload }: { payload: PersonPayload }) {
  try {
    const { type, personID } = payload;
    const response = yield call(ContractorApiServices.createLocalInvitationPerson, {
      type,
      personID
    });
    yield response?.data?.id && history.push(CONTRACTOR_WAITING_ANSWER);
    yield response?.data?.id && Flash.success('Приглашение отправлено');
  } catch (error) {
    if (error.response.status === 500) {
      yield Flash.error('Возникла ошибка');
    }

    if (error.response.status === 400) {
      yield put(setFoundErrors(error.response.data));
    }
  }
}

type LocalCompanyPayload = {
  type: DestinationType;
  companyID: number;
};
/** Приглашение Локального ЮЛ */
function* createLocalCompanyInvitationWatcher({ payload }: { payload: LocalCompanyPayload }) {
  try {
    const { type, companyID } = payload;

    const response = yield call(ContractorApiServices.createLocalInvitationCompany, {
      type,
      companyID
    });
    yield response?.data?.id && history.push(CONTRACTOR_WAITING_ANSWER);
    yield response?.data?.id && Flash.success('Приглашение отправлено');
  } catch (error) {
    if (error.response.status === 500) {
      yield Flash.error('Возникла ошибка');
    }

    if (error.response.status === 400) {
      yield put(setFoundErrors(error.response.data));
    }
  }
}

type RoamingCompanyPayload = {
  type: DestinationType;
  fnsUid: string;
  inn: string;
};
/** Приглашение ЮЛ в Роуминге */
function* createRoamingCompanyInvitationWatcher({ payload }: { payload: RoamingCompanyPayload }) {
  try {
    const { type, fnsUid, inn } = payload;

    const response = yield call(ContractorApiServices.createRoamingInvitationCompany, {
      type,
      fnsUid,
      inn
    });
    yield response?.data?.id && history.push(CONTRACTOR_WAITING_ANSWER);
    yield response?.data?.id && Flash.success('Приглашение отправлено');
  } catch (error) {
    if (error.response.status === 500) {
      yield Flash.error('Возникла ошибка');
    }

    if (error.response.status === 400) {
      yield put(setFoundErrors(error.response.data));
    }
  }
}

type LocalRoamingCompanyPayload = {
  type: DestinationType;
  fnsUid: string;
  networkId: string;
};
/** Приглашение ЮЛ в Локальном Роуминге */
function* createLocalRoamingCompanyInvitationWatcher({
  payload
}: {
  payload: LocalRoamingCompanyPayload;
}) {
  try {
    const { type, fnsUid, networkId } = payload;

    const response = yield call(ContractorApiServices.createLocalRoamingInvitationCompany, {
      type,
      fnsUid,
      networkId
    });
    yield response?.data?.id && history.push(CONTRACTOR_WAITING_ANSWER);
    yield response?.data?.id && Flash.success('Приглашение отправлено');
  } catch (error) {
    if (error.response.status === 500) {
      yield Flash.error('Возникла ошибка');
    }

    if (error.response.status === 400) {
      yield put(setFoundErrors(error.response.data));
    }
  }
}

type Hub1cCompanyPayload = {
  type: DestinationType;
  fnsUid: string;
  inn: string;
};
/** Приглашение ЮЛ в 1С-ЭДО */
function* createHub1cCompanyInvitationWatcher({ payload }: { payload: Hub1cCompanyPayload }) {
  try {
    const { type, fnsUid, inn } = payload;

    const response = yield call(ContractorApiServices.createTaxcomInvitationCompany, {
      type,
      fnsUid,
      inn
    });
    yield response?.data?.id && history.push(CONTRACTOR_WAITING_ANSWER);
    yield response?.data?.id && Flash.success('Приглашение отправлено');
  } catch (error) {
    if (error.response.status === 500) {
      yield Flash.error('Возникла ошибка');
    }

    if (error.response.status === 400) {
      yield put(setFoundErrors(error.response.data));
    }
  }
}

type DecisionPayload = {
  id: number;
  decision: InvitationDecision;
  offset: number;
  searchParams: {};
};
/** Принятие решения (принять приглашение или отклонить) */
function* invitationDecisionWatcher({ payload }: { payload: DecisionPayload }) {
  try {
    const { id, decision, offset, searchParams } = payload;
    /** отправка решения */
    yield ContractorApiServices.invitationDecision(id, decision);
    /** обновление списка */
    yield put(getInviteYouContractor({ ...searchParams, offset }));
  } catch (error) {
    if (error.response.status === 500) {
      yield Flash.error('Возникла ошибка');
    }

    if (error.response.status === 400) {
      yield put(setFoundErrors(error.response.data));
    }
  }
}
