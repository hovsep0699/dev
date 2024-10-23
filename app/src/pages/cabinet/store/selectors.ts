import { createSelector } from 'reselect';

import { RootState } from '../../../types/store';

const root = (state: RootState) => state.cabinet;

/** информация о пользователе */
export const employeeSelector = createSelector(root, state => state.employee);
/** информация об ошибках */
export const employeeErrorsSelector = createSelector(root, state => state.errors);

/** список настроек уведомлений */
export const notificationSettingRowSelector = createSelector(
  root,
  state => state?.notificationSetting?.rows
);

/** список сертификатов */
export const certificatesSelector = createSelector(root, state => state?.certificates?.rows);
/** количество сертификатов */
export const certificatesRecordsTotalSelector = createSelector(
  root,
  state => state?.certificates?.recordsTotal
);
/** отпучатки установленных на комьютер сертификатов */
export const localThumbprintsSelector = createSelector(
  root,
  state => state?.certificates?.localThumbprints
);
