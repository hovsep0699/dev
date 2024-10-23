import AuthGatewayStub from './AuthGatewayStub';
import employees_IP_waiting from '../../../mocks/200/employees_IP_waiting';

class IPEmployeesWaitingStub extends AuthGatewayStub {
  companyEmployees() {
    return Promise.resolve(employees_IP_waiting);
  }
}

export default IPEmployeesWaitingStub;
