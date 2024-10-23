import { createAction } from 'redux-actions';

import {
  SEARCH_PERSON_CONTRACTORS,
  SEARCH_COMPANY_CONTRACTORS,
  SET_FOUND_PERSON_CONTRACTORS,
  SET_FOUND_COMPANY_CONTRACTORS,
  SET_FOUND_ERRORS,
  GET_INVITE_YOU_CONTRACTORS,
  GET_WAITING_ANSWER_CONTRACTORS,
  GET_LEGAL_ENTITY_CONTRACTORS,
  GET_NATURAL_ENTITY_CONTRACTORS,
  SET_INVITE_YOU_CONTRACTORS,
  SET_WAITING_ANSWER_CONTRACTORS,
  SET_LEGAL_ENTITY_CONTRACTORS,
  SET_NATURAL_ENTITY_CONTRACTORS,
  GET_OPERATORS,
  SET_OPERATORS,
  BLOCKING_CONTRACTOR,
  INVITATION_DECISION,
  CLEAR_SEARCH_CONTRACTORS,
  GET_CONTRACTORS_GROUP,
  SET_CONTRACTORS_GROUP,
  SET_CONTRACTORS_PAGINATION_GROUP,
  CHANGE_CONTRACTORS_GROUP_TITLE,
  GET_GROUP_CONTRACTORS_INFO,
  SET_GROUP_CONTRACTORS_INFO,
  GET_ADDED_GROUP_CONTRACTORS_INFO,
  SET_ADDED_GROUP_CONTRACTORS_INFO,
  ADD_TO_GROUP,
  REMOVE_FROM_GROUP,
  ADD_EMPLOYEE_TO_GROUP,
  REMOVE_EMPLOYEE_FROM_GROUP,
  NEW_GROUP_CREATE,
  REMOVE_GROUP,
  SET_ADDED_GROUP_LEGAL_ENTITY,
  SET_ADDED_GROUP_NATURAL_ENTITY,
  SET_ADDED_GROUP_EMPLOYEE,
  GET_ADDED_GROUP_LEGAL_ENTITY,
  GET_ADDED_GROUP_NATURAL_ENTITY,
  GET_ADDED_GROUP_EMPLOYEE,
  ADD_LEGAL_ENTITY_TO_GROUP,
  ADD_NATURAL_ENTITY_TO_GROUP,
  GET_LEGAL_ENTITY_GROUP,
  GET_NATURAL_ENTITY_GROUP,
  GET_EMPLOYEE_GROUP,
  SET_LEGAL_ENTITY_GROUP,
  SET_NATURAL_ENTITY_GROUP,
  SET_EMPLOYEE_GROUP,
  GET_FOUND_PERSON,
  GET_FOUND_LOCAL_COMPANY,
  GET_FOUND_LOCAL_ROAMING_COMPANY,
  CREATE_PERSON_INVITATION,
  CREATE_LOCAL_COMPANY_INVITATION,
  CREATE_ROAMING_COMPANY_INVITATION,
  CREATE_LOCAL_ROAMING_COMPANY_INVITATION,
  CREATE_HUB1C_COMPANY_INVITATION,
  GET_EXTERNAL_OPERATORS,
  SET_EXTERNAL_OPERATORS,
  GET_CONTRACTOR_GROUPS,
  SET_CONTRACTOR_GROUPS,
  DELETE_CONTRACTOR_GROUP,
  GET_NO_CONTRACTOR_GROUPS,
  SET_NO_CONTRACTOR_GROUPS,
  ADD_CONTRACTOR_TO_GROUP,
  GET_PERSON_INFO,
  SET_PERSON_INFO,
  GET_COMPANY_INFO,
  SET_COMPANY_INFO
} from './constants';

/** поиск контрагента ФЛ */
export const searchPersonContractor = createAction(SEARCH_PERSON_CONTRACTORS);
/** поиск контрагента ЮЛ или ИП */
export const searchCompanyContractor = createAction(SEARCH_COMPANY_CONTRACTORS);

/** добавление результата поиска контрагента ФЛ */
export const setFoundPersonContractor = createAction(SET_FOUND_PERSON_CONTRACTORS);
/** добавление результата поиска контрагента ЮЛ и ИП */
export const setFoundCompanyContractor = createAction(SET_FOUND_COMPANY_CONTRACTORS);
/** сохранение ошибок */
export const setFoundErrors = createAction(SET_FOUND_ERRORS);

/** поиск ФЛ */
export const getFoundPerson = createAction(GET_FOUND_PERSON);
/** поиск Локальных ЮЛ */
export const getFoundLocalCompany = createAction(GET_FOUND_LOCAL_COMPANY);
/** поиск в Роуминге ЮЛ */
export const getFoundLocalRoamingCompany = createAction(GET_FOUND_LOCAL_ROAMING_COMPANY);

/** создание запроса на приглашение ФЛ */
export const createPersonInvitation = createAction(CREATE_PERSON_INVITATION);
/** создание запроса на приглашение Локальных ЮЛ */
export const createLocalCompanyInvitation = createAction(CREATE_LOCAL_COMPANY_INVITATION);
/** создание запроса на приглашение ЮЛ в Роуминге */
export const createRoamingCompanyInvitation = createAction(CREATE_ROAMING_COMPANY_INVITATION);
/** создание запроса на приглашение ЮЛ в Локальном Роуминге */
export const createLocalRoamingCompanyInvitation = createAction(
  CREATE_LOCAL_ROAMING_COMPANY_INVITATION
);
/** создание запроса на приглашение ЮЛ в 1С-ЭДО */
export const createHub1cCompanyInvitation = createAction(CREATE_HUB1C_COMPANY_INVITATION);

/** получение списка приглашений - Приглашают вас */
export const getInviteYouContractor = createAction(GET_INVITE_YOU_CONTRACTORS);

/** установить в стейт список приглашений - Приглашают вас */
export const setInviteYouContractors = createAction(SET_INVITE_YOU_CONTRACTORS);

/** получение списка приглашений - Ожидают ответа */
export const getWaitingAnswerContractor = createAction(GET_WAITING_ANSWER_CONTRACTORS);

/** установить в стейт список приглашений - Ожидают ответа */
export const setWaitingAnswerContractors = createAction(SET_WAITING_ANSWER_CONTRACTORS);

/** получение списка контрагентов ЮЛ */
export const getLegalEntityContractors = createAction(GET_LEGAL_ENTITY_CONTRACTORS);

/** установить список контрагентов - ЮЛ */
export const setLegalEntityContractors = createAction(SET_LEGAL_ENTITY_CONTRACTORS);

/** получение списка контрагентов ФЛ */
export const getNaturalEntityContractors = createAction(GET_NATURAL_ENTITY_CONTRACTORS);

/** установить список контрагентов - ЮЛ */
export const setNaturalEntityContractors = createAction(SET_NATURAL_ENTITY_CONTRACTORS);

/** Получение списка операторов */
export const getOperators = createAction(GET_OPERATORS);

/** Установить список операторов */
export const setOperators = createAction(SET_OPERATORS);

/** Заблокировать контрагента */
export const blockingContractor = createAction(BLOCKING_CONTRACTOR);

/** Принятие решения - заблокировать или принять приглашение */
export const invitationDecision = createAction(INVITATION_DECISION);

/** Очистить список найденных контрагентов */
export const clearSearchContractors = createAction(CLEAR_SEARCH_CONTRACTORS);

/** Получить список групп контрагента */
export const getContractorsGroup = createAction(GET_CONTRACTORS_GROUP);

/** Сохранить пагинацию группы контрагента */
export const setContractorsPaginationGroup = createAction(SET_CONTRACTORS_PAGINATION_GROUP);

/** Сохранить список групп контрагента */
export const setContractorsGroup = createAction(SET_CONTRACTORS_GROUP);

/** Изменить название группы */
export const changeContractorsGroupTitle = createAction(CHANGE_CONTRACTORS_GROUP_TITLE);

/** Получение контрагентов в группе - ЮЛ, ФЛ, Сотрудники */
export const getGroupContractorsInfo = createAction(GET_GROUP_CONTRACTORS_INFO);

/** Установить информацию о группе */
export const setGroupContractorsInfo = createAction(SET_GROUP_CONTRACTORS_INFO);

/** Получение контрагентов в группе (уже добавленные) - ЮЛ, ФЛ, Сотрудники */
export const getAddedGroupContractorsInfo = createAction(GET_ADDED_GROUP_CONTRACTORS_INFO);

/** Установить информацию о группе (уже добавленные) */
export const setAddedGroupContractorsInfo = createAction(SET_ADDED_GROUP_CONTRACTORS_INFO);

/** Получить информацию о группе ЮЛ (уже добавленные) */
export const getAddedGroupLegalEntity = createAction(GET_ADDED_GROUP_LEGAL_ENTITY);
/** Получить информацию о группе ФЛ (уже добавленные) */
export const getAddedGroupNaturalEntity = createAction(GET_ADDED_GROUP_NATURAL_ENTITY);
/** Получить информацию о группе сотрудники (уже добавленные) */
export const getAddedGroupEmployee = createAction(GET_ADDED_GROUP_EMPLOYEE);

/** Установить информацию о группе ЮЛ (уже добавленные) */
export const setAddedGroupLegalEntity = createAction(SET_ADDED_GROUP_LEGAL_ENTITY);
/** Установить информацию о группе ФЛ (уже добавленные) */
export const setAddedGroupNaturalEntity = createAction(SET_ADDED_GROUP_NATURAL_ENTITY);
/** Установить информацию о группе сотрудники (уже добавленные) */
export const setAddedGroupEmployee = createAction(SET_ADDED_GROUP_EMPLOYEE);

/** Добавить контрагента в группу*/
export const addToGroup = createAction(ADD_TO_GROUP);

/** Получить ЮЛ которых можно добавить в группу */
export const getLegalEntityGroup = createAction(GET_LEGAL_ENTITY_GROUP);
/** Получить ФЛ которых можно добавить в группу */
export const getNaturalEntityGroup = createAction(GET_NATURAL_ENTITY_GROUP);
/** Получить Сотрудников которых можно добавить в группу */
export const getEmployeeGroup = createAction(GET_EMPLOYEE_GROUP);

/** Установить ЮЛ которых можно добавить в группу */
export const setLegalEntityGroup = createAction(SET_LEGAL_ENTITY_GROUP);
/** Установить ФЛ которых можно добавить в группу */
export const setNaturalEntityGroup = createAction(SET_NATURAL_ENTITY_GROUP);
/** Установить Сотрудников которых можно добавить в группу */
export const setEmployeeGroup = createAction(SET_EMPLOYEE_GROUP);

/** Добавить ЮЛ в группу */
export const addLegalEntityToGroup = createAction(ADD_LEGAL_ENTITY_TO_GROUP);
/** Добавить ФЛ в группу */
export const addNaturalEntityToGroup = createAction(ADD_NATURAL_ENTITY_TO_GROUP);
/** Добавить Сотрудника в группу*/
export const addEmployeeToGroup = createAction(ADD_EMPLOYEE_TO_GROUP);

/** Удаление контрагента из группы */
export const removeFromGroup = createAction(REMOVE_FROM_GROUP);

/** Удаление сотрудника из группы */
export const removeEmployeeFromGroup = createAction(REMOVE_EMPLOYEE_FROM_GROUP);

/** Создание новой группы */
export const newGroupCreate = createAction(NEW_GROUP_CREATE);

/** Удаление группы */
export const removeGroup = createAction(REMOVE_GROUP);

/** Получение внешних операторов */
export const getExternalOperators = createAction(GET_EXTERNAL_OPERATORS);
/** Установить внешних операторов */
export const setExternalOperators = createAction(SET_EXTERNAL_OPERATORS);

/** Получить группы контрагента */
export const getContractorGroups = createAction(GET_CONTRACTOR_GROUPS);
/** Установить группы контрагента */
export const setContractorGroups = createAction(SET_CONTRACTOR_GROUPS);
/** Исключить контрагента из группы */
export const deleteContractorGroup = createAction(DELETE_CONTRACTOR_GROUP);
/** Получить группы в которые еще не добавлен контрагент */
export const getNoContractorGroups = createAction(GET_NO_CONTRACTOR_GROUPS);
/** Установить группы в которые еще не добавлен контрагент */
export const setNoContractorGroups = createAction(SET_NO_CONTRACTOR_GROUPS);
/** Добавить контрагента в группу */
export const addContractorToGroup = createAction(ADD_CONTRACTOR_TO_GROUP);

/** Получить информацию о ФЛ */
export const getPersonInfo = createAction(GET_PERSON_INFO);
/** Установить информацию о ФЛ */
export const setPersonInfo = createAction(SET_PERSON_INFO);
/** Получить информацию о ЮЛ */
export const getCompanyInfo = createAction(GET_COMPANY_INFO);
/** Установить информацию о ЮЛ */
export const setCompanyInfo = createAction(SET_COMPANY_INFO);
