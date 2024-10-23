/*
  К платежно-расчетному документу (Номер)
  XML:
  <СвПРД СуммаПРД="567.45" НомерПРД="К платёжному документу4" ДатаПРД="23.09.2019"/>
*/
class Num {
  static get REG_EXP() {
    return new RegExp('^.{1,30}$');
  }

  static validate(value) {
    return value && Num.REG_EXP.test(value) ? undefined : 'Введите строку длиной 1–30 знаков';
  }

  static isValid(value) {
    return !Num.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 30);
  }

  static get placeholder() {
    return 'Введите номер';
  }

  static get hint() {
    return 'Введите строку длиной 1–30 знаков';
  }

  static get name() {
    return 'Номер';
  }

  static get field() {
    return 'number';
  }

  constructor(num) {
    if (!Num.isValid(`${num}`)) {
      this._error = new Error('Невозможно создать НомерПРД. Формат не верен.');
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
