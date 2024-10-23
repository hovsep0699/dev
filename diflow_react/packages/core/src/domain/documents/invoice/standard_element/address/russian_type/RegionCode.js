/*
  Код региона A(атрибут) текст(=2) обязательный
  КодРегион <CCРФТип>
 */
class RegionCode {
  static get REG_EXP() {
    return new RegExp('^.{2}$');
  }

  static validate(value) {
    return value && !RegionCode.REG_EXP.test(value) ? 'Введите строку длиной 2 знака' : undefined;
  }

  static isValid(value) {
    return !RegionCode.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 2);
  }

  static get placeholder() {
    return 'Введите код региона';
  }

  static get hint() {
    return 'Введите строку длиной 2 знака';
  }

  static get name() {
    return 'Код региона';
  }

  static get field() {
    return 'regionCode';
  }

  constructor(value) {
    if (!RegionCode.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать Код региона. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new RegionCode(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default RegionCode;
