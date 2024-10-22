import { takeLatest, put } from 'redux-saga/effects';
import { Flash } from '../../../../common/flash/Flash';
import {
  getStaff,
  setStaff,
  getStaffDeactivated,
  setStaffDeactivated,
  getStaffWaiting,
  setStaffWaiting,
  getEmployee,
  setEmployee,
  getEmployeeRoles,
  setEmployeeRoles,
  getEmployeeNoRoles,
  setEmployeeNoRoles,
  deleteRoleToEmployee,
  addRoleToEmployee,
  getEmployeeCertificate,
  setEmployeeCertificate,
  getEmployeeDivisions,
  setEmployeeDivisions,
  changeEmployeeDefaultDivision,
  changeCertificateActivation,
  getEmployeeContractorGroups,
  setEmployeeContractorGroups,
  getEmployeeNoContractorGroups,
  setEmployeeNoContractorGroups,
  deleteEmployeeContractorGroups,
  addEmployeeContractorGroups,
  changeEmployeeResponsible,
  resetEmployeePassword,
  rejectEmployee,
  activeEmployee,
  deactivateEmployee,
  setStaffFilter
} from '../actions';
import AuthGateway from '@distate/core/dist/application/auth/AuthGateway';
import CompanyGateway from '@distate/core/dist/application/company/CompanyGateway';
import { expandCertificateList } from '@distate/core/dist/application/certificate/CertificateHelper';

/** Сотрудники компании */
export function* companyStaffEffect() {
  yield takeLatest(getStaff, getStaffWorker);
  yield takeLatest(getEmployee, getEmployeeWorker);
  yield takeLatest(getEmployeeRoles, getEmployeeRolesWorker);
  yield takeLatest(getEmployeeNoRoles, getEmployeeNoRolesWorker);
  yield takeLatest(deleteRoleToEmployee, deleteRoleToEmployeeWorker);
  yield takeLatest(addRoleToEmployee, addRoleToEmployeeWorker);
  yield takeLatest(getEmployeeCertificate, getEmployeeCertificateWorker);
  yield takeLatest(getEmployeeDivisions, getEmployeeDivisionsWorker);
  yield takeLatest(changeEmployeeDefaultDivision, changeEmployeeDefaultDivisionWorker);
  yield takeLatest(changeCertificateActivation, changeCertificateActivationWorker);
  yield takeLatest(getEmployeeContractorGroups, getEmployeeContractorGroupsWorker);
  yield takeLatest(getEmployeeNoContractorGroups, getEmployeeNoContractorGroupsWorker);
  yield takeLatest(deleteEmployeeContractorGroups, deleteEmployeeContractorGroupsWorker);
  yield takeLatest(addEmployeeContractorGroups, addEmployeeContractorGroupsWorker);
  yield takeLatest(changeEmployeeResponsible, changeEmployeeResponsibleWorker);
  yield takeLatest(resetEmployeePassword, resetEmployeePasswordWorker);
  yield takeLatest(rejectEmployee, rejectEmployeeWorker);
  yield takeLatest(activeEmployee, activeEmployeeWorker);
  yield takeLatest(deactivateEmployee, deactivateEmployeeWorker);
  yield takeLatest(getStaffDeactivated, getStaffDeactivatedWorker);
  yield takeLatest(getStaffWaiting, getStaffWaitingWorker);
}

type GetStaffWorker = { payload: { id: any; params: any } };
/** получить список сотрудников */
function* getStaffWorker({ payload }: GetStaffWorker) {
  try {
    const { id, params } = payload;
    yield put(setStaffFilter(params));
    const authGateway = new AuthGateway();
    const response = yield authGateway.companyEmployees(id, params);
    yield put(setStaff(response));
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}

type GetStaffDeactivated = { payload: { id: any; params: any } };
/** получить список отключенных сотрудников */
function* getStaffDeactivatedWorker({ payload }: GetStaffDeactivated) {
  try {
    const { id, params } = payload;
    const authGateway = new AuthGateway();
    const response = yield authGateway.companyEmployees(id, params);
    yield put(setStaffDeactivated(response));
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}

type GetStaffWaiting = { payload: { id: any; params: any } };
/** получить список сотрудников в заявках на активацию */
function* getStaffWaitingWorker({ payload }: GetStaffWaiting) {
  try {
    const { id, params } = payload;
    const authGateway = new AuthGateway();
    const response = yield authGateway.companyEmployees(id, params);
    yield put(setStaffWaiting(response));
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}

/** получение информации о сотруднике */
function* getEmployeeWorker({ payload }: { payload: number }) {
  try {
    const companyGateway = new CompanyGateway();
    const response = yield companyGateway.getEmployee(payload);
    yield put(setEmployee(response));
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}

type GetEmployeeRoles = {
  id: number;
  props: {};
};
/** получение информации о ролях пользователя */
function* getEmployeeRolesWorker({ payload }: { payload: GetEmployeeRoles }) {
  try {
    const { id, props } = payload;
    const companyGateway = new CompanyGateway();
    const response = yield companyGateway.getEmployeeGroup(id, props);
    yield put(setEmployeeRoles(response));
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}

type GetEmployeeNoRoles = {
  id: number;
  props: {};
};
/** получение информации о ролях, которые можно добвить сотруднику */
function* getEmployeeNoRolesWorker({ payload }: { payload: GetEmployeeNoRoles }) {
  try {
    const { id, props } = payload;
    const companyGateway = new CompanyGateway();
    const response = yield companyGateway.getEmployeeNoGroup(id, props);
    yield put(setEmployeeNoRoles(response));
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}

type DeleteRoleToEmployee = {
  groupId: number;
  employeeId: number;
};
/** удаление роли у сотрудника */
function* deleteRoleToEmployeeWorker({ payload }: { payload: DeleteRoleToEmployee }) {
  try {
    const { groupId, employeeId } = payload;
    const companyGateway = new CompanyGateway();
    const response = yield companyGateway.deleteRoleToEmployee(groupId, employeeId);
    yield put(getEmployeeNoRoles({ id: employeeId }));
    yield put(getEmployeeRoles({ id: employeeId }));
    yield response?.data?.message && Flash.success(response.data.message);
  } catch ({ response }) {
    const message = response?.data?.messages[0];
    yield Flash.error(message || 'Возникла ошибка');
  }
}

type AddRoleToEmployee = {
  groupId: number;
  employeeId: number;
};
/** добавление роли сотруднику */
function* addRoleToEmployeeWorker({ payload }: { payload: AddRoleToEmployee }) {
  try {
    const { groupId, employeeId } = payload;
    const companyGateway = new CompanyGateway();
    yield companyGateway.addRoleToEmployee(groupId, employeeId);
    yield put(getEmployeeNoRoles({ id: employeeId }));
    yield put(getEmployeeRoles({ id: employeeId }));
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}

type GetEmployeeCertificate = {
  id: number;
  props: {};
};
/** получение сертификатов сотрудника */
function* getEmployeeCertificateWorker({ payload }: { payload: GetEmployeeCertificate }) {
  try {
    const { id, props = {} } = payload;
    const companyGateway = new CompanyGateway();
    const certificates = yield companyGateway.getEmployeeCertificate(id, props);

    const { rows = [] } = certificates;
    /** добавление должности в параметры */
    const extendedRows = yield expandCertificateList(rows);

    yield put(setEmployeeCertificate({ ...certificates, rows: extendedRows }));
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}

type GetEmployeeDivisions = {
  id: number;
  props: {};
};
/** получение списка подразделений */
function* getEmployeeDivisionsWorker({ payload }: { payload: GetEmployeeDivisions }) {
  try {
    const { id, props = {} } = payload;
    const companyGateway = new CompanyGateway();
    const response = yield companyGateway.getEmployeeDivision(id, props);
    yield put(setEmployeeDivisions(response));
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}

type ChangeEmployeeDefaultDivision = {
  employeeId: number;
  divisionId: number;
};
/** изменение подразделения по умолчанию для сотрудника */
function* changeEmployeeDefaultDivisionWorker({
  payload
}: {
  payload: ChangeEmployeeDefaultDivision;
}) {
  try {
    const { employeeId, divisionId } = payload;
    const companyGateway = new CompanyGateway();
    yield companyGateway.changeEmployeeDefaultDivision(employeeId, divisionId);
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}

type ChangeCertificateActivation = {
  id: number;
  isActive: boolean;
  employeeId: number;
  props: Object;
};
/** изменение активации сертификата */
function* changeCertificateActivationWorker({ payload }: { payload: ChangeCertificateActivation }) {
  try {
    const { id, isActive, employeeId, props } = payload;
    const companyGateway = new CompanyGateway();
    if (isActive) {
      yield companyGateway.deactivateCertivicate(id);
    } else {
      yield companyGateway.activateCertificate(id);
    }
    /** обновления списка сертификатов */
    yield put(getEmployeeCertificate({ id: employeeId, props }));
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}

type GetEmployeeContractors = {
  id: number;
  props: Object;
};
/** получение групп контрагентов пользователя */
function* getEmployeeContractorGroupsWorker({ payload }: { payload: GetEmployeeContractors }) {
  try {
    const { id, props } = payload;
    const companyGateway = new CompanyGateway();
    const response = yield companyGateway.getEmployeeContractorGroups(id, props);
    yield put(setEmployeeContractorGroups(response));
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}

type GetEmployeeNoContractors = {
  id: number;
  props: Object;
};
/** получение групп контрагентов пользователя доступных для добавления */
function* getEmployeeNoContractorGroupsWorker({ payload }: { payload: GetEmployeeNoContractors }) {
  try {
    const { id, props } = payload;
    const companyGateway = new CompanyGateway();
    const response = yield companyGateway.getEmployeeContractorGroups(id, {
      ...props,
      inverseJoin: 1
    });
    yield put(setEmployeeNoContractorGroups(response));
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}

type DeleteEmployeeContractorGroups = {
  groupId: number;
  employeeId: number;
};
/** удаление группы контрагентов сотрудника */
function* deleteEmployeeContractorGroupsWorker({
  payload
}: {
  payload: DeleteEmployeeContractorGroups;
}) {
  try {
    const { groupId, employeeId } = payload;
    const companyGateway = new CompanyGateway();
    yield companyGateway.deleteEmployeeContractorGroup(groupId, employeeId);
    yield put(getEmployeeContractorGroups({ id: employeeId }));
    yield put(getEmployeeNoContractorGroups({ id: employeeId }));
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}

type AddEmployeeContractorGroups = {
  groupId: number;
  employeeId: number;
};
/** добавление группы контрагентов сотрудника */
function* addEmployeeContractorGroupsWorker({ payload }: { payload: AddEmployeeContractorGroups }) {
  try {
    const { groupId, employeeId } = payload;
    const companyGateway = new CompanyGateway();
    yield companyGateway.addEmployeeContractorGroup(groupId, employeeId);
    yield put(getEmployeeContractorGroups({ id: employeeId }));
    yield put(getEmployeeNoContractorGroups({ id: employeeId }));
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}

type ChangeEmployeeResponsible = {
  employeeId: number;
  responsible: boolean;
};
/** изменение ответственности сотрудника */
function* changeEmployeeResponsibleWorker({ payload }: { payload: ChangeEmployeeResponsible }) {
  try {
    const { employeeId, responsible } = payload;
    const companyGateway = new CompanyGateway();
    const isResponsible = responsible ? '0' : '1';
    const formData = new FormData();
    formData.append('isResponsible', isResponsible);

    let response;
    if (responsible) {
      response = yield companyGateway.changeEmployeeResponsible(employeeId, formData);
    } else {
      response = yield companyGateway.changeEmployeeResponsible(employeeId, formData);
    }
    yield Flash.success(response?.data?.message);
    yield put(getEmployee(employeeId));
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}

type ResetEmployeePassword = {
  employeeId: number;
};
/** сбросить пароль сотрудника */
function* resetEmployeePasswordWorker({ payload }: { payload: ResetEmployeePassword }) {
  try {
    const { employeeId } = payload;
    const companyGateway = new CompanyGateway();
    companyGateway.resetEmployeePassword(employeeId);
    yield Flash.success(
      'На почтовый адрес сотрудника выслано письмо с инструкциями и кодом подтверждения'
    );
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}

type RejectEmployee = {
  employeeId: number;
  companyId: number;
  params: {};
};
/** отклонить заявку на активацию сотрудника */
function* rejectEmployeeWorker({ payload }: { payload: RejectEmployee }) {
  try {
    const { employeeId, companyId, params } = payload;
    const companyGateway = new CompanyGateway();
    yield companyGateway.rejectEmployee(employeeId);
    yield put(getStaff({ id: companyId, params }));
    yield put(getStaffWaiting({ id: companyId, params }));
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}

type ActiveEmployee = {
  employeeId: number;
  companyId: number;
  params: {};
};
/** принять заявку на активацию сотрудника */
function* activeEmployeeWorker({ payload }: { payload: ActiveEmployee }) {
  try {
    const { employeeId, companyId, params } = payload;
    const companyGateway = new CompanyGateway();
    companyGateway.activeEmployee(employeeId);
    yield put(getStaff({ id: companyId, params }));
    yield put(getStaffDeactivated({ id: companyId, params }));
    yield put(getStaffWaiting({ id: companyId, params }));
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}

type DeactivateEmployee = {
  employeeId: number;
  companyId: number;
  params: {};
};
/** деактивировать сотрудника */
function* deactivateEmployeeWorker({ payload }: { payload: DeactivateEmployee }) {
  try {
    const { employeeId, companyId, params } = payload;
    const companyGateway = new CompanyGateway();
    companyGateway.deactivateEmployee(employeeId);
    yield put(getStaff({ id: companyId, params }));
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}
