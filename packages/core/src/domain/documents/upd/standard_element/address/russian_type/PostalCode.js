/*
  Индекс A(атрибут) текст(=6)
 */
class PostalCode {
  static get REG_EXP() {
    return new RegExp('^.{6}$');
  }

  static validate(value) {
    return value && !PostalCode.REG_EXP.test(value) ? 'Введите строку длиной 6 знаков' : undefined;
  }

  static isValid(value) {
    return !PostalCode.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 6);
  }

  static get placeholder() {
    return 'Введите индекс';
  }

  static get hint() {
    return 'Введите строку длиной 6 знаков';
  }

  static get name() {
    return 'Индекс';
  }

  static get field() {
    return 'postalCode';
  }

  constructor(value) {
    if (!PostalCode.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать индекс. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new PostalCode(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default PostalCode;
