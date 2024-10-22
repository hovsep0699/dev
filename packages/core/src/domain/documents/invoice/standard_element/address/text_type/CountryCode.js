/*
  КодСтр A(атрибут) текст(=3)
  <ОКСМТип> - Общероссийский Классификатор Стран Мира
 */
class CountryCode {
  static get REG_EXP() {
    return new RegExp('^.{3}$');
  }

  static validate(value) {
    return value && CountryCode.REG_EXP.test(value) ? undefined : 'Введите строку длиной 3 знака';
  }

  static isValid(value) {
    return !CountryCode.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 3);
  }

  static get placeholder() {
    return 'Введите код страны';
  }

  static get hint() {
    return 'Введите строку длиной 3 знака';
  }

  static get name() {
    return 'Код страны';
  }

  static get field() {
    return 'bik';
  }

  constructor(value) {
    if (!CountryCode.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать код страны. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new CountryCode(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default CountryCode;
