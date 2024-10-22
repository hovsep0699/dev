/*
  ОКПО A(атрибут) текст(1-10)
 */
class OKPO {
  static get REG_EXP() {
    return new RegExp('^.{1,10}$');
  }

  static validate(value) {
    return value && !OKPO.REG_EXP.test(value) ? 'Введите строку длиной 1–10 знаков' : undefined;
  }

  static isValid(value) {
    return !OKPO.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 10);
  }

  static get placeholder() {
    return 'Введите ОКПО';
  }

  static get hint() {
    return 'Введите строку длиной 1–10 знаков';
  }

  static get name() {
    return 'ОКПО';
  }

  static get field() {
    return 'okpo';
  }

  constructor(value) {
    if (!OKPO.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать ОКПО. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new OKPO(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default OKPO;
