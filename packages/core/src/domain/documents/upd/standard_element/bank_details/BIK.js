/*
  БИК A(атрибут) текст(=9)
 */
class BIK {
  static get REG_EXP() {
    return new RegExp('^.{9}$');
  }

  static validate(value) {
    return value && !BIK.REG_EXP.test(value) ? 'Введите строку длиной 9 знаков' : undefined;
  }

  static isValid(value) {
    return !BIK.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 9);
  }

  static get placeholder() {
    return 'Введите БИК';
  }

  static get hint() {
    return 'Введите строку длиной 9 знаков';
  }

  static get name() {
    return 'БИК';
  }

  static get field() {
    return 'bik';
  }

  constructor(value) {
    if (!BIK.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать БИК. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new BIK(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default BIK;
