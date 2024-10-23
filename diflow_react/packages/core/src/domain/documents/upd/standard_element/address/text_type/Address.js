/*
  АдрТекст A(атрибут) текст(1-1000) обязательный
 */
class Address {
  static get REG_EXP() {
    return new RegExp('^.{1,1000}$');
  }

  static validate(value) {
    return value && Address.REG_EXP.test(value) ? undefined : 'Введите текст длиной 1-1000 знаков';
  }

  static isValid(value) {
    return !Address.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 1000);
  }

  static get placeholder() {
    return 'Введите адрес';
  }

  static get hint() {
    return 'Введите текст длиной 1-1000 знаков';
  }

  static get name() {
    return 'Адрес';
  }

  static get field() {
    return 'address';
  }

  constructor(value) {
    if (!Address.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать адрес. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new Address(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default Address;
