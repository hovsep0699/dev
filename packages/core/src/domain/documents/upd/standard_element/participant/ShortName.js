/*
  Краткое название(КраткНазв) A(атрибут) текст(1-255)
 */
class ShortName {
  static get REG_EXP() {
    return new RegExp('^.{1,255}$');
  }

  static validate(value) {
    return value && !ShortName.REG_EXP.test(value) ? 'Введите строку длиной 1–255 знаков' : undefined;
  }

  static isValid(value) {
    return !ShortName.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 255);
  }

  static get placeholder() {
    return 'Введите краткое название';
  }

  static get hint() {
    return 'Введите строку длиной 1–255 знаков';
  }

  static get name() {
    return 'Краткое название';
  }

  static get field() {
    return 'shortName';
  }

  constructor(value) {
    if (!ShortName.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать КраткНазв. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new ShortName(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default ShortName;
