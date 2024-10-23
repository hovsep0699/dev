import AJAX from '../../infrastructure/AJAX';

class ParameterGateway {
  static async getParameters() {
    return AJAX.doGet('/parameters');
  }
}

export default ParameterGateway;
