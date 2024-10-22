import AJAX from '../../infrastructure/AJAX';

class FinanceGateway {
  /** получить информацию о балансе */
  getBalance(id) {
    return AJAX.doGet(`/front/tariff/balance/company/${id}`)
  };

  /** установить баланс */
  setBalance(id, formData) {
    return AJAX.postFormData(`/front/tariff/balance/company/${id}`, formData)
  }

  /** информация о тарифах компании */
  getTariffsByCompanyId(id, params = {}) {
    return AJAX.doGet(`/front/tariff/service/company/${id}`, params)
  }

  /** получить список видов документооборота для тарифа */
  getTariffFlow(id) {
    return AJAX.doGet(`/front/tariff/flow/${id}/flow`)
  }

  /** выставить счет */
  setBill(id, formData) {
    return AJAX.postFormData(`/front/tariff/balance/company/${id}/bill`, formData)
  }

  /** получить список тарифов */
  getTariffs(params) {
    return AJAX.doGet('/front/tariff', params)
  }

  /** изменить тариф */
  changeTariff(id, formData) {
    return AJAX.postFormData(`/front/tariff/service/company/${id}`, formData)
  }

  /** получить баланс тарифа */
  getTariffBalance(id) {
    return AJAX.doGet(`/front/tariff/balance/service/${id}`)
  }

  /** получить историю транзакций */
  getTransactionsHistory(id, params = {}) {
    return AJAX.doGet(`/front/tariff/balance/company/${id}/transaction`, params)
  }

  /** получить сведения о тарифе */
  getTariff(id) {
    return AJAX.doGet(`/front/tariff/${id}`)
  }

  /** типы тарифов */
  getTariffTypes() {
    return AJAX.doGet('/front/tariff/tariff_type')
  }

  /** статусы тарифов */
  getTariffStatuses() {
    return AJAX.doGet('/front/tariff/tariff_status')
  }

  /** Отредактировать сведения о траифе */
  editTariff(id, formData) {
    return AJAX.postFormData(`/front/tariff/${id}`, formData)
  }

  /** обновить данные по виду документооборота для тарифа */
  updateTariffFlow(tariffId, flowId, formData) {
    return AJAX.postFormData(`/front/tariff/flow/${tariffId}/flow/${flowId}`, formData)
  }

  /** создать тариф */
  createTariff(formdata) {
    return AJAX.postFormData('/front/tariff/new', formdata)
  }

  /** установить статус тарифа */
  setTariffStatus(tariffId, statusSystemName){
    return AJAX.postJSON(`/front/tariff/${tariffId}/status/${statusSystemName}`)
  }


}

export const financeGateway = new FinanceGateway();
