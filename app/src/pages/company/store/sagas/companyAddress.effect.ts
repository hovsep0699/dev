import { takeLatest, put } from 'redux-saga/effects';
import SecurityService from '@distate/core/dist/application/security/SecurityService';
import { Flash } from '../../../../common/flash/Flash';
import { setAddress, clearErrors, setAddressErrors } from '../actions';
import { setHasRoleIncomplete } from '../../../../container/sign/store/actions';

import CompanyGateway from '@distate/core/dist/application/company/CompanyGateway';

/** Реквизиты компании */
export function* companyAddressEffect() {
  yield takeLatest(setAddress, setAddressWorker);
}

/** установка реквизитов */
function* setAddressWorker({ payload }: { payload: any }) {
  try {
    const {
      postalCode,
      region,
      district,
      city,
      settlement,
      street,
      house,
      building,
      room
    } = payload;

    const formData = new FormData();
    postalCode && formData.set('postalCode', postalCode);
    region?.value && formData.set('region', region.value);
    district && formData.set('district', district);
    city && formData.set('city', city);
    settlement && formData.set('settlement', settlement);
    street && formData.set('street', street);
    house && formData.set('house', house);
    building && formData.set('building', building);
    room && formData.set('room', room);
    formData.set('country', '172');

    const companyGateway = new CompanyGateway();

    yield companyGateway.setCompanyAddress(formData);

    yield put(clearErrors({}));
    yield Flash.success('Данные сохранены');
    /** проверка и обновление роли */
    yield SecurityService.update(() => true);
    const hasRoleIncomplete = yield SecurityService.hasRole('ROLE_INCOMPLETE');
    yield put(setHasRoleIncomplete({ hasRoleIncomplete }));
  } catch ({ request }) {
    const response = yield JSON.parse(request?.response);
    yield put(setAddressErrors(response));
    yield Flash.error('Возникла ошибка');
  }
}
