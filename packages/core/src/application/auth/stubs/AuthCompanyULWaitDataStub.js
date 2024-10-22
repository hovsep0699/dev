import mockCompanyUL from '../../../mocks/200/current_company_UL_waiting_data';
import AuthGatewayStub from './AuthGatewayStub';

class AuthCompanyULWaitDataStub extends AuthGatewayStub {
  currentCompany() {
    return Promise.resolve(mockCompanyUL);
  }
}

export default AuthCompanyULWaitDataStub;
