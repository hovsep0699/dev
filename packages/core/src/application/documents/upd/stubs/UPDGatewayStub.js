import UPDGateway from '../UPDGateway';
import updError400Mock from '../../../../mocks/upd/upd_errors';
import getUPDMock from '../../../../mocks/upd/get_upd';

class UPDGatewayStub extends UPDGateway {
  create() {
    const error = {
      response: {
        data: updError400Mock,
        status: 400
      }
    };
    throw error;
  }

  edit() {
    const error = {
      response: {
        data: updError400Mock,
        status: 400
      }
    };
    throw error;
  }

  get() {
    return Promise.resolve(getUPDMock);
  }
}

export default UPDGatewayStub;
