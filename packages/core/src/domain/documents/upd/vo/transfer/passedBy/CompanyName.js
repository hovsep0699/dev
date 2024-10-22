/*
  Наименование организации НаимОргПрин A(атрибут) текст(1-128)
 */
class CompanyName {
  static get REG_EXP() {
    return new RegExp('^.{1,128}$');
  }

  static validate(value) {
    return !value || !CompanyName.REG_EXP.test(value) ? 'Введите строку длиной 1-128 знаков' : undefined;
  }

  static isValid(value) {
    return !CompanyName.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 128);
  }

  static get placeholder() {
    return 'Введите наименование организации';
  }

  static get hint() {
    return 'Введите строку длиной до 128 знаков';
  }

  static get name() {
    return 'Наименование организации';
  }

  static get field() {
    return 'companyName';
  }

  constructor(value) {
    if (!CompanyName.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать наименование организации. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new CompanyName(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default CompanyName;
