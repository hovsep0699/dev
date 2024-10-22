/*
  Значение(Значен) A(атрибут) текст(1-2000)
 */
class TextInfoValue {
  static get REG_EXP() {
    return new RegExp('^.{1,2000}$');
  }

  static validate(value) {
    return TextInfoValue.REG_EXP.test(value) ? undefined : 'Введите строку длиной 1–2000 знаков';
  }

  static isValid(value) {
    return !TextInfoValue.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 2000);
  }

  static get placeholder() {
    return 'Введите значение';
  }

  static get hint() {
    return 'Введите строку длиной 1–2000 знаков';
  }

  static get name() {
    return 'Значение';
  }

  static get field() {
    return 'value';
  }

  constructor(value) {
    if (!TextInfoValue.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать Значение. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new TextInfoValue(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default TextInfoValue;
