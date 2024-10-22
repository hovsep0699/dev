/*
  Номер банковского счета(НомерСчета) A(атрибут) текст(1-20)
 */
class BankAccountNumber {
  static get REG_EXP() {
    return new RegExp('^.{1,20}$');
  }

  static validate(value) {
    return value && !BankAccountNumber.REG_EXP.test(value) ? 'Введите строку длиной 1–20 знаков' : undefined;
  }

  static isValid(value) {
    return !BankAccountNumber.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 20);
  }

  static get placeholder() {
    return 'Введите Номер банковского счета';
  }

  static get hint() {
    return 'Введите строку длиной 1–20 знаков';
  }

  static get name() {
    return 'Номер банковского счета';
  }

  static get field() {
    return 'accountNumber';
  }

  constructor(value) {
    if (!BankAccountNumber.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать Номер банковского счета. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new BankAccountNumber(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default BankAccountNumber;
