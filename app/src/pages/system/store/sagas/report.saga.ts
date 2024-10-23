import { takeLatest, call, put } from 'redux-saga/effects';
import { SystemService } from '@distate/core/dist/application/system';

import { getRoamingDocumentsReport, setRoamingDocumentsReport } from '../actions';
import { Flash } from '../../../../common/flash';

export function* reportEffect() {
  yield takeLatest(getRoamingDocumentsReport, getRoamingDocumentsReportWorker);
}

type Report = {
  externalOperatorCode: string;
  fromDate: string;
  tillDate: string;
};
/** создание отчета */
function* getRoamingDocumentsReportWorker({ payload }: { payload: Report }) {
  try {
    const service = new SystemService();
    const { data } = yield call(service.getRoamingDocumentsReport, payload);

    yield put(setRoamingDocumentsReport({ roamingDocumentsReport: data }));
  } catch (error) {
    yield Flash.error('Произошла ошибка');
  }
}
