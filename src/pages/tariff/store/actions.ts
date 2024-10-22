import { createAction } from 'redux-actions';

import * as CONST from './constants';

/** получить активные тарифы */
export const getActiveTariffs = createAction(CONST.GET_ACTIVE_TARIFFS);
/** установить активные тарифы */
export const setActiveTariffs = createAction(CONST.SET_ACTIVE_TARIFFS);
/** получить архивированные тарифы */
export const getArchivedTariffs = createAction(CONST.GET_ARCHIVED_TARIFFS);
/** установить архивированные тарифы */
export const setArchivedTariffs = createAction(CONST.SET_ARCHIVED_TARIFFS);

/** получить информацию о тарифе */
export const getTariff = createAction(CONST.GET_TARIFF);
/** установить информацию о тарифе */
export const setTariff = createAction(CONST.SET_TARIFF);

/** получить flow тарифа */
export const getSelectedTariffFlow = createAction(CONST.GET_SELECTED_TARIFF_FLOW);
/** установить flow тарифа */
export const setSelectedTariffFlow = createAction(CONST.SET_SELECTED_TARIFF_FLOW);

/** получить типы тарифов*/
export const getTariffTypes = createAction(CONST.GET_TARIFF_TYPES);
/** установить информацию о тарифе */
export const setTariffTypes = createAction(CONST.SET_TARIFF_TYPES);

/** получить статусы тарифов */
export const getTariffStatuses = createAction(CONST.GET_TARIFF_STATUSES);
/** установить статусы тарифов */
export const setTariffStatuses = createAction(CONST.SET_TARIFF_STATUSES);

/** изменить тарф  */
export const editTariff = createAction(CONST.EDIT_TARIFF);
/** обновить данные по виду документооборота для тарифа */
export const updateTariffFlow = createAction(CONST.UPDATE_TARIFF_FLOW);
/** установить статус тарифа */
export const setTariffStatus = createAction(CONST.SET_TARIFF_STATUS);
/** создать тариф */
export const createTariff = createAction(CONST.CREATE_TARIFF);

/** установить id просматриваемого тарифа */
export const setViewTariffId = createAction(CONST.SET_VIEW_TARIFF_ID);
/** установить флаг открытого окна создания тарифа */
export const setIsOpenTariffCreate = createAction(CONST.SET_IS_OPEN_TARIFF_CREATE);
/** установить флаг открытого окна карточки тарифа */
export const setIsOpenTariffCard = createAction(CONST.SET_IS_OPEN_TARIFF_CARD);

/** установить ошибки тарифа */
export const setTariffErrors = createAction(CONST.SET_TARIFF_ERRORS);

/** установка флага редактирования карточки */
export const setIsTariffEditing = createAction(CONST.SET_IS_TARIFF_EDITING);
