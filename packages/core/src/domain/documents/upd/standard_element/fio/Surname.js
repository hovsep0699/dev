/*
  Фамилия A(атрибут) текст(1-60)
 */
class Surname {
  static get REG_EXP() {
    return new RegExp('^.{1,60}$');
  }

  static validate(value) {
    return !value || !Surname.REG_EXP.test(value) ? 'Введите строку длиной 1-60 знаков' : undefined;
  }

  static isValid(value) {
    return !Surname.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 60);
  }

  static get placeholder() {
    return 'Введите фамилию';
  }

  static get hint() {
    return 'Введите строку длиной до 60 знаков';
  }

  static get name() {
    return 'Фамилия';
  }

  static get field() {
    return 'surname';
  }

  constructor(value) {
    if (!Surname.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать фамилию. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new Surname(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default Surname;
