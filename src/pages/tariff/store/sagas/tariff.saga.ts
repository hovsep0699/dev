import { takeLatest, put } from 'redux-saga/effects';
import { financeGateway } from '@distate/core/dist/application/finance/FinanceGateway';

import {
  getActiveTariffs,
  setActiveTariffs,
  getArchivedTariffs,
  setArchivedTariffs,
  getTariff,
  setTariff,
  getSelectedTariffFlow,
  setSelectedTariffFlow,
  getTariffTypes,
  setTariffTypes,
  getTariffStatuses,
  setTariffStatuses,
  editTariff,
  updateTariffFlow,
  createTariff,
  setViewTariffId,
  setIsOpenTariffCreate,
  setIsOpenTariffCard,
  setTariffErrors,
  setIsTariffEditing,
  setTariffStatus
} from '../actions';
import { Flash } from '../../../../common/flash';

export function* tariffEffect() {
  yield takeLatest(getActiveTariffs, getActiveTariffsWorker);
  yield takeLatest(getArchivedTariffs, getArchivedTariffsWorker);
  yield takeLatest(getTariff, getTariffWorker);
  yield takeLatest(getSelectedTariffFlow, getSelectedTariffFlowWorker);
  yield takeLatest(getTariffTypes, getTariffTypesWorker);
  yield takeLatest(getTariffStatuses, getTariffStatusesWorker);
  yield takeLatest(editTariff, editTariffWorker);
  yield takeLatest(updateTariffFlow, updateTariffFlowWorker);
  yield takeLatest(setTariffStatus, setTariffStatusWorker);
  yield takeLatest(createTariff, createTariffWorker);
}

/** получение активных тарифов */
function* getActiveTariffsWorker({ payload }: any) {
  try {
    const activeTariffs = yield financeGateway.getTariffs({
      ...payload,
      notStatusSystemName: 'archive'
    });
    yield put(setActiveTariffs({ activeTariffs }));
  } catch (error) {
    yield Flash.error('Произошла ошибка');
  }
}

/** получение архивированнх тарифов */
function* getArchivedTariffsWorker({ payload }: any) {
  try {
    const archivedTariffs = yield financeGateway.getTariffs({
      ...payload,
      statusSystemName: 'archive'
    });
    yield put(setArchivedTariffs({ archivedTariffs }));
  } catch (error) {
    yield Flash.error('Произошла ошибка');
  }
}

/** получение тарифа */
function* getTariffWorker({ payload }: { payload: number }) {
  try {
    const currentTariff = yield financeGateway.getTariff(payload);
    yield put(setTariff({ currentTariff }));
  } catch (error) {
    yield Flash.error('Произошла ошибка');
  }
}

/** получение документооборота тарифа */
function* getSelectedTariffFlowWorker({ payload }: { payload: number }) {
  try {
    const selectedTariffFlow = yield financeGateway.getTariffFlow(payload);
    yield put(setSelectedTariffFlow({ selectedTariffFlow }));
  } catch (error) {
    yield Flash.error('Произошла ошибка');
  }
}

/** получение типов тарифов */
function* getTariffTypesWorker() {
  try {
    const tariffTypes = yield financeGateway.getTariffTypes();
    yield put(setTariffTypes({ tariffTypes: tariffTypes.rows }));
  } catch (error) {
    yield Flash.error('Произошла ошибка');
  }
}

/** получение статусов тарифов */
function* getTariffStatusesWorker() {
  try {
    const tariffStatuses = yield financeGateway.getTariffStatuses();
    yield put(setTariffStatuses({ tariffStatuses: tariffStatuses.rows }));
  } catch (error) {
    yield Flash.error('Произошла ошибка');
  }
}

type EditTariffPayload = {
  id: number;
  formData: {};
};
/** изменение тарифа */
function* editTariffWorker({ payload }: { payload: EditTariffPayload }) {
  try {
    yield put(setTariffErrors({ tariffErrors: undefined }));
    const { id, formData } = payload;

    yield financeGateway.editTariff(id, formData);
    yield put(getTariff(id));
    yield put(getActiveTariffs({ limit: 10 }));
    yield put(setIsTariffEditing({ isTariffEditing: false }));
    yield Flash.success('Изменения сохранены');
  } catch (error) {
    yield put(setTariffErrors({ tariffErrors: error?.response?.data?.messages }));
    yield Flash.error('Произошла ошибка');
  }
}

type UpdateTariffFlowPayload = {
  tariffId: number;
  flowId: number;
  cost: number;
};
/** Обновить данные по виду документооборота для тарифа */
function* updateTariffFlowWorker({ payload }: { payload: UpdateTariffFlowPayload[] }) {
  try {
    for (const item of payload) {
      const formData = new FormData();
      formData.append('cost', item.cost.toString());
      yield financeGateway.updateTariffFlow(item.tariffId, item.flowId, formData);
      yield put(getSelectedTariffFlow(item.tariffId));
    }
  } catch (error) {
    yield Flash.error('Произошла ошибка');
  }
}

type SetTariffStatusType = {
  tariffId: number;
  statusSystemName: string;
};
/** изменить статус тарифа */
function* setTariffStatusWorker({ payload }: { payload: SetTariffStatusType }) {
  try {
    const { tariffId, statusSystemName } = payload;
    yield financeGateway.setTariffStatus(tariffId, statusSystemName);
    yield put(getTariff(tariffId));
    yield put(getActiveTariffs({ limit: 10 }));
    yield put(getArchivedTariffs({ limit: 10 }));
  } catch (error) {
    yield Flash.error('Произошла ошибка');
  }
}

/** создать тариф */
function* createTariffWorker({ payload }: { payload: any }) {
  try {
    yield put(setTariffErrors({ tariffErrors: undefined }));

    const response = yield financeGateway.createTariff(payload);
    yield put(getActiveTariffs({ limit: 10 }));
    yield put(setViewTariffId({ viewTariffId: response.data.id }));
    yield put(setIsOpenTariffCreate({ isOpenTariffCreate: false }));
    yield put(setIsOpenTariffCard({ isOpenTariffCard: true }));
  } catch (error) {
    yield put(setTariffErrors({ tariffErrors: error?.response?.data?.messages }));
    yield Flash.error('Произошла ошибка');
  }
}
