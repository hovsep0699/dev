/*
  Район A(атрибут) текст(1-50)
 */
class District {
  static get REG_EXP() {
    return new RegExp('^.{1,50}$');
  }

  static validate(value) {
    return value && !District.REG_EXP.test(value) ? 'Введите строку длиной 1-50 знаков' : undefined;
  }

  static isValid(value) {
    return !District.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 50);
  }

  static get placeholder() {
    return 'Введите название района';
  }

  static get hint() {
    return 'Введите строку длиной до 50 знаков';
  }

  static get name() {
    return 'Район';
  }

  static get field() {
    return 'district';
  }

  constructor(value) {
    if (!District.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать район. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new District(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default District;
