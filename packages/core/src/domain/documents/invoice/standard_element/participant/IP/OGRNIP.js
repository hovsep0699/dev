/*
  ОГРНИП(Основной Государственный Регистрационный Номер Индивидуального Предпринимателя) состоит из 15 цифр
 */
import OGRNIP from '../../../../../individual_entrepreneur/vo/OGRNIP';

class OGRN {
  static validate(value) {
    return value && !OGRNIP.REG_EXP.test(value) ? 'Введите номер длиной 15 знаков' : undefined;
  }

  static isValid(value) {
    return !OGRN.validate(value);
  }

  static mask(value) {
    return OGRNIP.mask(value);
  }

  static get placeholder() {
    return OGRNIP.placeholder;
  }

  static get hint() {
    return OGRNIP.hint;
  }

  static get name() {
    return OGRNIP.name;
  }

  static get field() {
    return 'ogrn';
  }

  constructor(value) {
    if (!OGRN.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать ОГРНИП. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new OGRN(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default OGRN;
