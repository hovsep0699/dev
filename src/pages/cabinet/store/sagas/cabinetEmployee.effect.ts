import { takeLatest, put } from 'redux-saga/effects';
import { Flash } from '../../../../common/flash/Flash';
import { getEmployeeInfo, setEmployeeInfo, changeEmployeeInfo, setEmployeeError } from '../actions';
import AuthGateway from '@distate/core/dist/application/auth/AuthGateway';
import { cabinetGateway } from '@distate/core/dist/application/cabinet/CabinetGateway';

/** Кабинет */
export function* cabinetEffect() {
  yield takeLatest(getEmployeeInfo, getEmployeeInfoWorker);
  yield takeLatest(changeEmployeeInfo, changeEmployeeInfoWorker);
}

/** получение информации о пользователе */
function* getEmployeeInfoWorker() {
  try {
    const authGateway = new AuthGateway();
    const response = yield authGateway.currentUser();

    const employee = {
      surname: response?.person?.surname,
      name: response?.person?.name,
      patronymic: response?.person?.patronymic,
      position: response?.employee?.position,
      email: response?.employee?.email
    };

    yield put(setEmployeeInfo({ employee }));
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}

/** изменение информации о пользователе */
function* changeEmployeeInfoWorker({ payload }: { payload: any }) {
  try {
    const { name, surname, patronymic, position, email, password } = payload;
    const formData = new FormData();
    name && formData.append('person[name]', name);
    surname && formData.append('person[surname]', surname);
    patronymic && formData.append('person[patronymic]', patronymic);
    position && formData.append('position', position);
    email && formData.append('email', email);
    password && formData.append('password', password);

    yield cabinetGateway.changeCabinetEmployee(formData);
    yield Flash.success('Данные изменены');
  } catch ({ response }) {
    yield put(setEmployeeError({ errors: response?.data }));
    yield Flash.error('Возникла ошибка');
  }
}
