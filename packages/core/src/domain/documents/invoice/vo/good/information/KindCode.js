/*
  КодВидТов - код вида товара
  T(=10)
*/

class KindCode {
  static get REG_EXP() {
    return new RegExp('^.{10}$');
  }

  static validate(value) {
    return value && !KindCode.REG_EXP.test(value) ? 'Введите код вида товара (10 символов)' : undefined;
  }

  static isValid(value) {
    return !KindCode.validate(value);
  }

  static get hint() {
    return 'Введите код вида товара (ТН ВЭД)';
  }

  static get placeholder() {
    return 'Введите код вида товара';
  }

  static get name() {
    return 'Код вида товара (ТН ВЭД)';
  }

  static get field() {
    return 'kindCode';
  }

  constructor(code) {
    if (!KindCode.isValid(`${code}`)) {
      this._error = new Error('Невозможно создать код вида товара. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${code}`;
  }

  clone() {
    return new KindCode(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default KindCode;
