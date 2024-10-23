import { takeLatest, put } from 'redux-saga/effects';
import { financeGateway } from '@distate/core/dist/application/finance/FinanceGateway';
import AuthGateway from '@distate/core/dist/application/auth/AuthGateway';
import CompanyGateway from '@distate/core/dist/application/company/CompanyGateway';

import { Flash } from '../../../../common/flash/Flash';
import {
  getFinanceInfo,
  setFinanceInfo,
  changeBalance,
  setBill,
  getTariffs,
  getTariffFlow,
  changeTariff,
  getTariffsByCompanyId,
  setTariffsByCompanyId,
  getTransactionsHistory,
  setTransactionsHistory,
  getTariffCard,
  setTariff
} from '../actions';
import { history } from '../../../../App';

/** Финансы */
export function* financeEffect() {
  yield takeLatest(getFinanceInfo, getFinanceInfoWorker);
  yield takeLatest(changeBalance, changeBalanceWorker);
  yield takeLatest(setBill, setBillWorker);
  yield takeLatest(getTariffs, getTariffsWorker);
  yield takeLatest(getTariffFlow, getTariffFlowWorker);
  yield takeLatest(changeTariff, changeTariffWorker);
  yield takeLatest(getTariffsByCompanyId, getTariffsByCompanyIdWorker);
  yield takeLatest(getTransactionsHistory, getTransactionsHistoryWorker);
  yield takeLatest(getTariffCard, getTariffCardWorker);
}

function* getFinanceInfoWorker({ payload }: { payload: number }) {
  try {
    const authGateway = new AuthGateway();
    const companyGateway = new CompanyGateway();

    const selectedCompany = yield companyGateway.getCompanyJson(payload);

    const currentUser = yield authGateway.currentUser();
    const balanceResponse = yield financeGateway.getBalance(payload);
    const tariffResponse = yield financeGateway.getTariffsByCompanyId(payload);
    const currentTariff = tariffResponse?.rows?.find((item: any) => item?.next_id === null);
    const currentTariffInfo = yield financeGateway.getTariff(currentTariff?.tariff_id);
    const isPromotion = currentTariffInfo?.pricing?.isPromotion;
    currentTariff.isPromotion = isPromotion;

    const allTariff = yield financeGateway.getTariffs({});
    /** предоплата или постоплата */
    const findedTariff = allTariff?.rows?.find(
      (item: any) => item?.id === currentTariff?.tariff_id
    );

    const tariffBalance = yield financeGateway.getTariffBalance(currentTariff.id);

    const { balance, number: accountNumber } = balanceResponse;
    const isVks = currentUser.roles.includes('ROLE_CNO');
    const companyName = selectedCompany.name;

    const props: {} = {
      isVks,
      companyName,
      balance,
      accountNumber,
      currentTariff,
      isPostpaid: findedTariff?.type_system_name === 'postpaid',
      tariffBalance: tariffBalance?.balance,
      authorized: tariffBalance?.authorized
    };

    yield put(setFinanceInfo(props));
  } catch ({ response }) {
    yield Flash.error(response?.data?.messages[0] || 'Возникла ошибка');
  }
}

type ChangeBalance = {
  id: number;
  sum: number;
  comment: string;
  hide: () => void;
};
/** изменение баланса */
function* changeBalanceWorker({ payload }: { payload: ChangeBalance }) {
  try {
    const { id, sum, comment, hide } = payload;

    const formData = new FormData();
    formData.append('sum', String(sum));
    formData.append('comment', comment);

    yield financeGateway.setBalance(id, formData);
    yield put(getFinanceInfo(id));
    hide();
  } catch ({ response }) {
    yield Flash.error(response?.data?.messages?.sum || 'Возникла ошибка');
  }
}

type SetBill = {
  id: number;
  sum: number;
};
/** выставление счета */
function* setBillWorker({ payload }: { payload: SetBill }) {
  try {
    const { id, sum } = payload;

    const formData = new FormData();
    formData.append('sum', String(sum));

    const { data } = yield financeGateway.setBill(id, formData);
    yield history.push(`/document/${data.id}`);
  } catch ({ response }) {
    yield Flash.error(response?.data?.messages[0] || 'Возникла ошибка');
  }
}

type GetTariffs = {
  offset: number;
  notStatusSystemName: string;
};
/** получение списка тарифов */
function* getTariffsWorker({ payload }: { payload: GetTariffs }) {
  try {
    const tariffs = yield financeGateway.getTariffs(payload);
    yield put(setFinanceInfo({ tariffs }));
  } catch ({ response }) {
    yield Flash.error(response?.data?.messages[0] || 'Возникла ошибка');
  }
}

/** получение документооборот тарифа */
function* getTariffFlowWorker({ payload }: { payload: number }) {
  try {
    const tariffFlow = yield financeGateway.getTariffFlow(payload);
    yield put(setFinanceInfo({ tariffFlow }));
  } catch ({ response }) {
    yield Flash.error(response?.data?.messages[0] || 'Возникла ошибка');
  }
}

type ChangeTariff = {
  id: number;
  tariffId: number;
};
/** изменить тариф */
function* changeTariffWorker({ payload }: { payload: ChangeTariff }) {
  try {
    const { id, tariffId } = payload;
    const formData = new FormData();
    formData.append('tariff', String(tariffId));
    yield financeGateway.changeTariff(id, formData);
    yield put(getFinanceInfo(id));
    yield Flash.success('Настроки сохранены');
  } catch ({ response }) {
    yield Flash.error(response?.data?.messages[0] || 'Возникла ошибка');
  }
}

type GetTariffsByCompanyId = {
  id: number;
  params: number;
};
/** получить историю тарифов по id компании */
function* getTariffsByCompanyIdWorker({ payload }: { payload: GetTariffsByCompanyId }) {
  try {
    const { id, params } = payload;
    const response = yield financeGateway.getTariffsByCompanyId(id, params);
    yield put(setTariffsByCompanyId({ tariffsHistory: response }));
  } catch ({ response }) {
    yield Flash.error(response?.data?.messages[0] || 'Возникла ошибка');
  }
}

type GgetTransactionsHistory = {
  id: number;
  offset?: number;
  type?: string;
  amount?: [{ from?: string }, { to?: string }];
  createdAt?: [{ from?: string }, { to?: string }];
  comment?: string;
};
/** получить историю транзакций */
function* getTransactionsHistoryWorker({ payload }: { payload: GgetTransactionsHistory }) {
  try {
    const { id, ...params } = payload;
    const response = yield financeGateway.getTransactionsHistory(id, params);
    yield put(setTransactionsHistory({ transactionsHistory: response }));
  } catch ({ response }) {
    yield Flash.error(response?.data?.messages[0] || 'Возникла ошибка');
  }
}

/** получить карточку тарифа */
function* getTariffCardWorker({ payload }: { payload: number }) {
  try {
    yield put(getTariffFlow(payload));
    const selectedTariff = yield financeGateway.getTariff(payload);
    yield put(setTariff({ selectedTariff }));
  } catch ({ response }) {
    yield Flash.error('Возникла ошибка');
  }
}
