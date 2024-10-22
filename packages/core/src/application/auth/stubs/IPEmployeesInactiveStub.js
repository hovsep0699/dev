import AuthGatewayStub from './AuthGatewayStub';
import employees_IP_inactive from '../../../mocks/200/employees_IP_inactive';

class IPEmployeesInactiveStub extends AuthGatewayStub {
  companyEmployees() {
    return Promise.resolve(employees_IP_inactive);
  }
}

export default IPEmployeesInactiveStub;
