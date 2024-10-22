import Environment from '../../Environment';

class DictionaryService {
  /** Получить справочник внешних операторов  */
  getExternalOperators() {
    return Environment.getDictionaryGateway().getExternalOperators();
  }

  /** Получить справочник сетей  */
  getNetworks() {
    return Environment.getDictionaryGateway().getNetworks();
  }
}

const instance = new DictionaryService();
export default instance;
