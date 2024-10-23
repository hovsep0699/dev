/*
  ОснПер
  Основание отгрузки товаров (передачи результатов работ),
  передачи имущественных прав (предъявления оказанных услуг)
 */
import BasisType from '../../standard_element/basis/BasisType';

class TransferBasisType extends BasisType {
  static validate(value) {
    return BasisType.validate(value);
  }

  static isValid(value) {
    return BasisType.isValid(value);
  }

  static get field() {
    return `transferDetails.${BasisType.field}`;
  }

  static get VOs() {
    return BasisType.VOs;
  }

  static get hint() {
    return 'Введите основание отгрузки';
  }

  static get placeholder() {
    return 'Введите основание отгрузки';
  }

  static get name() {
    return 'Основание отгрузки (передачи, уступки)';
  }
}

export default TransferBasisType;
