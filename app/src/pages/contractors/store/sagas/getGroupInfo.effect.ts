import { takeLatest, put } from 'redux-saga/effects';

import { getGroupContractorsInfo, setGroupContractorsInfo } from '../actions';
import { Flash } from '../../../../common/flash/Flash';
import { ContractorApiServices } from '../../services/contractors.api';

export function* getGroupInfoEffect() {
  yield takeLatest(getGroupContractorsInfo, getGroupInfoWorker);
}

/** Получение информации о группе контрагентов */
function* getGroupInfoWorker({ payload: id }: { payload: number }) {
  try {
    const legalEntityInfo = yield ContractorApiServices.getLegalEntityGroup({
      id,
      inverseJoin: true
    });
    const naturalEntityInfo = yield ContractorApiServices.getNaturalEntityGroup({
      id,
      inverseJoin: true
    });
    const employeeInfo = yield ContractorApiServices.getEmployeeGroup({ id, inverseJoin: true });
    yield put(
      setGroupContractorsInfo({
        groupInfo: {
          legalEntityInfo: legalEntityInfo,
          naturalEntityInfo: naturalEntityInfo,
          employeeInfo: employeeInfo
        }
      })
    );
  } catch ({ message }) {
    yield Flash.error(message || 'Возникла ошибка');
  }
}
