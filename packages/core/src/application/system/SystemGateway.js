import AJAX from '../../infrastructure/AJAX';

const responseFailure = ({ response: { data } }) => {
  throw data;
};

class SystemGateway {
  legalList = async (params) => {
    return AJAX.doGet('/front/cabinet/members', params).catch(responseFailure);
  };

  personList = async (params = {}) => {
    return AJAX.doGet('/front/person', params).catch(responseFailure);
  };

  operators = async id => {
    return AJAX.doGet(`/front/system/connectors/legal_entity/${id}/operators`)
      .then(operators => operators)
      .catch(responseFailure);
  };

  updateOperators = async (id, connectors) => {
    return AJAX.postJSON(`/front/system/connectors/legal_entity/${id}`, { connectors }).catch(
      responseFailure
    );
  };

  /** Создать отчет по колличеству роуминговых документов */
  getRoamingDocumentsReport = async (params) => {
    return AJAX.postJSON('/front/report/create_roaming_documents_count', params);
  }

  /** получить информацию о лицензии */
  getLicenseInfo = async () => {
    return AJAX.doGet('/front/license/current');
  }
}

export { SystemGateway };
export default SystemGateway;
