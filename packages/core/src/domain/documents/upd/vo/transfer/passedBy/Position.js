/*
  Должность A(атрибут) текст(1-128)
 */
class Position {
  static get REG_EXP() {
    return new RegExp('^.{1,128}$');
  }

  static validate(value) {
    return !value || !Position.REG_EXP.test(value) ? 'Введите строку длиной 1-128 знаков' : undefined;
  }

  static isValid(value) {
    return !Position.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 128);
  }

  static get placeholder() {
    return 'Введите должность';
  }

  static get hint() {
    return 'Введите строку длиной до 128 знаков';
  }

  static get name() {
    return 'Должность';
  }

  static get field() {
    return 'position';
  }

  constructor(value) {
    if (!Position.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать Должность. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new Position(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default Position;
