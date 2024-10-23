/*
  Номер документа - основания (НомОсн), текст(1-255)
 */
class DocNumber {
  static get REG_EXP() {
    return new RegExp('^.{1,255}$');
  }

  static validate(value) {
    return value && !DocNumber.REG_EXP.test(value) ? 'Введите строку длиной 1–255 знаков' : undefined;
  }

  static isValid(value) {
    return !DocNumber.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 255);
  }

  static get placeholder() {
    return 'Введите номер';
  }

  static get hint() {
    return 'Введите строку длиной 1-255 знаков';
  }

  static get name() {
    return 'Номер';
  }

  static get field() {
    return 'number';
  }

  constructor(value) {
    if (!DocNumber.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать "Номер документа - основания". Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new DocNumber(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default DocNumber;
