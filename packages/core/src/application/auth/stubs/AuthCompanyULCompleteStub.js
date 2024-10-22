import mockCompany from '../../../mocks/200/current_company_UL_complete';
import AuthGatewayStub from './AuthGatewayStub';

class AuthCompanyULCompleteStub extends AuthGatewayStub {
  currentCompany() {
    return Promise.resolve(mockCompany);
  }
}

export default AuthCompanyULCompleteStub;
