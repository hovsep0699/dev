/*
  Адрес электронной почты(ЭлПочта) A(атрибут) текст(1-255)
 */
class Email {
  static get REG_EXP() {
    return new RegExp('^.{1,255}$');
  }

  static validate(value) {
    return value && !Email.REG_EXP.test(value) ? 'Введите строку длиной 1–255 знаков' : undefined;
  }

  static isValid(value) {
    return !Email.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 255);
  }

  static get placeholder() {
    return 'Введите email';
  }

  static get hint() {
    return 'Введите строку длиной 1–255 знаков';
  }

  static get name() {
    return 'Email';
  }

  static get field() {
    return 'email';
  }

  constructor(value) {
    if (!Email.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать email. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new Email(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default Email;
