import AJAX from '../../infrastructure/AJAX';

class AuthGateway {
  loginString() {
    return AJAX.doGet('/loginString');
  }

  currentUser() {
    return AJAX.doGet('/front/user/current');
  }

  currentCompany() {
    return AJAX.doGet('/front/company/current');
  }

  companyEmployees(localCompanyId, params) {
    return AJAX.doGet(`/front/company/${localCompanyId}/employee`, params);
  }

  notificationSettings() {
    return AJAX.doGet('/front/notification/setting');
  }

  exit() {
    return AJAX.doGet('/front/logout');
  }

  certificatesDiff(thumbprints) {
    return AJAX.doGet('/front/certificate/diff', { thumbprints });
  }

  authViaCert(url, formData) {
    return AJAX.postFormData(url, formData);
  }

  login(url, formData) {
    return AJAX.postFormData(url, formData);
  }

  remind(url, formData) {
    return AJAX.postFormData(url, formData);
  }
}

export default AuthGateway;
