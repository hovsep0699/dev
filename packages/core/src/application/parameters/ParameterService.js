import ParameterGateway from './ParameterGateway';
import Parameter from './Parameter';
import EventManager from '../EventManager';

class ParameterService {
  constructor() {
    this._events = new EventManager();
  }

  async getPrameters() {
    this._events.notify('before');
    const response = await ParameterGateway.getParameters();
    const parameters = new Parameter(response);
    this._events.notify('after', parameters);

    return parameters;
  }
}

const instance = new ParameterService();

export default instance;
