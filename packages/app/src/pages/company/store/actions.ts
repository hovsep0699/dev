import { createAction } from 'redux-actions';
import {
  GET_COMPANY_DETAILS,
  SET_COMPANY_DETAILS,
  EDIT_DETAILS,
  SET_ADDRESS,
  CLEAR_ERRORS,
  SET_DETAIL_ERRORS,
  SET_ADDRESS_ERRORS,
  SET_CONNECTOR_ERRORS,
  CREATE_CONNECTOR_ACCOUNT,
  GET_CONNECTORS,
  SET_CONNECTORS,
  GET_CONNECTOR,
  SET_CONNECTOR,
  SET_CONNECTOR_STATUS,
  UPDATE_CONNECTOR,
  STOP_CONNECTOR,
  START_CONNECTOR,
  GET_STAFF,
  SET_STAFF,
  GET_STAFF_WAITING,
  SET_STAFF_WAITING,
  GET_STAFF_DEACTIVATED,
  SET_STAFF_DEACTIVATED,
  GET_EMPLOYEE,
  SET_EMPLOYEE,
  GET_EMPLOYEE_ROLES,
  SET_EMPLOYEE_ROLES,
  ADD_ROLE_TO_EMPLOYEE,
  DELETE_ROLE_TO_EMPLOYEE,
  GET_EMPLOYEE_NO_ROLES,
  SET_EMPLOYEE_NO_ROLES,
  GET_EMPLOYEE_CERTIFICATE,
  SET_EMPLOYEE_CERTIFICATE,
  GET_EMPLOYEE_DIVISIONS,
  SET_EMPLOYEE_DIVISIONS,
  CHANGE_EMPLOYEE_DEFAULT_DIVISION,
  CHANGE_CERTIFICATE_ACTIVATION,
  GET_EMPLOYEE_CONTRACTOR_GROUPS,
  SET_EMPLOYEE_CONTRACTOR_GROUPS,
  GET_EMPLOYEE_NO_CONTRACTOR_GROUPS,
  SET_EMPLOYEE_NO_CONTRACTOR_GROUPS,
  ADD_EMPLOYEE_CONTRACTOR_GROUPS,
  DELETE_EMPLOYEE_CONTRACTOR_GROUPS,
  CHANGE_EMPLOYEE_RESPONSIBLE,
  RESET_EMPLOYEE_PASSWORD,
  REJECT_EMPLOYEE,
  ACTIVE_EMPLOYEE,
  DEACTIVATE_EMPLOYEE,
  GET_STAFF_ROLES,
  SET_STAFF_ROLES,
  CREATE_STAFF_ROLE,
  CHANGE_STAFF_ROLE_TITLE,
  GET_STAFF_FOR_ROLE,
  SET_STAFF_FOR_ROLE,
  ADD_STAFF_FOR_ROLE,
  DELETE_STAFF_FOR_ROLE,
  GET_NO_STAFF_FOR_ROLE,
  SET_NO_STAFF_FOR_ROLE,
  GET_DOCUMENT_FLOW_ROLES,
  SET_DOCUMENT_FLOW_ROLES,
  SAVE_DOCUMENT_FLOW_ROLES,
  DELETE_ROLE,
  GET_COMPANY_DIVISIONS,
  SET_COMPANY_DIVISIONS,
  CREATE_COMPANY_DIVISION,
  SET_CREATE_DIVISION_ERROR,
  UPDATE_COMPANY_DIVISION,
  GET_DIVISION_EMPLOYEE,
  SET_DIVISION_EMPLOYEE,
  GET_NO_DIVISION_EMPLOYEE,
  SET_NO_DIVISION_EMPLOYEE,
  ADD_EMPLOYEE_TO_DIVISION,
  DELETE_EMPLOYEE_FROM_DIVISION,
  DELETE_DIVISION,
  DO_HEAD_DIVISION,
  SET_STAFF_FILTER
} from './constants';

/** получение реквизитов компани */
export const getCompanyDetails = createAction(GET_COMPANY_DETAILS);
/** установка реквизитов компани */
export const setCompanyDetails = createAction(SET_COMPANY_DETAILS);
/** редактирование реквизитов компании */
export const editDetails = createAction(EDIT_DETAILS);
/** установка юридический ардес компании */
export const setAddress = createAction(SET_ADDRESS);

/** удаление ошибок раздела "Компания" */
export const clearErrors = createAction(CLEAR_ERRORS);
/** установка ошибок раздела Реквизиты компании */
export const setDetailErrors = createAction(SET_DETAIL_ERRORS);
/** установка ошибок раздела Юридический адрес */
export const setAddressErrors = createAction(SET_ADDRESS_ERRORS);
/** установка ошибок раздела Коннекторы */
export const setConnectorErrors = createAction(SET_CONNECTOR_ERRORS);

/** создание аккаунта коннектора */
export const createConnectorAccount = createAction(CREATE_CONNECTOR_ACCOUNT);

/** Получить список коннекторов */
export const getConnectors = createAction(GET_CONNECTORS);
/** Установить список коннекторов */
export const setConnectors = createAction(SET_CONNECTORS);
/** Получить описание коннектора */
export const getConnector = createAction(GET_CONNECTOR);
/** Установить описание коннектора */
export const setConnector = createAction(SET_CONNECTOR);

/** Установить статус коннектора */
export const setConnectorStatus = createAction(SET_CONNECTOR_STATUS);

/** приостановить аккаунт коннектора */
export const stopConnector = createAction(STOP_CONNECTOR);
/** запустить аккаунт коннектора */
export const startConnector = createAction(START_CONNECTOR);
/** обновить аккаунт коннектора */
export const updateConnector = createAction(UPDATE_CONNECTOR);

/** получить список сотрудников */
export const getStaff = createAction(GET_STAFF);
/** установить список сотрудников */
export const setStaff = createAction(SET_STAFF);
/** получить список сотрудников в заявках на активацию */
export const getStaffWaiting = createAction(GET_STAFF_WAITING);
/** установить список сотрудников в заявках на активацию */
export const setStaffWaiting = createAction(SET_STAFF_WAITING);
/** получить список отключенных сотрудников */
export const getStaffDeactivated = createAction(GET_STAFF_DEACTIVATED);
/** установить список отключенных сотрудников */
export const setStaffDeactivated = createAction(SET_STAFF_DEACTIVATED);
/** получить описание сотрудника */
export const getEmployee = createAction(GET_EMPLOYEE);
/** установить описание сотрудника */
export const setEmployee = createAction(SET_EMPLOYEE);

/** получить список ролей сотрудника */
export const getEmployeeRoles = createAction(GET_EMPLOYEE_ROLES);
/** установить список ролей сотрудника */
export const setEmployeeRoles = createAction(SET_EMPLOYEE_ROLES);
/** получить список ролей которые можно добавить сотруднику */
export const getEmployeeNoRoles = createAction(GET_EMPLOYEE_NO_ROLES);
/** установить список ролей которые можно добавить сотруднику */
export const setEmployeeNoRoles = createAction(SET_EMPLOYEE_NO_ROLES);
/** добавить роль для сотрудника */
export const addRoleToEmployee = createAction(ADD_ROLE_TO_EMPLOYEE);
/** удалить роль у сотрудника */
export const deleteRoleToEmployee = createAction(DELETE_ROLE_TO_EMPLOYEE);
/** получение сертификатов сотрудника */
export const getEmployeeCertificate = createAction(GET_EMPLOYEE_CERTIFICATE);
/** установка сертификатов сотрудника */
export const setEmployeeCertificate = createAction(SET_EMPLOYEE_CERTIFICATE);

/** получить список подразделений */
export const getEmployeeDivisions = createAction(GET_EMPLOYEE_DIVISIONS);
/** установить список подразделений */
export const setEmployeeDivisions = createAction(SET_EMPLOYEE_DIVISIONS);
/** изменение подразделения по умолчанию для сотрудника */
export const changeEmployeeDefaultDivision = createAction(CHANGE_EMPLOYEE_DEFAULT_DIVISION);

/** менение активации сертификата */
export const changeCertificateActivation = createAction(CHANGE_CERTIFICATE_ACTIVATION);

/** получение списка групп контрагентов сотрудника */
export const getEmployeeContractorGroups = createAction(GET_EMPLOYEE_CONTRACTOR_GROUPS);
/** установить список групп контрагентов сотрудника */
export const setEmployeeContractorGroups = createAction(SET_EMPLOYEE_CONTRACTOR_GROUPS);
/** получение списка доступных для добавления групп контрагентов сотрудника */
export const getEmployeeNoContractorGroups = createAction(GET_EMPLOYEE_NO_CONTRACTOR_GROUPS);
/** установить список доступных для добавления групп контрагентов сотрудника */
export const setEmployeeNoContractorGroups = createAction(SET_EMPLOYEE_NO_CONTRACTOR_GROUPS);
/** добавить группу когтрагента сотруднику */
export const addEmployeeContractorGroups = createAction(ADD_EMPLOYEE_CONTRACTOR_GROUPS);
/** удалить группу когтрагента сотруднику */
export const deleteEmployeeContractorGroups = createAction(DELETE_EMPLOYEE_CONTRACTOR_GROUPS);

/** изменение ответственности сотрудника */
export const changeEmployeeResponsible = createAction(CHANGE_EMPLOYEE_RESPONSIBLE);
/** сбросить пароль сотрудника */
export const resetEmployeePassword = createAction(RESET_EMPLOYEE_PASSWORD);

/** отклонить заявку на активацию сотрудника */
export const rejectEmployee = createAction(REJECT_EMPLOYEE);
/** принять заявку на активацию сотрудника */
export const activeEmployee = createAction(ACTIVE_EMPLOYEE);
/** деактивировать сотрудника */
export const deactivateEmployee = createAction(DEACTIVATE_EMPLOYEE);

/** получить роли сотрудников */
export const getStaffRoles = createAction(GET_STAFF_ROLES);
/** установить роли сотрудников */
export const setStaffRoles = createAction(SET_STAFF_ROLES);

/** создать роль сотрудников */
export const createStaffRole = createAction(CREATE_STAFF_ROLE);
/** изменить заголовок роли сотрудника */
export const changeStaffRoleTitle = createAction(CHANGE_STAFF_ROLE_TITLE);
/** получить сотрудников входящих в роль */
export const getStaffForRole = createAction(GET_STAFF_FOR_ROLE);
/** установить сотрудников входящих в роль */
export const setStaffForRole = createAction(SET_STAFF_FOR_ROLE);
/** добавить сотрудника в роль */
export const addStaffForRole = createAction(ADD_STAFF_FOR_ROLE);
/** удалить сотрудника из роли */
export const deleteStaffForRole = createAction(DELETE_STAFF_FOR_ROLE);
/** получить сотрудников, которых можно добавить в роль */
export const getNoStaffForRole = createAction(GET_NO_STAFF_FOR_ROLE);
/** установить сотрудников, которых можно добавить в роль */
export const setNoStaffForRole = createAction(SET_NO_STAFF_FOR_ROLE);

/** получить права документооборота */
export const getDocumentFlowRoles = createAction(GET_DOCUMENT_FLOW_ROLES);
/** установить права документооборота */
export const setDocumentFlowRoles = createAction(SET_DOCUMENT_FLOW_ROLES);
/** сохранить права документооборота */
export const saveDocumentFlowRoles = createAction(SAVE_DOCUMENT_FLOW_ROLES);
/** удалить роль */
export const deleteRole = createAction(DELETE_ROLE);

/** получить подразделения компании */
export const getCompanyDivisions = createAction(GET_COMPANY_DIVISIONS);
/** установить подразделения компании */
export const setCompanyDivisions = createAction(SET_COMPANY_DIVISIONS);
/** создание подразделения компании */
export const createCompanyDivision = createAction(CREATE_COMPANY_DIVISION);
/** установить ошибки создания нового подразделения */
export const setCreateDivisionError = createAction(SET_CREATE_DIVISION_ERROR);
/** обновление подразделения компании */
export const updateCompanyDivision = createAction(UPDATE_COMPANY_DIVISION);

/** получить список сотрудников подразделения */
export const getDivisionEmployee = createAction(GET_DIVISION_EMPLOYEE);
/** установить список сотрудников подразделения */
export const setDivisionEmployee = createAction(SET_DIVISION_EMPLOYEE);
/** получить список сотрудников не в подразделении */
export const getNoDivisionEmployee = createAction(GET_NO_DIVISION_EMPLOYEE);
/** установить список сотрудников не в подразделении */
export const setNoDivisionEmployee = createAction(SET_NO_DIVISION_EMPLOYEE);
/** добавить сотрудника в подразделение */
export const addEmployeeToDivision = createAction(ADD_EMPLOYEE_TO_DIVISION);
/** удалить сотрудника из подразделения */
export const deleteEmployeeFromDivision = createAction(DELETE_EMPLOYEE_FROM_DIVISION);
/** удалить подразделение */
export const deleteDivision = createAction(DELETE_DIVISION);
/** назначение подразделения главным */
export const doHeadDivision = createAction(DO_HEAD_DIVISION);

/** установить фильтр сотрудников */
export const setStaffFilter = createAction(SET_STAFF_FILTER);
