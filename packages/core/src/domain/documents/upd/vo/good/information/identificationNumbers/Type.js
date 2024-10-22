/*
  Тип идентификатора транспортной упаковки
*/
import KIZ from './type/KIZ';
import PackNum from './type/PackNum';
import EmptyOption from '../../../../../../common/options/EmptyOption';

class Type {
  static validate(value) {
    return (value === EmptyOption.value) ? 'Тип идентификатора заполнен неверно' : undefined;
  }

  static isValid(value) {
    return !Type.validate(value);
  }

  static get name() {
    return 'Тип идентификатора';
  }

  static get hint() {
    return 'Выберите тип идентификатора';
  }

  static get field() {
    return 'type';
  }

  static get type() {
    return 'select';
  }

  static get options() {
    return [EmptyOption, KIZ, PackNum];
  }
}

export default Type;
