/*
<СведТов КолТов="123">
*/
class Num {
  static get REG_EXP() {
    return new RegExp('^[0-9]{1,26}(.[0-9]{1,11})?$');
  }

  static validate(value) {
    return value && !Num.REG_EXP.test(value) ? 'Введите число длиной до 26 знаков' : undefined;
  }

  static isValid(value) {
    return !Num.validate(value);
  }

  static mask(value) {
    if (!value && value !== 0) return '';
    return `${value}`.replace(/[^\d.]/g, '')
      .replace(/^([^.]*[.])|[.]/g, '$1');
  }

  static get hint() {
    return 'Введите количество';
  }

  static get placeholder() {
    return '-';
  }

  static get name() {
    return 'Кол-во';
  }

  static get field() {
    return 'count';
  }

  constructor(value) {
    this._value = `${value}`;
  }

  get value() {
    return this._value;
  }
}

export default Num;
