/*
  Город A(атрибут) текст(1-50)
 */
class City {
  static get REG_EXP() {
    return new RegExp('^.{1,50}$');
  }

  static validate(value) {
    return value && !City.REG_EXP.test(value) ? 'Введите строку длиной 1-50 знаков' : undefined;
  }

  static isValid(value) {
    return !City.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 50);
  }

  static get placeholder() {
    return 'Введите город';
  }

  static get hint() {
    return 'Введите строку длиной до 50 знаков';
  }

  static get name() {
    return 'Город';
  }

  static get field() {
    return 'city';
  }

  constructor(value) {
    if (!City.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать город. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new City(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default City;
