import AddressGateway from '../AddressGateway';
import mock from '../../../../mocks/200/autocomplete_region';

class AddressGatewayStub extends AddressGateway {
  getRegionByTitle() {
    return Promise.resolve(mock);
  }
}

export default AddressGatewayStub;
