import { handleActions } from 'redux-actions';
import { DefaultState } from '../helpers/typings';
import * as CONST from './constants';

export const defaultState: DefaultState = {
  currentTariff: {},
  isTariffEditing: false
};

export const reducer = handleActions(
  {
    /** установить активные тарифы */
    [CONST.SET_ACTIVE_TARIFFS]: (state, { payload: { activeTariffs } }) => ({
      ...state,
      activeTariffs
    }),

    /** установить архивированные тарифы */
    [CONST.SET_ARCHIVED_TARIFFS]: (state, { payload: { archivedTariffs } }) => ({
      ...state,
      archivedTariffs
    }),

    /** установить текущего пользователя */
    [CONST.SET_TARIFF]: (state, { payload: { currentTariff } }) => ({
      ...state,
      currentTariff
    }),

    /** установить документооборот тарифа */
    [CONST.SET_SELECTED_TARIFF_FLOW]: (state, { payload: { selectedTariffFlow } }) => ({
      ...state,
      selectedTariffFlow
    }),

    /** установить типы тарифов */
    [CONST.SET_TARIFF_TYPES]: (state, { payload: { tariffTypes } }) => ({
      ...state,
      tariffTypes
    }),

    /** установить статусы тарифов */
    [CONST.SET_TARIFF_STATUSES]: (state, { payload: { tariffStatuses } }) => ({
      ...state,
      tariffStatuses
    }),

    /** установить id просматриваемого тарифа */
    [CONST.SET_VIEW_TARIFF_ID]: (state, { payload: { viewTariffId } }) => ({
      ...state,
      viewTariffId
    }),

    /** установить флаг открытого окна создания тарифа */
    [CONST.SET_IS_OPEN_TARIFF_CREATE]: (state, { payload: { isOpenTariffCreate } }) => ({
      ...state,
      isOpenTariffCreate
    }),

    /** установить флаг открытого окна карточки тарифа */
    [CONST.SET_IS_OPEN_TARIFF_CARD]: (state, { payload: { isOpenTariffCard } }) => ({
      ...state,
      isOpenTariffCard
    }),

    /** установить ошибки создания тарифа */
    [CONST.SET_TARIFF_ERRORS]: (state, { payload: { tariffErrors } }) => ({
      ...state,
      tariffErrors
    }),

    /** установить флаг редактирвоания тарифа */
    [CONST.SET_IS_TARIFF_EDITING]: (state, { payload: { isTariffEditing } }) => ({
      ...state,
      isTariffEditing
    })
  },
  defaultState
);
