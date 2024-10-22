/*
   Регистрационный номер партии товаров (НомТовПрослеж)
*/
class Num {
  static get REG_EXP() {
    return new RegExp('^.{1,29}$');
  }

  static validate(value) {
    return !value || !Num.REG_EXP.test(value) ? 'Введите строку длиной 1–29 знаков' : undefined;
  }

  static isValid(value) {
    return !Num.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 29);
  }

  static get placeholder() {
    return 'Введите номер';
  }

  static get hint() {
    return 'Введите строку длиной 1–29 знаков';
  }

  static get name() {
    return 'Регистрационный номер партии товаров';
  }

  static get field() {
    return 'number';
  }

  constructor(num = '') {
    if (!Num.isValid(`${num}`)) {
      this._error = new Error('Невозможно создать НомТовПрослеж. Формат не верен.');
    } else {
      this._error = null;
    }
    this._value = `${num}`;
  }

  clone() {
    return new Num(this.value);
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }
}

export default Num;
