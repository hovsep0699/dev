/*
  Отчество A(атрибут) текст(1-60)
 */
class Patronymic {
  static get REG_EXP() {
    return new RegExp('^.{1,60}$');
  }

  static validate(value) {
    return value && !Patronymic.REG_EXP.test(value) ? 'Введите строку длиной 1-60 знаков' : undefined;
  }

  static isValid(value) {
    return !Patronymic.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 60);
  }

  static get placeholder() {
    return 'Введите отчество';
  }

  static get hint() {
    return 'Введите строку длиной до 60 знаков';
  }

  static get name() {
    return 'Отчество';
  }

  static get field() {
    return 'patronymic';
  }

  constructor(value) {
    if (!Patronymic.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать Имя. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new Patronymic(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default Patronymic;
