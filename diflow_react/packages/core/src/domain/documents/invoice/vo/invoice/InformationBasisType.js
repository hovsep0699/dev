/*
  ОснУстДенТреб - Основание уступки денежного требования
 */

import BasisType from '../../standard_element/basis/BasisType';

class InformationBasisType extends BasisType {
  static validate(value) {
    return BasisType.validate(value);
  }

  static isValid(value) {
    return BasisType.isValid(value);
  }

  static get field() {
    return `information.${BasisType.field}`;
  }

  static get VOs() {
    return BasisType.VOs;
  }

  static get hint() {
    return 'Введите основание уступки денежного требования';
  }

  static get placeholder() {
    return 'Введите основание уступки денежного требования';
  }

  static get name() {
    return 'Основание уступки денежного требования';
  }
}

export default InformationBasisType;
