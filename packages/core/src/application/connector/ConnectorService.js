import { ConnectorGateway } from './ConnectorGateway';

export class ConnectorService {
  static instance;
  constructor() {
    if (ConnectorService.instance) {
      return ConnectorService.instance;
    }

    this.request = new ConnectorGateway();

    ConnectorService.instance = this;
  }

  operator = async id => {
    return this.request.operator(id);
  };

  operators = async () => {
    return this.request.operators();
  };

  create = async data => {
    return this.request.create(data);
  };

  update = (id, data) => {
    return this.request.update(id, data);
  };

  start = id => {
    return this.request.start(id);
  };

  stop = id => {
    return this.request.stop(id);
  };
}
