/*
   <СвСчФакт НомерСчФ="1НОМЕР ДОКУМЕНТА">
   НомерСчФ А текст(1-1000)
   Для Функция=ДОП может принимать значение б/н(без номер)
*/
class Num {
  static get REG_EXP() {
    return new RegExp('^.{1,1000}$');
  }

  static validate(value) {
    return value && Num.REG_EXP.test(value) ? undefined : 'Введите строку длиной 1–1000 знаков';
  }

  static isValid(value) {
    return !Num.validate(value);
  }

  static mask(value) {
    return value && value.slice(0, 1000);
  }

  static get placeholder() {
    return 'Введите номер';
  }

  static get hint() {
    return 'Введите строку длиной 1–1000 знаков';
  }

  static get name() {
    return 'Номер';
  }

  static get field() {
    return 'number';
  }

  constructor(num = '') {
    if (!Num.isValid(`${num}`)) {
      this._error = new Error('Невозможно создать НомерСчФ. Формат не верен.');
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
