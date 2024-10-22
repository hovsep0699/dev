import { takeLatest, put } from 'redux-saga/effects';
import { SystemService } from '@distate/core/dist/application/system';
import CompanyGateway from '@distate/core/dist/application/company/CompanyGateway';
import AuthGateway from '@distate/core/dist/application/auth/AuthGateway';
import { expandCertificateList } from '@distate/core/dist/application/certificate/CertificateHelper';
import AutocompleteGateway from '@distate/core/dist/application/autocomplete/AutocompleteGateway';
import { financeGateway } from '@distate/core/dist/application/finance/FinanceGateway';
import Core from '@distate/core/dist/application/Core';
import cryptoPro from '@distate/core/dist/infrastructure/CryptoPro';

import {
  getCompanies,
  setCompanies,
  getCompanyInfo,
  setCompanyInfo,
  getCompanyEmployee,
  setCompanyEmployee,
  getCertificates,
  setCertificates,
  getTariffs,
  setTariffs,
  companyActivation,
  companyDelete
} from '../actions';
import { Flash } from '../../../../common/flash';

export function* companiesEffect() {
  yield takeLatest(getCompanies, getCompaniesWorker);
  yield takeLatest(getCompanyInfo, getCompanyInfoWorker);
  yield takeLatest(getCompanyEmployee, getCompanyEmployeeWorker);
  yield takeLatest(getCertificates, getCertificatesWorker);
  yield takeLatest(getTariffs, getTariffsWorker);
  yield takeLatest(companyActivation, companyActivationWorker);
  yield takeLatest(companyDelete, companyDeleteWorker);
}

/** получение информации о юр-лицах */
function* getCompaniesWorker({ payload }: any) {
  try {
    const service = new SystemService();
    const companies = yield service.legal(payload);
    yield put(setCompanies({ companies }));
  } catch (error) {
    yield Flash.error('Произошла ошибка');
  }
}

/** получение тарифов */
function* getTariffsWorker() {
  try {
    const tariffs = yield financeGateway.getTariffs({ notStatusSystemName: 'archive' });
    yield put(setTariffs({ tariffs: tariffs.rows }));
  } catch (error) {
    yield Flash.error('Произошла ошибка');
  }
}

/** получение информации о юр-лице */
function* getCompanyInfoWorker({ payload }: { payload: number }) {
  try {
    const companyGateway = new CompanyGateway();
    const autocompleteGateway = new AutocompleteGateway();

    const currentCompany = yield companyGateway.getCompanyJson(payload);

    const { bik } = currentCompany;
    const bankTitleResponse = yield bik && autocompleteGateway.getBankByBIK(bik);
    currentCompany.bankTitle = bik ? bankTitleResponse?.rows?.[0]?.full_title : undefined;

    const tariffResponse = yield financeGateway.getTariffsByCompanyId(payload);
    // текущий тариф тот, у которого to === null
    const currentTariff = tariffResponse?.rows?.find((item: any) => item.to === null);
    const tariffTitle = currentTariff?.tariff_title;
    currentCompany.tariffTitle = tariffTitle;

    yield put(setCompanyInfo({ currentCompany }));
  } catch (error) {
    yield Flash.error('Произошла ошибка');
  }
}

/** получение сотрудников компании */
function* getCompanyEmployeeWorker({ payload }: { payload: number }) {
  try {
    const authGateway = new AuthGateway();
    const employee = yield authGateway.companyEmployees(payload, {});
    yield put(setCompanyEmployee({ employee }));
  } catch (error) {
    yield Flash.error('Произошла ошибка');
  }
}

/** получение сертификата */
function* getCertificatesWorker({ payload }: { payload: number }) {
  try {
    const companyGateway = new CompanyGateway();
    const certificates = yield companyGateway.getEmployeeCertificate(payload, {});

    /** достаем из сертов дополнительную информацию */
    const extendedRows = yield expandCertificateList(certificates.rows);

    yield put(setCertificates({ certificates: extendedRows }));
  } catch (error) {
    yield Flash.error('Произошла ошибка');
  }
}

/** активирование компании */
function* companyActivationWorker({ payload }: { payload: number }) {
  try {
    const thumbprint = Core.certificate.thumbprint;
    const encodedStr = btoa('please give me a sign');

    const signature = yield cryptoPro.signData(encodedStr, thumbprint);

    const formData = new FormData();
    formData.set('company', payload.toString());
    formData.set('signature', signature);

    const companyGateway = new CompanyGateway();
    yield companyGateway.companyActivation(formData);

    yield put(getCompanies());
  } catch (error) {
    yield Flash.error('Произошла ошибка');
  }
}

/** удаление компании */
function* companyDeleteWorker({ payload }: { payload: number }) {
  try {
    const thumbprint = Core.certificate.thumbprint;
    const encodedStr = btoa('please give me a sign');

    const signature = yield cryptoPro.signData(encodedStr, thumbprint);

    const formData = new URLSearchParams();
    formData.set('company', payload.toString());
    formData.set('signature', signature);

    const companyGateway = new CompanyGateway();
    yield companyGateway.companyDelete(formData);

    yield put(getCompanies());
  } catch (error) {
    yield Flash.error('Произошла ошибка');
  }
}
