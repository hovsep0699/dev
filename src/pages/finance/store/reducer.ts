import { handleActions } from 'redux-actions';

import {
  SET_FINANCE_INFO,
  SET_TRANSACTIONS_HISTORY,
  SET_TARIFFS_BY_COMPANY_ID,
  SET_TARIFF
} from './constants';
import { DefaultState } from '../helpers/finance.typings';

export const defaultState: DefaultState = {};

export const reducer = handleActions(
  {
    /** установить информацию по тарифу */
    [SET_FINANCE_INFO]: (state, { payload }) => {
      return {
        ...state,
        ...payload
      };
    },

    /** установка истории транзакций */
    [SET_TRANSACTIONS_HISTORY]: (state, { payload }) => {
      return {
        ...state,
        transactionsHistory: payload.transactionsHistory
      };
    },

    /** становка истории тарифов */
    [SET_TARIFFS_BY_COMPANY_ID]: (state, { payload }) => {
      return {
        ...state,
        tariffsHistory: payload.tariffsHistory
      };
    },

    /** информация о просматриваемом тарифе */
    [SET_TARIFF]: (state, { payload }) => {
      return {
        ...state,
        selectedTariff: payload.selectedTariff
      };
    }
  },
  defaultState
);
