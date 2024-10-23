import AJAX from '../../../infrastructure/AJAX';

/**
 * Справочники
 */
class DictionaryGateway {
  /** Получить справочник внешних операторов  */
  getExternalOperators() {
    return AJAX.doGet('/front/external_operators/');
  }

  /** Получить справочник сетей  */
  getNetworks() {
    return AJAX.doGet('/front/networks/');
  }

  /** Получить "Вид документов" для неформалозованных документов */
  getUnformalizedFlow() {
    return AJAX.doGet('/front/flow/', {isUnformalized: 1});
  }
}

export default DictionaryGateway;
