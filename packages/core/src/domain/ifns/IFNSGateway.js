import AJAX from '../../infrastructure/AJAX';

class IFNSGateway {
  getIFNSByCode(code) {
    return AJAX.doGet('/front/tax_authority/', { code });
  }
}

export default IFNSGateway;
