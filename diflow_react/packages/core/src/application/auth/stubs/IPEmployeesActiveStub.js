import AuthGatewayStub from './AuthGatewayStub';
import employees_IP_active from '../../../mocks/200/employees_IP_active';

class IPEmployeesActiveStub extends AuthGatewayStub {
  companyEmployees() {
    return Promise.resolve(employees_IP_active);
  }
}

export default IPEmployeesActiveStub;
