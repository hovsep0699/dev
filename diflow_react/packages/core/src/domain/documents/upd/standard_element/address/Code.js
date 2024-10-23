/*
  КодГАР текст(1-36)
  Уникальный номер адреса объекта адресации в государственном
 */
class Code {
  static get REG_EXP() {
    return new RegExp('^.{1,36}$');
  }

  static validate(value) {
    return value && Code.REG_EXP.test(value) ? undefined : 'Введите строку длиной 1–36 знаков';
  }

  static isValid(value) {
    return !Code.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 36);
  }

  static get placeholder() {
    return 'Введите КодГАР';
  }

  static get hint() {
    return 'Введите строку длиной 1-36 знаков';
  }

  static get name() {
    return 'КодГАР';
  }

  static get field() {
    return 'code';
  }

  constructor(value) {
    if (!Code.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать КодГАР. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new Code(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default Code;
