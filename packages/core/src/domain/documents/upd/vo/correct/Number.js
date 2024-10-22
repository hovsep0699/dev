export class NumberCorrect {
  constructor(num = '') {
    num = String(num);
    this._error = null;

    if (!NumberCorrect.isValid(num)) {
      this._error = new Error('Формат не верен.');
    }

    this._value = num;
  }

  static validate(value) {
    if (value && !NumberCorrect.REG_EXP.test(value)) {
      return 'Введите строку длиной 1–1000 знаков';
    }
    return;
  }

  static isValid(value) {
    return !NumberCorrect.validate(value);
  }

  static get REG_EXP() {
    return new RegExp('^.{1,1000}$');
  }

  static get field() {
    return 'number';
  }

  static get placeholder() {
    return 'Введите номер исправления';
  }

  static get hint() {
    return 'Введите строку длиной 1–1000 знаков';
  }

  static get name() {
    return 'Номер исправления';
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default NumberCorrect;
