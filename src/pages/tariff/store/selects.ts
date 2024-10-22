import { createSelector } from 'reselect';

import { RootState } from '../../../types/store';

const root = (state: RootState) => state.tariff;

/** активные тарифы - массив элементов */
export const activeTariffRowsSelector = createSelector(root, state => state?.activeTariffs?.rows);
/** активные тарифы - кол-во */
export const activeTariffRecordsTotalSelector = createSelector(
  root,
  state => state?.activeTariffs?.recordsTotal
);
/** архивированные тарифы - массив элементов */
export const archivedTariffRowsSelector = createSelector(
  root,
  state => state?.archivedTariffs?.rows
);
/** архивированные тарифы - кол-во */
export const archivedTariffRecordsTotalSelector = createSelector(
  root,
  state => state?.archivedTariffs?.recordsTotal
);
/** текущий тариф */
export const currentTariffSelector = createSelector(root, state => state?.currentTariff);
/** флаг акционный тариф - текущиго тарифа */
export const currentIsPromotionSelector = createSelector(
  currentTariffSelector,
  state => state?.pricing?.isPromotion
);

/** документооборот выбранного тарифа */
export const selectedTariffFlowSelector = createSelector(
  root,
  state => state?.selectedTariffFlow?.rows
);

/** типы тарифов */
export const tariffTypesSelector = createSelector(root, state => state?.tariffTypes);
/** статусы тарифов */
export const tariffStatusesSelector = createSelector(root, state => state?.tariffStatuses);
/** id просматриваемого тарифа */
export const viewTariffIdSelector = createSelector(root, state => state?.viewTariffId);
/** флаг открытого окна создания тарифа */
export const isOpenTariffCreateSelector = createSelector(root, state => state?.isOpenTariffCreate);
/** флаг открытого окна карточки тарифа */
export const isOpenTariffCardSelector = createSelector(root, state => state?.isOpenTariffCard);

/** системное имя статуса тарифа */
export const tariffStatusSystemNameSelector = createSelector(
  root,
  state => state?.currentTariff?.tariff?.status?.systemName
);

/** ошибки тарифа */
export const tariffErrorsSelector = createSelector(root, state => state?.tariffErrors);
/** Ошибка - title */
export const titleErrorsSelector = createSelector(
  root,
  state => state?.tariffErrors?.tariff?.title
);
/** Ошибка - periodicalCost */
export const periodicalCostErrorsSelector = createSelector(
  root,
  state => state?.tariffErrors?.pricing?.periodicalCost
);
/** Ошибка - period */
export const periodErrorsSelector = createSelector(
  root,
  state => state?.tariffErrors?.pricing?.period
);

/** установить флаг редактирвоания тарифа */
export const isTariffEditingSelector = createSelector(root, state => state?.isTariffEditing);
