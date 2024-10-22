/*
  ОКПО A(атрибут) текст(1-10)
 */
import OKPO from '../../../../../legal_entity/vo/OKPO';

class OKPOUL {
  static validate(value) {
    return value && !OKPO.REG_EXP.test(value) ? 'Введите число длиной 8 знаков' : undefined;
  }

  static isValid(value) {
    return !OKPOUL.validate(value);
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
    return 'okpoul';
  }

  constructor(value) {
    if (!OKPOUL.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать ОКПО. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new OKPOUL(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default OKPOUL;
