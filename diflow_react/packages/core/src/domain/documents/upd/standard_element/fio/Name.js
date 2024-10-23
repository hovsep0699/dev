/*
  Имя A(атрибут) текст(1-60)
 */
class Name {
  static get REG_EXP() {
    return new RegExp('^.{1,60}$');
  }

  static validate(value) {
    return !value || !Name.REG_EXP.test(value) ? 'Введите строку длиной 1-60 знаков' : undefined;
  }

  static isValid(value) {
    return !Name.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 60);
  }

  static get placeholder() {
    return 'Введите имя';
  }

  static get hint() {
    return 'Введите строку длиной до 60 знаков';
  }

  static get name() {
    return 'Имя';
  }

  static get field() {
    return 'name';
  }

  constructor(value) {
    if (!Name.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать Имя. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new Name(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default Name;
