/*
<СведТов НаимТов="Tovar1">
*/
class Name {
  static get REG_EXP() {
    return new RegExp('^.{1,1000}$');
  }

  static validate(value) {
    return value && Name.REG_EXP.test(value) ? undefined : 'Введите строку длиной 1–1000 знаков';
  }

  static isValid(value) {
    return !Name.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 1000);
  }

  static get hint() {
    return 'Введите наименование';
  }

  static get placeholder() {
    return '';
  }

  static get name() {
    return 'Наименование';
  }

  static get field() {
    return 'title';
  }

  constructor(value) {
    this._value = `${value}`;
  }

  get value() {
    return this._value;
  }
}

export default Name;
