import { createSelector } from 'reselect';

import { RootState } from '../../../types/store';

export const root = (state: RootState) => state.finance;

/** признак ВКС */
export const isVksSelector = createSelector(root, state => state.isVks);
/** Название компании */
export const companyNameSelector = createSelector(root, state => state.companyName);
/** баланс */
export const balanceSelector = createSelector(root, state => state.balance);
/** номер лицевого счета */
export const accountNumberSelector = createSelector(root, state => state.accountNumber);
/** информация о текущем тарифе */
export const currentTariffSelector = createSelector(root, state => state.currentTariff);
/** список видов документооборота для тарифа */
export const tariffFlowSelector = createSelector(root, state => state.tariffFlow);

/** количество тарифов */
export const tariffsRecordsTotalSelector = createSelector(
  root,
  state => state.tariffs?.recordsTotal
);
/** список тарифов */
export const tariffsRowsSelector = createSelector(root, state => state.tariffs?.rows);

/** история транзакций */
export const transactionRowsSelector = createSelector(
  root,
  state => state.transactionsHistory?.rows
);
/** количество историй транзакций */
export const transactionsRecordsTotalSelector = createSelector(
  root,
  state => state.transactionsHistory?.recordsTotal
);

/** история тарифов */
export const tariffRowsSelector = createSelector(root, state => state.tariffsHistory?.rows);
/** количество историй тарифов */
export const tariffRecordsTotalSelector = createSelector(
  root,
  state => state.tariffsHistory?.recordsTotal
);

/** информация о просматриваемом тарифе */
export const selectedTariffSelector = createSelector(root, state => state.selectedTariff);
