/** удаление ошибок раздела "Компания" */
export const CLEAR_ERRORS = '[COMPANY] CLEAR ERRORS';
/** установка ошибок раздела Реквизиты компании */
export const SET_DETAIL_ERRORS = '[COMPANY] SET DETAIL ERRORS';
/** установка ошибок раздела Юридический адрес */
export const SET_ADDRESS_ERRORS = '[COMPANY] SET ADDRESS ERRORS';
/** установка ошибок раздела Коннекторы */
export const SET_CONNECTOR_ERRORS = '[COMPANY] SET CONNECTOR ERRORS';

/** получение реквизитов компании */
export const GET_COMPANY_DETAILS = '[COMPANY] GET DETAILS';
/** установка реквизитов компании */
export const SET_COMPANY_DETAILS = '[COMPANY] SET DETAILS';
/** редактирование реквизитов компании */
export const EDIT_DETAILS = '[COMPANY] EDIT DETAILS';
/** установка юридический ардес компании */
export const SET_ADDRESS = '[COMPANY] SET ADDRESS';

/** создание аккаунта коннектора */
export const CREATE_CONNECTOR_ACCOUNT = '[COMPANY] CREATE CONNECTOR ACCOUNT';

/** Получить список коннекторов */
export const GET_CONNECTORS = '[COMPANY] GET CONNECTORS';
/** Установить список коннекторов */
export const SET_CONNECTORS = '[COMPANY] SET CONNECTORS';
/** Получить описание коннектора */
export const GET_CONNECTOR = '[COMPANY] GET CONNECTOR';
/** Установить описание коннектора */
export const SET_CONNECTOR = '[COMPANY] SET CONNECTOR';

/** установить статус коннектора */
export const SET_CONNECTOR_STATUS = '[COMPANY] SET CONNECTOR STATUS';

/** приостановить аккаунт коннектора */
export const STOP_CONNECTOR = '[COMPANY] STOP CONNECTOR';
/** запустить аккаунт коннектора */
export const START_CONNECTOR = '[COMPANY] START CONNECTOR';
/** обновить аккаунт коннектора */
export const UPDATE_CONNECTOR = '[COMPANY] UPDATE CONNECTOR';

/** получить список сотрудников */
export const GET_STAFF = '[COMPANY] GET STAFF';
/** установить список сотрудников */
export const SET_STAFF = '[COMPANY] SET STAFF';
/** получить список сотрудников в заявках на активацию */
export const GET_STAFF_WAITING = '[COMPANY] GET STAFF WAITING';
/** установить список сотрудников в заявках на активацию */
export const SET_STAFF_WAITING = '[COMPANY] SET STAFF WAITING';
/** получить список отключенных сотрудников */
export const GET_STAFF_DEACTIVATED = '[COMPANY] GET STAFF DEACTIVATED';
/** установить список отключенных сотрудников */
export const SET_STAFF_DEACTIVATED = '[COMPANY] SET STAFF DEACTIVATED';
/** получить описание сотрудника */
export const GET_EMPLOYEE = '[COMPANY] GET EMPLOYEE';
/** установить описание сотрудника */
export const SET_EMPLOYEE = '[COMPANY] SET EMPLOYEE';

/** получить список ролей сотрудника */
export const GET_EMPLOYEE_ROLES = '[COMPANY] GET EMPLOYEE ROLES';
/** установить список ролей сотрудника */
export const SET_EMPLOYEE_ROLES = '[COMPANY] SET EMPLOYEE ROLES';
/** получить список ролей которые можно добавить сотруднику */
export const GET_EMPLOYEE_NO_ROLES = '[COMPANY] GET EMPLOYEE NO ROLES';
/** установить список ролей которые можно добавить сотруднику */
export const SET_EMPLOYEE_NO_ROLES = '[COMPANY] SET EMPLOYEE NO ROLES';
/** добавить роль для сотрудника */
export const ADD_ROLE_TO_EMPLOYEE = '[COMPANY] ADD ROLE TO EMPLOYEE';
/** удалить роль у сотрудника */
export const DELETE_ROLE_TO_EMPLOYEE = '[COMPANY] DELETE ROLE TO EMPLOYEE';
/** получение сертификатов сотрудника */
export const GET_EMPLOYEE_CERTIFICATE = '[COMPANY] GET EMPLOYEE CERTIFICATE';
/** установка сертификатов сотрудника */
export const SET_EMPLOYEE_CERTIFICATE = '[COMPANY] SET EMPLOYEE CERTIFICATE';

/** получить список подразделений */
export const GET_EMPLOYEE_DIVISIONS = '[COMPANY] GET EMPLOYEE DIVISIONS';
/** установить список подразделений */
export const SET_EMPLOYEE_DIVISIONS = '[COMPANY] SET EMPLOYEE DIVISIONS';
/** изменение подразделения по умолчанию для сотрудника */
export const CHANGE_EMPLOYEE_DEFAULT_DIVISION = '[COMPANY] CHANGE EMPLOYEE DEFAULT DEVISION';

/** изменение активации сертификата */
export const CHANGE_CERTIFICATE_ACTIVATION = '[COMPANY] CHANGE CERTIFICATE ACTIVATION';

/** получение списка групп контрагентов сотрудника */
export const GET_EMPLOYEE_CONTRACTOR_GROUPS = '[COMPANY] GET EMPLOYEE CONTRACTOR GROUPS';
/** установить список групп контрагентов сотрудника */
export const SET_EMPLOYEE_CONTRACTOR_GROUPS = '[COMPANY] SET EMPLOYEE CONTRACTOR GROUPS';
/** получение списка доступных для добавления групп контрагентов сотрудника */
export const GET_EMPLOYEE_NO_CONTRACTOR_GROUPS = '[COMPANY] GET EMPLOYEE NO CONTRACTOR GROUPS';
/** установить список доступных для добавления групп контрагентов сотрудника */
export const SET_EMPLOYEE_NO_CONTRACTOR_GROUPS = '[COMPANY] SET EMPLOYEE NO CONTRACTOR GROUPS';
/** добавить группу когтрагента сотруднику */
export const ADD_EMPLOYEE_CONTRACTOR_GROUPS = '[COMPANY] ADD EMPLOYEE CONTRACTOR GROUPS';
/** удалить группу когтрагента сотруднику */
export const DELETE_EMPLOYEE_CONTRACTOR_GROUPS = '[COMPANY] DELETE EMPLOYEE CONTRACTOR GROUPS';

/** изменение ответственности сотрудника */
export const CHANGE_EMPLOYEE_RESPONSIBLE = '[COMPANY] CHANGE EMPLOYEE RESPONSIBLE';
/** сбросить пароль сотрудника */
export const RESET_EMPLOYEE_PASSWORD = '[COMPANY] RESET EMPLOYEE PASSWORD';

/** отклонить заявку на активацию сотрудника */
export const REJECT_EMPLOYEE = '[COMPANY] REJECT EMPLOYEE';
/** принять заявку на активацию сотрудника */
export const ACTIVE_EMPLOYEE = '[COMPANY] ACTIVE EMPLOYEE';
/** деактивировать сотрудника */
export const DEACTIVATE_EMPLOYEE = '[COMPANY] DEACTIVATE EMPLOYEE';

/** получить роли сотрудников */
export const GET_STAFF_ROLES = '[COMPANY] GET STAFF ROLES';
/** установить роли сотрудников */
export const SET_STAFF_ROLES = '[COMPANY] SET STAFF ROLES';
/** создать роль сотрудников */
export const CREATE_STAFF_ROLE = '[COMPANY] CREATE STAFF ROLE';
/** изменить заголовок роли сотрудника */
export const CHANGE_STAFF_ROLE_TITLE = '[COMPANY] CHANGE STAFF ROLE TITLE';
/** получить сотрудников входящих в роль */
export const GET_STAFF_FOR_ROLE = '[COMPANY] GET STAFF FOR ROLE';
/** установить сотрудников входящих в роль */
export const SET_STAFF_FOR_ROLE = '[COMPANY] SET STAFF FOR ROLE';
/** добавить сотрудника в роль */
export const ADD_STAFF_FOR_ROLE = '[COMPANY] ADD STAFF FOR ROLE';
/** удалить сотрудника из роли */
export const DELETE_STAFF_FOR_ROLE = '[COMPANY] DELETE STAFF FOR ROLE';
/** получить сотрудников, которых можно добавить в роль */
export const GET_NO_STAFF_FOR_ROLE = '[COMPANY] GET NO STAFF FOR ROLE';
/** установить сотрудников, которых можно добавить в роль */
export const SET_NO_STAFF_FOR_ROLE = '[COMPANY] SET NO STAFF FOR ROLE';

/** получить права документооборота */
export const GET_DOCUMENT_FLOW_ROLES = '[COMPANY] GET DOCUMENT FLOW ROLES';
/** установить права документооборота */
export const SET_DOCUMENT_FLOW_ROLES = '[COMPANY] SET DOCUMENT FLOW ROLES';
/** сохранить права документооборота */
export const SAVE_DOCUMENT_FLOW_ROLES = '[COMPANY] SAVE DOCUMENT FLOW ROLES';
/** удалить роль */
export const DELETE_ROLE = '[COMPANY] DELETE ROLE';

/** получить подразделения компании */
export const GET_COMPANY_DIVISIONS = '[COMPANY] GET COMPANY DIVISIONS';
/** установить подразделения компании */
export const SET_COMPANY_DIVISIONS = '[COMPANY] SET COMPANY DIVISIONS';
/** создание нового подразделения */
export const CREATE_COMPANY_DIVISION = '[COMPANY] CREATE COMPANY DIVISION';
/** установить ошибки создания нового подразделения */
export const SET_CREATE_DIVISION_ERROR = '[COMPANY] GET CREATE DIVISION ERROR';
/** обновление подразделения компании */
export const UPDATE_COMPANY_DIVISION = '[COMPANY] UPDATE COMPANY DIVISION';

/** получить список сотрудников подразделения */
export const GET_DIVISION_EMPLOYEE = '[COMPANY] GET DIVISION EMPLOYEE';
/** установить список сотрудников подразделения */
export const SET_DIVISION_EMPLOYEE = '[COMPANY] SET DIVISION EMPLOYEE';
/** получить список сотрудников не в подразделении */
export const GET_NO_DIVISION_EMPLOYEE = '[COMPANY] GET NO DIVISION EMPLOYEE';
/** установить список сотрудников не в подразделении */
export const SET_NO_DIVISION_EMPLOYEE = '[COMPANY] SET NO DIVISION EMPLOYEE';
/** добавить пользователя в подразделение */
export const ADD_EMPLOYEE_TO_DIVISION = '[COMPANY] ADD EMPLOYEE TO DIVISION';
/** удалить пользователя из подразделения */
export const DELETE_EMPLOYEE_FROM_DIVISION = '[COMPANY] DELETE EMPLOYEE FROM DIVISION';
/** удалить подразделение */
export const DELETE_DIVISION = '[COMPANY] DELETE DIVISION';
/** назначение подразделения главным */
export const DO_HEAD_DIVISION = '[COMPANY] DO HEAD DIVISION';

/** установить фильтр сотрудников */
export const SET_STAFF_FILTER = '[COMPANY] SET STAFF FILTER';
