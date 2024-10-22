import { takeLatest, put } from 'redux-saga/effects';
import { Flash } from '../../../../common/flash/Flash';
import {
  getCompanyDivisions,
  setCompanyDivisions,
  createCompanyDivision,
  setCreateDivisionError,
  updateCompanyDivision,
  getDivisionEmployee,
  setDivisionEmployee,
  getNoDivisionEmployee,
  setNoDivisionEmployee,
  addEmployeeToDivision,
  deleteEmployeeFromDivision,
  deleteDivision,
  doHeadDivision
} from '../actions';
import CompanyGateway from '@distate/core/dist/application/company/CompanyGateway';
import { CompanyApiServices } from '../../services/company.api';
import { CompanyDivision } from '../../helpers/company.typings';

/** Подразделения компании */
export function* companyDivisionsEffect() {
  yield takeLatest(getCompanyDivisions, getCompanyDivisionsWorker);
  yield takeLatest(createCompanyDivision, createCompanyDivisionWorker);
  yield takeLatest(updateCompanyDivision, updateCompanyDivisionWorker);
  yield takeLatest(getDivisionEmployee, getDivisionEmployeeWorker);
  yield takeLatest(getNoDivisionEmployee, getNoDivisionEmployeeWorker);
  yield takeLatest(addEmployeeToDivision, addEmployeeToDivisionWorker);
  yield takeLatest(deleteEmployeeFromDivision, deleteEmployeeFromDivisionWorker);
  yield takeLatest(deleteDivision, deleteDivisionWorker);
  yield takeLatest(doHeadDivision, doHeadDivisionWorker);
}

type GetStaffRoles = {
  props: {};
};
/** получение подразделений компании */
function* getCompanyDivisionsWorker({ payload }: { payload: GetStaffRoles }) {
  try {
    const { props } = payload;
    const companyGateway = new CompanyGateway();
    const roles = yield companyGateway.getCompanyDivisions(props);
    yield put(setCompanyDivisions(roles));
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}

type CreateDivisionPayload = { hide: Function } & CompanyDivision;
/** создание подразделения компании */
function* createCompanyDivisionWorker({ payload }: { payload: CreateDivisionPayload }) {
  try {
    yield CompanyApiServices.createCompanyDivision(payload);
    yield put(getCompanyDivisions({}));
    yield put(setCreateDivisionError({}));
    payload.hide();
  } catch (err) {
    yield put(setCreateDivisionError(err.response.data.messages));
    yield Flash.error(err.response?.data?.messages[0] || 'Возникла ошибка');
  }
}


type UpdateDivisionPayload = { hide: Function, id: number } & CompanyDivision;
/** обновление подразделение компании */
function* updateCompanyDivisionWorker({ payload }: { payload: UpdateDivisionPayload }) {
  try {
    yield CompanyApiServices.updateCompanyDivision(payload);
    yield put(getCompanyDivisions({}));
    yield put(setCreateDivisionError({}));
    yield Flash.success('Изменения успешно сохранены');
  } catch (err) {
    yield put(setCreateDivisionError(err.response.data.messages));
    yield Flash.error(err.response?.data?.messages[0] || 'Возникла ошибка');
  }
}


type GetDivisionEmployee = {
  divisionId: number;
  props: {};
};
/** получить список сотрудников подразделения */
function* getDivisionEmployeeWorker({ payload }: { payload: GetDivisionEmployee }) {
  try {
    const { divisionId, props } = payload;
    const companyGateway = new CompanyGateway();
    const response = yield companyGateway.getDivisionEmployee(divisionId, props);
    yield put(setDivisionEmployee(response));
  } catch (err) {
    yield Flash.error(err.response?.data?.messages[0] || 'Возникла ошибка');
  }
}

type GetNoDivisionEmployee = {
  divisionId: number;
  props: {};
};
/** получить список сотрудников не в подразделении */
function* getNoDivisionEmployeeWorker({ payload }: { payload: GetNoDivisionEmployee }) {
  try {
    const { divisionId, props } = payload;
    const companyGateway = new CompanyGateway();
    const response = yield companyGateway.getDivisionEmployee(divisionId, {...props, inverseJoin: 1});
    yield put(setNoDivisionEmployee(response));
  } catch (err) {
    yield Flash.error(err.response?.data?.messages[0] || 'Возникла ошибка');
  }
}

type AddEmployeeToDivision = {
  divisionId: number;
  employeeId: number;
};
/** добавить сотрудника в подразделение */
function* addEmployeeToDivisionWorker({ payload }: { payload: AddEmployeeToDivision }) {
  try {
    const { divisionId, employeeId } = payload;
    const companyGateway = new CompanyGateway();
    yield companyGateway.addEmployeeToDivision(divisionId, employeeId);
    yield put(getDivisionEmployee({ divisionId }));
    yield put(getNoDivisionEmployee({ divisionId }));
  } catch (err) {
    yield Flash.error(err.response?.data?.messages[0] || 'Возникла ошибка');
  }
}

type DeleteEmployeeFromDivision = {
  divisionId: number;
  employeeId: number;
};
/** удалить сотрудника из подразделения */
function* deleteEmployeeFromDivisionWorker({ payload }: { payload: DeleteEmployeeFromDivision }) {
  try {
    const { divisionId, employeeId } = payload;
    const companyGateway = new CompanyGateway();
    yield companyGateway.deleteEmployeeFromDivision(divisionId, employeeId);
    yield put(getDivisionEmployee({ divisionId }));
    yield put(getNoDivisionEmployee({ divisionId }));
  } catch (err) {
    yield Flash.error(err.response?.data?.messages[0] || 'Возникла ошибка');
  }
}

type DeleteDivision = {
  divisionId: number;
  hide: Function;
};
/** удалить подразделение */
function* deleteDivisionWorker({ payload }: { payload: DeleteDivision }) {
  try {
    const { divisionId, hide } = payload;
    const companyGateway = new CompanyGateway();
    yield companyGateway.deleteDivision(divisionId);
    yield put(getCompanyDivisions({}));
    hide();
  } catch (err) {
    yield Flash.error(err.response?.data?.messages[0] || 'Возникла ошибка');
  }
}

type DoHeadDivision = {
  divisionId: number;
};
  /** назначение подразделения главным */
function* doHeadDivisionWorker({ payload }: { payload: DoHeadDivision }) {
  try {
    const { divisionId } = payload;
    const companyGateway = new CompanyGateway();
    yield companyGateway.doHeadDivision(divisionId);
    yield Flash.success('Подразделение назначено главным');
  } catch (err) {
    yield Flash.error(err.response?.data?.messages[0] || 'Возникла ошибка');
  }
}