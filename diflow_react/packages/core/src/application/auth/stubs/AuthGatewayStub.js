import mockLoginString from '../../../mocks/200/loginString';
import mockUserUL from '../../../mocks/200/current_user_UL';
import mockCompanyUL from '../../../mocks/200/current_company_UL_waiting_data';
import mockNotificationsSettings from '../../../mocks/200/setting';
import mockCertificatesDiff from '../../../mocks/200/diffs_certs_all_active';
import mockSuccess from '../../../mocks/200/success';
import AuthGateway from '../AuthGateway';
import employees_UL_active from '../../../mocks/200/employees_UL_active';

class AuthGatewayStub extends AuthGateway {
  loginString() {
    return Promise.resolve(mockLoginString);
  }

  currentUser() {
    return Promise.resolve(mockUserUL);
  }

  currentCompany() {
    return Promise.resolve(mockCompanyUL);
  }

  companyEmployees() {
    return Promise.resolve(employees_UL_active);
  }

  notificationSettings() {
    return Promise.resolve(mockNotificationsSettings);
  }

  exit() {
    return Promise.resolve(mockSuccess);
  }

  certificatesDiff() {
    return Promise.resolve(mockCertificatesDiff);
  }

  authViaCert() {
    return Promise.resolve({ data: mockSuccess });
  }

  login() {
    return Promise.resolve({ data: mockSuccess });
  }

  remind() {
    return Promise.resolve({ data: mockSuccess });
  }
}

export default AuthGatewayStub;
