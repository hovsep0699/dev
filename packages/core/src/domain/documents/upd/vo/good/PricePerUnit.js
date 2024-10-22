/*
<СведТов ЦенаТов="88">
*/
class PricePerUnit {
  static get REG_EXP() {
    return new RegExp('^[0-9]{1,26}([.][0-9]{1,11})?$');
  }

  static validate(value) {
    return value && !PricePerUnit.REG_EXP.test(value) ? 'Введите число в формате 26.11' : undefined;
  }

  static isValid(value) {
    return !PricePerUnit.validate(value);
  }

  static mask(value) {
    if (!value && value !== 0) return '';
    return `${value}`.replace(/[^\d.]/g, '')
      .replace(/^([^.]*[.])|[.]/g, '$1');
  }

  static get hint() {
    return 'Введите стоимость за единицу измерения';
  }

  static get placeholder() {
    return '-';
  }

  static get name() {
    return 'Цена за ед.';
  }

  static get field() {
    return 'price';
  }

  constructor(value) {
    this._value = `${value}`;
  }

  get value() {
    return this._value;
  }
}

export default PricePerUnit;
