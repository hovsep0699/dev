/*
  КПП(Код Причины Постановки на учёт) состоит из 9 цифр
 */
import KPP from '../../../../../legal_entity/vo/KPP';

class KPPUL {
  static validate(value) {
    return value && !KPP.REG_EXP.test(value) ? 'Введите код длиной 9 знаков' : undefined;
  }

  static isValid(value) {
    return !KPPUL.validate(value);
  }

  static mask(value) {
    return KPP.mask(value);
  }

  static get placeholder() {
    return KPP.placeholder;
  }

  static get hint() {
    return KPP.hint;
  }

  static get name() {
    return KPP.name;
  }

  static get field() {
    return 'kpp';
  }

  constructor(value) {
    if (!KPPUL.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать КПП. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new KPPUL(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default KPPUL;
