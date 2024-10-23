/*
  Уникальный идентификатор транспортной упаковки(ИдентТрансУпак) A(атрибут) текст(1-255)
*/
class PackNumber {
  static get REG_EXP() {
    return new RegExp('^.{1,255}$');
  }

  static validate(value) {
    return PackNumber.REG_EXP.test(value) ? undefined : 'Введите строку длиной 1–255 знаков';
  }

  static isValid(value) {
    return !PackNumber.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 255);
  }

  static get placeholder() {
    return 'Введите идентификатор';
  }

  static get hint() {
    return 'Введите строку длиной 1–255 знаков';
  }

  static get name() {
    return 'Уникальный идентификатор';
  }

  static get field() {
    return 'packNumber';
  }

  constructor(value) {
    if (!PackNumber.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать Идентификатор. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new PackNumber(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default PackNumber;
