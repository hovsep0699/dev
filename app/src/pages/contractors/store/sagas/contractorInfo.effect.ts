import { takeLatest, put } from 'redux-saga/effects';

import { getPersonInfo, setPersonInfo, getCompanyInfo, setCompanyInfo } from '../actions';
import { Flash } from '../../../../common/flash/Flash';
import { ContractorApiServices } from '../../services/contractors.api';

export function* contractorInfoEffect() {
  yield takeLatest(getPersonInfo, getPersonInfoWorker);
  yield takeLatest(getCompanyInfo, getCompanyInfoWorker);
}

/** получение информации о ФЛ */
function* getPersonInfoWorker({ payload }: { payload: number }) {
  try {
    const personInfo = yield ContractorApiServices.getPersonInfo(payload);
    yield put(setPersonInfo({ currentContractor: { person: personInfo } }));
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}

/** получение информации о ЮЛ */
function* getCompanyInfoWorker({ payload }: { payload: number }) {
  try {
    const companyInfo = yield ContractorApiServices.getCompanyInfo(payload);
    yield put(setCompanyInfo({ currentContractor: { company: companyInfo } }));
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}
