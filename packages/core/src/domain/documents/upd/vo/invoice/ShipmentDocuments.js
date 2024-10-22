/*
  ДокПодтвОтгр - Документ об отгрузке
 */

import BasisType from '../../standard_element/basis/BasisType';

class ShipmentDocuments extends BasisType {
  static validate(value) {
    return BasisType.validate(value);
  }

  static isValid(value) {
    return BasisType.isValid(value);
  }

  static get field() {
    return `shipmentDocuments`;
  }

  static get VOs() {
    return BasisType.VOs;
  }

  static get hint() {
    return 'Введите документ об отгрузке N n/n';
  }

  static get placeholder() {
    return 'Введите документ об отгрузке N n/n';
  }

  static get name() {
    return 'Документ об отгрузке N n/n';
  }
}

export default ShipmentDocuments;
