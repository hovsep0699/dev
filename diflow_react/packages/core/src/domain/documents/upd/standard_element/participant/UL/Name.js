/*
  Название компании(НаимОрг) A(атрибут) текст(1-1000)
 */
class Name {
  static get REG_EXP() {
    return new RegExp('^.{1,1000}$');
  }

  static validate(value) {
    return !value || !Name.REG_EXP.test(value) ? 'Введите строку длиной 1–1000 знаков' : undefined;
  }

  static isValid(value) {
    return !Name.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 1000);
  }

  static get placeholder() {
    return 'Введите наименование компании';
  }

  static get hint() {
    return 'Введите строку длиной 1–1000 знаков';
  }

  static get name() {
    return 'Наименование';
  }

  static get field() {
    return 'companyName';
  }

  constructor(value) {
    if (!Name.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать НаимОрг. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new Name(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default Name;
