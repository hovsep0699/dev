import AJAX from '../../infrastructure/AJAX';
// import mockCreate from '../../mocks/connector/create';
// import mock200 from '../../mocks/connector/200';
// import mockOperator from '../../mocks/connector/connector';
// import mockOperators from '../../mocks/connector/operators';

const responseFailure = ({ response: { data } }) => {
  throw data;
};

export class ConnectorGateway {
  operators = async () => {
    return AJAX.doGet('/front/company/connector/')
      .then(operators => operators)
      .catch(responseFailure);
  };

  operator = async id => {
    return AJAX.doGet(`/front/company/connector/${id}`)
      .then(operators => operators)
      .catch(responseFailure);
  };

  create = async data => {
    return AJAX.postJSON('/front/company/connector/account/create', data).catch(responseFailure);
  };

  update = async (id, data) => {
    return AJAX.postJSON(`/front/company/connector/account/${id}/update`, data).catch(
      responseFailure
    );
  };

  start = async id => {
    return AJAX.postJSON(`/front/company/connector/account/${id}/resume`).catch(responseFailure);
  };

  stop = async id => {
    return AJAX.postJSON(`/front/company/connector/account/${id}/stop`).catch(responseFailure);
  };
}
