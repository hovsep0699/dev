import AuthGatewayStub from './AuthGatewayStub';
import employees_UL_waiting from '../../../mocks/200/employees_UL_waiting';

class ULEmployeesWaitingStub extends AuthGatewayStub {
  companyEmployees() {
    return Promise.resolve(employees_UL_waiting);
  }
}

export default ULEmployeesWaitingStub;
