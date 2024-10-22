import OperationInformation from './OperationInformation';
import TransferBasisType from './TransferBasisType';

class TransportationAndCargo {
  static get name() {
    return 'Транспортировка и груз';
  }

  static get field() {
    return 'waybill';
  }

  static get VOs() {
    return [OperationInformation, TransferBasisType];
  }
}

export default TransportationAndCargo;
