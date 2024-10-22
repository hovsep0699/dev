import Environment from '../../Environment';
import errFactory from '../../error/ErrorFactory';
import { DOCUMENT } from '../../error/Error';

class UPDService {
  async create(data) {
    try {
      return await Environment.getUPDGateway().create(data);
    } catch (error) {
      throw errFactory(DOCUMENT, 'Не удалось создать УПД', error);
    }
  }

  async edit(docId, data) {
    try {
      return await Environment.getUPDGateway().edit(docId, data);
    } catch (error) {
      throw errFactory(DOCUMENT, 'Не удалось отредактировать УПД', error);
    }
  }

  async get(id) {
    try {
      return await Environment.getUPDGateway().get(id);
    } catch (error) {
      throw errFactory(DOCUMENT, 'Не удалось получить УПД', error);
    }
  }
}

const instance = new UPDService();
export default instance;
