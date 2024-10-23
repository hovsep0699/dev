/*
  Дом A(атрибут) текст(1-20)
 */
class House {
  static get REG_EXP() {
    return new RegExp('^.{1,20}$');
  }

  static validate(value) {
    return value && !House.REG_EXP.test(value) ? 'Введите строку длиной 1-20 знаков' : undefined;
  }

  static isValid(value) {
    return !House.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 50);
  }

  static get placeholder() {
    return 'Введите номер дома';
  }

  static get hint() {
    return 'Введите строку длиной до 20 знаков';
  }

  static get name() {
    return 'Дом';
  }

  static get field() {
    return 'house';
  }

  constructor(value) {
    if (!House.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать дом. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new House(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default House;
