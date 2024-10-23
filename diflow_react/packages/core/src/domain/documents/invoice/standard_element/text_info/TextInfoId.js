/*
  Идентификатор(Идентиф) A(атрибут) текст(1-50)
*/
class TextInfoId {
  static get REG_EXP() {
    return new RegExp('^.{1,50}$');
  }

  static validate(value) {
    return !value || !TextInfoId.REG_EXP.test(value) ? 'Введите строку длиной 1–50 знаков' : undefined;
  }

  static isValid(value) {
    return !TextInfoId.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 50);
  }

  static get placeholder() {
    return 'Введите идентификатор';
  }

  static get hint() {
    return 'Введите строку длиной 1–50 знаков';
  }

  static get name() {
    return 'Идентификатор';
  }

  static get field() {
    return 'attribute';
  }

  constructor(value) {
    if (!TextInfoId.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать Идентификатор. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new TextInfoId(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default TextInfoId;
