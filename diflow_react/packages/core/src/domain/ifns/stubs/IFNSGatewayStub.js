import IFNSGateway from '../IFNSGateway';
import mock from '../../../mocks/200/autocomplete_ifns';

class IFNSGatewayStub extends IFNSGateway {
  getIFNSByCode() {
    return Promise.resolve(mock);
  }
}

export default IFNSGatewayStub;
