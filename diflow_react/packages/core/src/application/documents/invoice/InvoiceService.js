import Environment from '../../Environment';
import errFactory from '../../error/ErrorFactory';
import { DOCUMENT } from '../../error/Error';

class InvoiceService {
  async create(data) {
    try {
      return await Environment.getInvoiceGateway().create(data);
    } catch (error) {
      throw errFactory(DOCUMENT, 'Не удалось создать счет-фактуру', error);
    }
  }

  async createUKD(data) {
    try {
      return await Environment.getInvoiceGateway().createUKD(data) ;
    } catch (error) {
      throw errFactory(DOCUMENT, 'Не удалось создать УКД', error);
    }
  }

  async editUKD(id, data) {
    try {
      return await Environment.getInvoiceGateway().editUKD(id, data) ;
    } catch (error) {
      throw errFactory(DOCUMENT, 'Не удалось изменить УКД', error);
    }
  }

  async edit(docId, data) {
    try {
      return await Environment.getInvoiceGateway().edit(docId, data);
    } catch (error) {
      throw errFactory(DOCUMENT, 'Не удалось отредактировать счет-фактуру', error);
    }
  }

  async get(id) {
    try {
      return await Environment.getInvoiceGateway().get(id);
    } catch (error) {
      throw errFactory(DOCUMENT, 'Не удалось получить счет-фактуру', error);
    }
  }
}

const instance = new InvoiceService();
export default instance;
