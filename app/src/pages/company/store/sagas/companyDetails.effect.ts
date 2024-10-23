import { takeLatest, put } from 'redux-saga/effects';
import AuthGateway from '@distate/core/dist/application/auth/AuthGateway';
import { Flash } from '../../../../common/flash/Flash';
import {
  getCompanyDetails,
  setCompanyDetails,
  editDetails,
  setDetailErrors,
  clearErrors
} from '../actions';
import { history } from '../../../../App';
import { COMPANY_ADDRESS } from '../../../../common/Url';
import CompanyGateway from '@distate/core/dist/application/company/CompanyGateway';

/** Реквизиты компании */
export function* companyDetailsEffect() {
  yield takeLatest(getCompanyDetails, getCompanyDetailsWorker);
  yield takeLatest(editDetails, editDetailsWorker);
}

/** получение реквизитов компании */
function* getCompanyDetailsWorker() {
  try {
    const authGateway = new AuthGateway();
    const details = yield authGateway.currentCompany();
    yield put(setCompanyDetails(details));
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}

/** редактирование реквизитов */
function* editDetailsWorker({ payload }: { payload: any }) {
  try {
    const { hasIncopleteRole, ...props } = payload;
    const { okpo, accountNumber, bik, kpp, taxAuthority } = props;

    const companyGateway = new CompanyGateway();
    const formData = new FormData();

    accountNumber && formData.set('accountNumber', accountNumber);
    bik && formData.set('bik', bik);
    okpo && formData.set('division[classificationNumber]', okpo);
    taxAuthority && formData.set('taxAuthority', taxAuthority);
    kpp && formData.set('division[kpp]', kpp);

    yield companyGateway.setCompanyDetails(formData);
    yield put(getCompanyDetails());

    yield put(clearErrors());
    yield Flash.success('Данные сохранены');
    /** редирект если это первое заполнение данные при регистрации */
    yield hasIncopleteRole && history.push(COMPANY_ADDRESS);
  } catch (err) {
    const { request } = err;
    const response = yield request && JSON.parse(request.response);
    yield put(setDetailErrors(response));
    yield Flash.error('Возникла ошибка');
  }
}
