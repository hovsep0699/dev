import AuthGatewayStub from './AuthGatewayStub';
import employees_UL_active from '../../../mocks/200/employees_UL_active';

class ULEmployeesActiveStub extends AuthGatewayStub {
  companyEmployees() {
    return Promise.resolve(employees_UL_active);
  }
}

export default ULEmployeesActiveStub;
