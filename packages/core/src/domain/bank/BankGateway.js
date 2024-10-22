import AJAX from '../../infrastructure/AJAX';

class BankGateway {
  getBankByBIK(bik) {
    return AJAX.doGet('/front/bank/', { bik });
  }
}

export default BankGateway;
