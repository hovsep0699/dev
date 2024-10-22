import { takeLatest, put } from 'redux-saga/effects';
import { Flash } from '../../../../common/flash/Flash';
import {
  getNotificationSetting,
  setNotificationSetting,
  changeNotificationSetting
} from '../actions';
import AuthGateway from '@distate/core/dist/application/auth/AuthGateway';
import { cabinetGateway } from '@distate/core/dist/application/cabinet/CabinetGateway';

/** Кабинет */
export function* cabinetNotificationEffect() {
  yield takeLatest(getNotificationSetting, getNotificationSettingWorker);
  yield takeLatest(changeNotificationSetting, changeNotificationSettingWorker);
}

/** получени настроек уведомлений */
function* getNotificationSettingWorker() {
  try {
    const authGateway = new AuthGateway();
    const response = yield authGateway.notificationSettings();

    yield put(setNotificationSetting({ notificationSetting: response }));
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}

/** изменение настроек уведомления */
function* changeNotificationSettingWorker({ payload }: { payload: any }) {
  try {
    yield cabinetGateway.changeNotificationSetting({ collection: [...payload] });
    yield Flash.success('Настройки сохранены');
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}
