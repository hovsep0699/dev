/** поиск контрагентов ФЛ */
export const SEARCH_PERSON_CONTRACTORS = '[CONTRACTORS] PERSON SEARCH';

/** поиск контрагентов ЮЛ и ИП */
export const SEARCH_COMPANY_CONTRACTORS = '[CONTRACTORS] COMPANY SEARCH';

/** добавление результата поиска контрагента ФЛ */
export const SET_FOUND_PERSON_CONTRACTORS = '[CONTRACTORS] SET FOUND PERSON CONTRACTORS';
/** добавление результата поиска контрагента ЮЛ и ИП */
export const SET_FOUND_COMPANY_CONTRACTORS = '[CONTRACTORS] SET FOUND COMPANY CONTRACTORS';
/** сохранение ошибок */
export const SET_FOUND_ERRORS = '[CONTRACTORS] SET FOUND ERRORS';

/** поиск ФЛ */
export const GET_FOUND_PERSON = '[CONTRACTORS] GET FOUND PERSON';
/** поиск Локальных ЮЛ */
export const GET_FOUND_LOCAL_COMPANY = '[CONTRACTORS] GET FOUND LOCAL COMPANY';
/** поиск в Роуминге ЮЛ */
export const GET_FOUND_LOCAL_ROAMING_COMPANY = '[CONTRACTORS] GET FOUND LOCAL ROAMING COMPANY';

/** создание запроса на приглашение ФЛ */
export const CREATE_PERSON_INVITATION = '[CONTRACTORS] CREATE PERSON INVITATION';
/** создание запроса на приглашение Локальных ЮЛ */
export const CREATE_LOCAL_COMPANY_INVITATION = '[CONTRACTORS] CREATE LOCAL COMPANY INVITATION';
/** создание запроса на приглашение ЮЛ в Роуминге */
export const CREATE_ROAMING_COMPANY_INVITATION = '[CONTRACTORS] CREATE ROAMING COMPANY INVITATION';
/** создание запроса на приглашение ЮЛ в Локальном Роуминге */
export const CREATE_LOCAL_ROAMING_COMPANY_INVITATION =
  '[CONTRACTORS] CREATE LOCAL ROAMING COMPANY INVITATION';
/** создание запроса на приглашение ЮЛ в 1С-ЭДО */
export const CREATE_HUB1C_COMPANY_INVITATION = '[CONTRACTORS] CREATE HUB1C COMPANY INVITATION';

/** запуск саги поиска контрагентов */
export const SEARCH_CONTRACTOR = '[CONTRACTORS] SEARCH CONTRACTOR';

/** получение списка приглашений - Приглашают вас */
export const GET_INVITE_YOU_CONTRACTORS = '[CONTRACTORS] GET INVITE YOU';

/** установить в стейт список приглашений - Приглашают вас */
export const SET_INVITE_YOU_CONTRACTORS = '[CONTRACTORS] SET INVITE YOU';

/** получение списка приглашений - Ожидают ответа */
export const GET_WAITING_ANSWER_CONTRACTORS = '[CONTRACTORS] GET WAITING ANSWER';

/** установить в стейт список приглашений - Ожидают ответа */
export const SET_WAITING_ANSWER_CONTRACTORS = '[CONTRACTORS] SET WAITING ANSWER';

/** получение списка контрагентов ЮЛ */
export const GET_LEGAL_ENTITY_CONTRACTORS = '[CONTRACTORS] GET LEGAL ENTITY';

/** установить список контрагентов ЮЛ */
export const SET_LEGAL_ENTITY_CONTRACTORS = '[CONTRACTORS] SET LEGAL ENTITY';

/** получение списка контрагентов ФЛ */
export const GET_NATURAL_ENTITY_CONTRACTORS = '[CONTRACTORS] GET NATURAL ENTITY';

/** установить список контрагентов ФЛ */
export const SET_NATURAL_ENTITY_CONTRACTORS = '[CONTRACTORS] SET NATURAL ENTITY';

/** Получение списка операторов */
export const GET_OPERATORS = '[CONTRACTORS] GET OPERATORS';

/** Установить список операторов */
export const SET_OPERATORS = '[CONTRACTORS] SET OPERATORS';

/** Заблокировать контрагента */
export const BLOCKING_CONTRACTOR = '[CONTRACTORS] BLOCKING';

/** Принятие решения - заблокировать или принять приглашение */
export const INVITATION_DECISION = '[CONTRACTORS] INVITATION DECISION';

/** Очистить список найденных контрагентов */
export const CLEAR_SEARCH_CONTRACTORS = '[CONTRACTORS] CLEAR SEARCH';

/** Получить список групп контрагента */
export const GET_CONTRACTORS_GROUP = '[CONTRACTORS] GET GROUP';

/** Сохранить список групп контрагента */
export const SET_CONTRACTORS_GROUP = '[CONTRACTORS] SET GROUP';

/** Сохранить пагинацию группы контрагента */
export const SET_CONTRACTORS_PAGINATION_GROUP = '[CONTRACTORS] SET PAGINATION GROUP';

/** Изменить название группы */
export const CHANGE_CONTRACTORS_GROUP_TITLE = '[CONTRACTORS] CHANGE GROUP TITLE';

/** Получение контрагентов в группе - ЮЛ, ФЛ, Сотрудники */
export const GET_GROUP_CONTRACTORS_INFO = '[CONTRACTORS] GET GROUP INFO';

/** Установить информацию о группе */
export const SET_GROUP_CONTRACTORS_INFO = '[CONTRACTORS] SET GROUP INFO';

/** Получение контрагентов в группе (уже добавленные) - ЮЛ, ФЛ, Сотрудники */
export const GET_ADDED_GROUP_CONTRACTORS_INFO = '[CONTRACTORS] GET ADDED GROUP INFO';

/** Установить информацию о группе (уже добавленные) */
export const SET_ADDED_GROUP_CONTRACTORS_INFO = '[CONTRACTORS] SET ADDED GROUP INFO';

/** Получить информацию о группе ЮЛ (уже добавленные) */
export const GET_ADDED_GROUP_LEGAL_ENTITY = '[CONTRACTORS] GET ADDED GROUP LEGAL ENTITY';
/** Получить информацию о группе ФЛ (уже добавленные) */
export const GET_ADDED_GROUP_NATURAL_ENTITY = '[CONTRACTORS] GET ADDED GROUP NATURAL ENTITY';
/** Получить информацию о группе сотрудники (уже добавленные) */
export const GET_ADDED_GROUP_EMPLOYEE = '[CONTRACTORS] GET ADDED GROUP EMPLOYEE';

/** Установить информацию о группе ЮЛ (уже добавленные) */
export const SET_ADDED_GROUP_LEGAL_ENTITY = '[CONTRACTORS] SET ADDED GROUP LEGAL ENTITY';
/** Установить информацию о группе ФЛ (уже добавленные) */
export const SET_ADDED_GROUP_NATURAL_ENTITY = '[CONTRACTORS] SET ADDED GROUP NATURAL ENTITY';
/** Установить информацию о группе сотрудники (уже добавленные) */
export const SET_ADDED_GROUP_EMPLOYEE = '[CONTRACTORS] SET ADDED GROUP EMPLOYEE';

/** Установить пагинации в группе (уже добавленные) */
// export const SET_ADDED_GROUP_CONTRACTORS_INFO = '[CONTRACTORS] SET ADDED GROUP INFO';

/** Добавить контрагента в группу */
export const ADD_TO_GROUP = '[CONTRACTORS] ADD TO GROUP';

/** Получить ЮЛ которых можно добавить в группу */
export const GET_LEGAL_ENTITY_GROUP = '[CONTRACTORS] GET LEGAL ENTITY GROUP';
/** Получить ФЛ которых можно добавить в группу */
export const GET_NATURAL_ENTITY_GROUP = '[CONTRACTORS] GET NATURAL ENTITY GROUP';
/** Получить Сотрудников которых можно добавить в группу */
export const GET_EMPLOYEE_GROUP = '[CONTRACTORS] GET EMPLOYEE GROUP';

/** Установить ЮЛ которых можно добавить в группу */
export const SET_LEGAL_ENTITY_GROUP = '[CONTRACTORS] SET LEGAL ENTITY GROUP';
/** Установить ФЛ которых можно добавить в группу */
export const SET_NATURAL_ENTITY_GROUP = '[CONTRACTORS] SET NATURAL ENTITY GROUP';
/** Установить Сотрудников которых можно добавить в группу */
export const SET_EMPLOYEE_GROUP = '[CONTRACTORS] SET EMPLOYEE GROUP';

/** Добавить ЮЛ в группу */
export const ADD_LEGAL_ENTITY_TO_GROUP = '[CONTRACTORS] ADD LEGAL ENTITY TO GROUP';
/** Добавить ФЛ в группу */
export const ADD_NATURAL_ENTITY_TO_GROUP = '[CONTRACTORS] ADD NATURAL ENTITY TO GROUP';
/** Добавить Cотрудника в группу */
export const ADD_EMPLOYEE_TO_GROUP = '[CONTRACTORS] ADD EMPLOYEE TO GROUP';

/** Удаление контрагента из группы */
export const REMOVE_FROM_GROUP = '[CONTRACTORS] REMOVE FROM GROUP';

/** Удаление сотрудника из группы */
export const REMOVE_EMPLOYEE_FROM_GROUP = '[CONTRACTORS] REMOVE EMPLOYEE FROM GROUP';

/** Создание новой группы */
export const NEW_GROUP_CREATE = '[CONTRACTORS] NEW GROUP CREATE';

/** Удаление группы */
export const REMOVE_GROUP = '[CONTRACTORS] REMOVE GROUP';

/** Получить список внешних операторов */
export const GET_EXTERNAL_OPERATORS = '[CONTRACTORS] GET EXTERNAL OPERATORS';
/** Устнаовить список внешних операторов */
export const SET_EXTERNAL_OPERATORS = '[CONTRACTORS] SET EXTERNAL OPERATORS';

/** Получить группы контрагента */
export const GET_CONTRACTOR_GROUPS = '[CONTRACTORS] GET CONTRACTOR GROUPS';
/** Установить группы контрагента */
export const SET_CONTRACTOR_GROUPS = '[CONTRACTORS] SET CONTRACTOR GROUPS';
/** Исключить контрагента из группы */
export const DELETE_CONTRACTOR_GROUP = '[CONTRACTORS] DELETE CONTRACTOR GROUP';
/** Получить группы в которые еще не добавлен контрагент */
export const GET_NO_CONTRACTOR_GROUPS = '[CONTRACTORS] GET NO CONTRACTOR GROUPS';
/** Установить группы в которых еще нет контрагента */
export const SET_NO_CONTRACTOR_GROUPS = '[CONTRACTORS] SET NO CONTRACTOR GROUPS';
/** Добавить контрагента в группу */
export const ADD_CONTRACTOR_TO_GROUP = '[CONTRACTORS] ADD CONTRACTOR TO GROUP';

/** Получить информацию о ФЛ */
export const GET_PERSON_INFO = '[CONTRACTORS] GET PERSON INFO';
/** Установить информацию о ФЛ */
export const SET_PERSON_INFO = '[CONTRACTORS] SET PERSON INFO';
/** Получить информацию о ЮЛ */
export const GET_COMPANY_INFO = '[CONTRACTORS] GET COMPANY INFO';
/** Установить информацию о ЮЛ */
export const SET_COMPANY_INFO = '[CONTRACTORS] SET COMPANY INFO';
