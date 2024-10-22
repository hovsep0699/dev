import { createSelector } from 'reselect';

import { RootState } from '../../../types/store';

const root = (state: RootState) => state.contractors;

export const selectSearch = createSelector(root, state => state.search);

/** список контрагентов приглашающие вас */
export const inviteYou = createSelector(root, state => state.inviteYou);

/** список контрагентов - Ожидают ответа (пригласили вы) */
export const waitingAnswer = createSelector(root, state => state.waitingAnswer);

/** список контрагентов - ЮЛ */
export const legalEntity = createSelector(root, state => state.legalEntity);

/** список контрагентов - ФЛ */
export const naturalEntity = createSelector(root, state => state.naturalEntity);

/** Фильтр для ЮЛ */
export const legalEntityFilter = createSelector(root, state => state.filter);

/** Список групп */
export const group = createSelector(root, state => state.groups);

/** Информация о группе ЮЛ */
export const legalEntityInfo = createSelector(root, state => state.groupInfo.legalEntityInfo);

/** Информация о группе ФЛ */
export const NaturalEntityInfo = createSelector(root, state => state.groupInfo.naturalEntityInfo);

/** Информация о группе Сотрудников */
export const employeeEntityInfo = createSelector(root, state => state.groupInfo.employeeInfo);

/** Информация о группе ЮЛ (добавленные)*/
export const legalEntityInfoAdded = createSelector(
  root,
  state => state.groupInfoAdded.legalEntityInfo
);

/** Информация о группе ФЛ (добавленные) */
export const naturalEntityInfoAdded = createSelector(
  root,
  state => state.groupInfoAdded.naturalEntityInfo
);

/** Информация о группе Сотрудников (добавленные) */
export const employeeEntityInfoAdded = createSelector(
  root,
  state => state.groupInfoAdded.employeeInfo
);

/** внешние операторы */
export const externalOperators = createSelector(root, state => state.externalOperators);

/** информация по выбранному контрагенту */
export const currentContractor = createSelector(root, state => state.currentContractor);
