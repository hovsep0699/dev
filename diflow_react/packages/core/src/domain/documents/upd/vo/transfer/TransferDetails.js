/*
  Сведения о передаче (сдаче) товаров (результатов работ), имущественных прав (о предъявлении оказанных услуг) (СвПер)
*/
import BasisType from './TransferBasisType';
import OperationInformation from './OperationInformation';

class TransferDetails {
  static validate(value) {
    // TODO реализовать валидацию
    return undefined;
  }

  static isValid(value) {
    return !TransferDetails.validate(value);
  }

  static get hint() {
    return 'Введите покупателя "Сведения о передаче (сдаче) товаров (результатов работ), имущественных прав (о предъявлении оказанных услуг)"';
  }

  static get placeholder() {
    return 'Введите покупателя "Сведения о передаче (сдаче) товаров (результатов работ), имущественных прав (о предъявлении оказанных услуг)"';
  }

  static get name() {
    return 'Сведения о передаче';
  }

  static get field() {
    return 'transferDetails';
  }

  static get VOs() {
    return [BasisType, OperationInformation];
  }

  constructor({ basis, operationInformation }) {
    this.basis = basis;
    this.operationInformation = operationInformation;
  }

  clone() {
    return new TransferDetails(this.value);
  }

  get value() {
    return {
      [BasisType.field]: this.basis,
      [OperationInformation.field]: this.operationInformation,
    };
  }

  get basis() {
    return this._basis;
  }

  set basis(id) {
    this._basis = new BasisType(id);
  }

  get operationInformation() {
    return this._operationInformation;
  }

  set operationInformation(val) {
    this._operationInformation = new OperationInformation(val);
  }
}

export default TransferDetails;
