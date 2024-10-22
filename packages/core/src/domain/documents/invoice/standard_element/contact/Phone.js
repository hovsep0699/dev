/*
  Номер контактного телефона/факс(Тлф) A(атрибут) текст(1-255)
 */
class Phone {
  static get REG_EXP() {
    return new RegExp('^.{1,255}$');
  }

  static validate(value) {
    return value && !Phone.REG_EXP.test(value) ? 'Введите строку длиной 1–255 знаков' : undefined;
  }

  static isValid(value) {
    return !Phone.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 255);
  }

  static get placeholder() {
    return 'Введите телефон';
  }

  static get hint() {
    return 'Введите строку длиной 1–255 знаков';
  }

  static get name() {
    return 'Номер контактного телефона/факс';
  }

  static get field() {
    return 'phone';
  }

  constructor(value) {
    if (!Phone.isValid(`${value}`)) {
      this._error = new Error('Невозможно создать номер телефона. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${value}`;
  }

  clone() {
    return new Phone(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default Phone;
