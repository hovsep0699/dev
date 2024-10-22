import AJAX from '../../infrastructure/AJAX';

class AutocompleteGateway {
  getCurrencyByTitle(title) {
    return AJAX.doGet('/front/currency/', { title });
  }

  getCurrencyByCode(digital_code) {
    return AJAX.doGet('/front/currency/', { digital_code });
  }

  getMeasurementByTitle(title) {
    return AJAX.doGet('/front/measurement/', { title });
  }

  getMeasurementByCode(code) {
    return AJAX.doGet('/front/measurement/', { code });
  }

  getCountryByTitle(title) {
    return AJAX.doGet('/front/country/', { title });
  }

  getRecipient(params) {
    return AJAX.doGet('/front/autocomplete/recipient/', params);
  }

  getContractor(params) {
    return AJAX.doGet('/front/autocomplete/recipient/contractor', params);
  }

  getParticipant(params) {
    return AJAX.doGet('/front/autocomplete/participant/legal', params);
  }

  /** код налогового органа */
  getIFNSByCode(code) {
    return AJAX.doGet('/front/tax_authority/', { code });
  }

  /** БИК */
  getBankByBIK(bik) {
    return AJAX.doGet('/front/bank/', { bik });
  }

  /** регионы */
  getRegionByTitle(regionStr) {
    return AJAX.doGet('/front/region/', { title: regionStr });
  }
}

export default AutocompleteGateway;
