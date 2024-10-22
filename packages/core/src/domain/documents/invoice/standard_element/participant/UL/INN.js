/*
  ИНН(Идентификационный Номер Налогоплательщика) состоит из 10 цифр
 */
import INN from '../../../../../legal_entity/vo/INN';

class INNUL {
  static validate(value) {
    return value && !INN.REG_EXP.test(value) ? 'Введите число длиной 10 знаков' : undefined;
  }

  static isValid(value) {
    return !INNUL.validate(value);
  }

  static mask(value) {
    return INN.mask(value);
  }

  static get placeholder() {
    return INN.placeholder;
  }

  static get hint() {
    return INN.hint;
  }

  static get name() {
    return INN.name;
  }

  static get field() {
    return 'innul';
  }

  constructor(value) {
    if (!INNUL.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать ИНН. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new INNUL(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default INNUL;
