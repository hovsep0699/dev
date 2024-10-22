import { takeLatest, put } from 'redux-saga/effects';
import { Flash } from '../../../../common/flash/Flash';
import {
  getStaffRoles,
  setStaffRoles,
  changeStaffRoleTitle,
  createStaffRole,
  getStaffForRole,
  setStaffForRole,
  deleteStaffForRole,
  getNoStaffForRole,
  setNoStaffForRole,
  addStaffForRole,
  getDocumentFlowRoles,
  setDocumentFlowRoles,
  saveDocumentFlowRoles,
  deleteRole
} from '../actions';
import CompanyGateway from '@distate/core/dist/application/company/CompanyGateway';
import { CompanyApiServices } from '../../services/company.api';

/** Роли сотрудников */
export function* companyRolesEffect() {
  yield takeLatest(getStaffRoles, getStaffRolesWorker);
  yield takeLatest(changeStaffRoleTitle, changeStaffRoleTitleWorker);
  yield takeLatest(createStaffRole, createStaffRoleWorker);
  yield takeLatest(getStaffForRole, getStaffForRoleWorker);
  yield takeLatest(deleteStaffForRole, deleteStaffForRoleWorker);
  yield takeLatest(getNoStaffForRole, getNoStaffForRoleWorker);
  yield takeLatest(addStaffForRole, addStaffForRoleWorker);
  yield takeLatest(getDocumentFlowRoles, getDocumentFlowRolesWorker);
  yield takeLatest(saveDocumentFlowRoles, saveDocumentFlowRolesWorker);
  yield takeLatest(deleteRole, deleteRoleWorker);
}

type GetStaffRoles = {
  props: {};
};
/** получение ролей сотрудников */
function* getStaffRolesWorker({ payload }: { payload: GetStaffRoles }) {
  try {
    const { props } = payload;
    const companyGateway = new CompanyGateway();
    const roles = yield companyGateway.getStaffRoles(props);
    yield put(setStaffRoles(roles));
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}

type ChangeStaffRoleTitle = {
  id: number;
  title: string;
};
/** изменение заголовка роли */
function* changeStaffRoleTitleWorker({ payload }: { payload: ChangeStaffRoleTitle }) {
  try {
    yield CompanyApiServices.changeStaffRoleTitle(payload);
    yield put(getStaffRoles({}));
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}

type CreateStaffRole = {
  title: string;
};
/** создать роль сотрудника */
function* createStaffRoleWorker({ payload }: { payload: CreateStaffRole }) {
  try {
    yield CompanyApiServices.createStaffRole(payload);
    yield put(getStaffRoles({}));
    yield Flash.success('Роль добавлена');
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}

type GetStaffForRole = {
  id: number;
  props: {};
};
/** получение сотрудников роли */
function* getStaffForRoleWorker({ payload }: { payload: GetStaffForRole }) {
  try {
    const { id, props } = payload;
    const companyGateway = new CompanyGateway();
    const staff = yield companyGateway.getStaffForRole(id, props);
    yield put(setStaffForRole(staff));
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}

type DeleteStaffForRole = {
  groupId: number;
  employeeId: number;
  props: {};
};
/** удаление сотрудника из роли */
function* deleteStaffForRoleWorker({ payload }: { payload: DeleteStaffForRole }) {
  try {
    const { groupId, employeeId, props } = payload;
    const companyGateway = new CompanyGateway();
    yield companyGateway.deleteRoleToEmployee(groupId, employeeId);
    yield put(getStaffForRole({ id: groupId, props }));
    yield put(getNoStaffForRole({ groupId, props }));
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}

type GetNoStaffForRole = {
  groupId: number;
  props: {};
};
/** получение сотрудников, которых можно добавить в роль */
function* getNoStaffForRoleWorker({ payload }: { payload: GetNoStaffForRole }) {
  try {
    const { groupId, props } = payload;
    const companyGateway = new CompanyGateway();
    const staff = yield companyGateway.getStaffForRole(groupId, {
      ...props,
      inverseJoin: 1,
      statusSystemName: 'active'
    });
    yield put(setNoStaffForRole(staff));
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}

type AddStaffForRole = {
  groupId: number;
  employeeId: number;
  props: {};
};
/** добавление сотрудника в роль */
function* addStaffForRoleWorker({ payload }: { payload: AddStaffForRole }) {
  try {
    const { groupId, employeeId, props } = payload;
    const companyGateway = new CompanyGateway();
    yield companyGateway.addRoleToEmployee(groupId, employeeId);
    yield put(getNoStaffForRole({ groupId, props }));
    yield put(getStaffForRole({ id: groupId, props }));
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}

type GetDocumentFlowRoles = {
  groupId: number;
};
/** получение правил документооборота */
function* getDocumentFlowRolesWorker({ payload }: { payload: GetDocumentFlowRoles }) {
  try {
    const { groupId } = payload;
    const companyGateway = new CompanyGateway();
    const roles = yield companyGateway.getDocumentFlowRoles(groupId);
    yield put(setDocumentFlowRoles(roles));
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}

type SaveDocumentFlowRoles = {
  groupId: number;
  roolsId: number[];
};
/** сохранить изменения правил документооборота */
function* saveDocumentFlowRolesWorker({ payload }: { payload: SaveDocumentFlowRoles }) {
  try {
    const { groupId, roolsId } = payload;
    yield CompanyApiServices.updateDocumentFlowRoles({ groupId, roolsId });
    yield put(getDocumentFlowRoles({ groupId }));
    yield Flash.success('Роли успешно обновлены');
  } catch ({ response }) {
    yield Flash.error(response?.data?.messages[0] || 'Возникла ошибка');
  }
}

type DeleteRole = {
  groupId: number;
};
/** удаление роли */
function* deleteRoleWorker({ payload }: { payload: DeleteRole }) {
  try {
    const { groupId } = payload;
    const companyGateway = new CompanyGateway();
    yield companyGateway.deleteRole(groupId);
    yield put(getStaffRoles({}));
    yield Flash.success('Роль удалена');
  } catch (err) {
    yield Flash.error('Возникла ошибка');
  }
}
