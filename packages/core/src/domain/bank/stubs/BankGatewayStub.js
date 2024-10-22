import BankGateway from '../BankGateway';
import mock from '../../../mocks/200/autocomplete_bank';

class BankGatewayStub extends BankGateway {
  getBankByBIK() {
    return Promise.resolve(mock);
  }
}

export default BankGatewayStub;
