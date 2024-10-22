/*
  Корреспондентский счет банка(КорСчет) A(атрибут) текст(1-20)
 */
class CorrespondentAccount {
  static get REG_EXP() {
    return new RegExp('^.{1,20}$');
  }

  static validate(value) {
    return value && !CorrespondentAccount.REG_EXP.test(value) ? 'Введите строку длиной 1–20 знаков' : undefined;
  }

  static isValid(value) {
    return !CorrespondentAccount.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 20);
  }

  static get placeholder() {
    return 'Введите корреспондентский счет';
  }

  static get hint() {
    return 'Введите строку длиной 1–20 знаков';
  }

  static get name() {
    return 'Корреспондентский счет банка';
  }

  static get field() {
    return 'correspondentAccount';
  }

  constructor(value) {
    if (!CorrespondentAccount.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать КорСчет. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new CorrespondentAccount(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default CorrespondentAccount;
