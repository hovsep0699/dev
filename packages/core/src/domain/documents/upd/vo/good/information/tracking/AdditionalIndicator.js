/*
  ДопПрослеж - Дополнительный показатель для идентификации товаров, подлежащих прослеживаемости.
  T(1-1000)
*/

class AdditionalIndicator {
  static get REG_EXP() {
    return new RegExp('^.{0,255}$');
  }

  static validate(value) {
    return value && !AdditionalIndicator.REG_EXP.test(value) ? 'Введите дополнительную информацию длиной 1-255 знаков' : undefined;
  }

  static isValid(value) {
    return !AdditionalIndicator.validate(value);
  }

  static get hint() {
    return 'Введите строку длиной до 255 знаков';
  }

  static get placeholder() {
    return 'Введите дополнительную информацию';
  }

  static get name() {
    return 'Дополнительная информация';
  }

  static get field() {
    return 'additionalIndicator';
  }

  constructor(str) {
    if (!AdditionalIndicator.isValid(`${str}`)) {
      this._error = new Error('Невозможно создать дополнительную информацию. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${str}`;
  }

  clone() {
    return new AdditionalIndicator(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default AdditionalIndicator;
