import { createAction } from 'redux-actions';
import {
  GET_FINANCE_INFO,
  SET_FINANCE_INFO,
  CHANGE_BALANCE,
  SET_BILL,
  GET_TARIFFS,
  GET_TARIFF_FLOW,
  CHANGE_TARIFF,
  GET_TRANSACTIONS_HISTORY,
  SET_TRANSACTIONS_HISTORY,
  GET_TARIFFS_BY_COMPANY_ID,
  SET_TARIFFS_BY_COMPANY_ID,
  SET_TARIFF,
  GET_TARIFF,
  GET_TARIFF_CARD
} from './constants';

/** получить информацию по тарифу */
export const getFinanceInfo = createAction(GET_FINANCE_INFO);
/** установить информацию по тарифу */
export const setFinanceInfo = createAction(SET_FINANCE_INFO);
/** изменить баланс */
export const changeBalance = createAction(CHANGE_BALANCE);
/** выстовить счет */
export const setBill = createAction(SET_BILL);
/** получить список тарифов */
export const getTariffs = createAction(GET_TARIFFS);
/** получить документооборот тарифоа */
export const getTariffFlow = createAction(GET_TARIFF_FLOW);
/** изменить тариф */
export const changeTariff = createAction(CHANGE_TARIFF);

/** получить историю транзакций */
export const getTransactionsHistory = createAction(GET_TRANSACTIONS_HISTORY);
/** установить историю транзакций */
export const setTransactionsHistory = createAction(SET_TRANSACTIONS_HISTORY);

/** получить тарифы по ид компании */
export const getTariffsByCompanyId = createAction(GET_TARIFFS_BY_COMPANY_ID);
/** установить тарифы по ид компании */
export const setTariffsByCompanyId = createAction(SET_TARIFFS_BY_COMPANY_ID);

/** получить информацию о тарифе */
export const getTariff = createAction(GET_TARIFF);
/** установить информацию о тарифе */
export const setTariff = createAction(SET_TARIFF);
/** получить информацию для карточки тарифа */
export const getTariffCard = createAction(GET_TARIFF_CARD);
