/*
  Улица A(атрибут) текст(1-50)
 */
class Street {
  static get REG_EXP() {
    return new RegExp('^.{1,50}$');
  }

  static validate(value) {
    return value && !Street.REG_EXP.test(value) ? 'Введите строку длиной 1-50 знаков' : undefined;
  }

  static isValid(value) {
    return !Street.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 50);
  }

  static get placeholder() {
    return 'Введите улицу';
  }

  static get hint() {
    return 'Введите строку длиной до 50 знаков';
  }

  static get name() {
    return 'Улица';
  }

  static get field() {
    return 'street';
  }

  constructor(value) {
    if (!Street.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать улицу. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new Street(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default Street;
