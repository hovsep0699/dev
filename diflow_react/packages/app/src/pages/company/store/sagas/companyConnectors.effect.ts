import { takeLatest, put } from 'redux-saga/effects';

import { Flash } from '../../../../common/flash/Flash';
import { CreateConnectorAccountProps, ConnectorStatus } from '../../helpers/company.typings';
import {
  createConnectorAccount,
  setConnectorErrors,
  clearErrors,
  getConnectors,
  setConnectors,
  getConnector,
  setConnector,
  stopConnector,
  startConnector,
  updateConnector,
  setConnectorStatus
} from '../actions';
import { ConnectorGateway } from '@distate/core/dist/application/connector/ConnectorGateway';
import AuthGateway from '@distate/core/dist/application/auth/AuthGateway';

/** Коннекторы */
export function* companyConnectorsEffect() {
  yield takeLatest(createConnectorAccount, createConnectorAccountWorker);
  yield takeLatest(getConnectors, getConnectorsWorker);
  yield takeLatest(getConnector, getConnectorWorker);
  yield takeLatest(stopConnector, stopConnectorWorker);
  yield takeLatest(startConnector, startConnectorWorker);
  yield takeLatest(updateConnector, updateConnectorWorker);
}

/** подключение коннектора */
function* createConnectorAccountWorker({ payload }: { payload: CreateConnectorAccountProps }) {
  try {
    const { login, password, position, operatorCode, importFrom, boxId, fnsUid, kpp } = payload;
    const connectorGateway = new ConnectorGateway();
    yield connectorGateway.create({
      credentials: {
        login,
        password
      },
      position,
      operatorCode,
      importFrom,
      boxId,
      fnsUid,
      kpp
    });
    yield put(clearErrors({}));
    yield put(getConnector(operatorCode));
    yield Flash.success('Данные отправлены');
  } catch (err) {
    const { messages } = err;
    yield put(setConnectorErrors(messages));
    yield Flash.error('Возникла ошибка');
  }
}

/** получение списка коннекторов */
function* getConnectorsWorker() {
  try {
    const connectorGateway = new ConnectorGateway();
    const response = yield connectorGateway.operators();
    yield put(setConnectors(response.connectors));
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}

/** получение информации о коннекторе */
function* getConnectorWorker({ payload }: { payload: string }) {
  try {
    const connectorGateway = new ConnectorGateway();
    const { connectors } = yield connectorGateway.operators();
    const currentConnector = connectors.filter((item: any) => item?.operator?.code === payload);
    /** id коннектора */
    const { id } = currentConnector[0];
    const connector = yield connectorGateway.operator(id);
    const authGateway = new AuthGateway();
    /** должность пользователя */
    const res = yield authGateway.currentUser();
    const position = res.employee.position;
    yield put(setConnector({ ...connector, position }));
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}

/** приостановка коннектора */
function* stopConnectorWorker({ payload }: { payload: number }) {
  try {
    const connectorGateway = new ConnectorGateway();
    const success = yield connectorGateway.stop(payload);
    if (success) {
      yield put(setConnectorStatus(ConnectorStatus.stopped));
    }
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}

/** запуск коннектора */
function* startConnectorWorker({ payload }: { payload: number }) {
  try {
    const connectorGateway = new ConnectorGateway();
    const success = yield connectorGateway.start(payload);
    if (success) {
      yield put(setConnectorStatus(ConnectorStatus.connector));
    }
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}

/** обновление коннектора */
function* updateConnectorWorker({ payload }: { payload: { id: number; data?: {} } }) {
  try {
    const { id, data } = payload;
    const connectorGateway = new ConnectorGateway();
    yield connectorGateway.update(id, data);
    yield Flash.success('Данные обновлены');
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}
