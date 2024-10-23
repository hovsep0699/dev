import { SystemGateway } from './SystemGateway';

class SystemService {
  constructor() {
    this.request = new SystemGateway();
  }

  legal = async (params = {}) => {
    const { recordsTotal = 0, rows = [] } = await this.request.legalList(params);
    return {
      total: recordsTotal,
      list: rows
    };
  };

  operators = async id => {
    const { operators = [] } = await this.request.operators(id);

    return operators.map(item => ({
      ...item.operator,
      checked: item.isEnabled
    }));
  };

  updateOperators = async (id, connectors) => {
    return this.request.updateOperators(id, connectors);
  };

  getRoamingDocumentsReport = async (params) => {
    return this.request.getRoamingDocumentsReport(params);
  };

  /** получить информацию о лицензии */
  getLicenseInfo = async () => {
    return this.request.getLicenseInfo();
  }

}

export { SystemService };
export default SystemService;
