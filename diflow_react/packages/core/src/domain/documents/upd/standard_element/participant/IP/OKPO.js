/*
  ОКПО A(атрибут) текст(1-10)
 */
import OKPO from '../../../../../individual_entrepreneur/vo/OKPO';

class OKPOIP {
  static validate(value) {
    return value && !OKPO.REG_EXP.test(value) ? 'Введите число длиной 10 знаков' : undefined;
  }

  static isValid(value) {
    return !OKPOIP.validate(value);
  }

  static mask(value) {
    return OKPO.mask(value);
  }

  static get placeholder() {
    return OKPO.placeholder;
  }

  static get hint() {
    return OKPO.hint;
  }

  static get name() {
    return OKPO.name;
  }

  static get field() {
    return 'okpoip';
  }

  constructor(value) {
    if (!OKPOIP.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать ОКПО. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new OKPOIP(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default OKPOIP;
