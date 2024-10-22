import { takeLatest, call, put } from 'redux-saga/effects';
import { SystemService } from '@distate/core/dist/application/system';

import { getLicenseInfo, setLicenseInfo } from '../actions';
import { Flash } from '../../../../common/flash';

export function* licenseEffect() {
  yield takeLatest(getLicenseInfo, getLicenseInfoWorker);
}

/** получение информации о лицензии */
function* getLicenseInfoWorker() {
  try {
    const service = new SystemService();
    const license = yield call(service.getLicenseInfo);

    yield put(setLicenseInfo({ license }));
  } catch (error) {
    yield Flash.error('Произошла ошибка');
  }
}
