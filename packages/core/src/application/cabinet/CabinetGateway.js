import AJAX from '../../infrastructure/AJAX';

/**
 * Кабинет
 */
class CabinetGateway {
  /** изменить данные пользователя в кабинете  */
  changeCabinetEmployee(formData) {
    return AJAX.postFormData('/front/cabinet/employee', formData);
  }

  /** изменить настройки уведомлений */
  changeNotificationSetting(params) {
    return AJAX.postJSON('/front/notification/setting', params);
  }

  /** получить сертификаты */
  getCertificates(params) {
    return AJAX.doGet('/front/cabinet/certificate', params)
  }

  /** изменить сертификат для подписания */
  changeUseCertificate(id) {
    return AJAX.postFormData(`/front/cabinet/certificate/${id}/current`)
  }

}

export const cabinetGateway = new CabinetGateway();;
