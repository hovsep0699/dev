import AuthGatewayStub from './AuthGatewayStub';
import employees_UL_inactive from '../../../mocks/200/employees_UL_inactive';

class ULEmployeesInactiveStub extends AuthGatewayStub {
  companyEmployees() {
    return Promise.resolve(employees_UL_inactive);
  }
}

export default ULEmployeesInactiveStub;
