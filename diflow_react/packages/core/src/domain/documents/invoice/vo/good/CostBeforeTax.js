/*
<СведТов СтТовБезНДС="88">
*/
class CostBeforeTax {
  static get REG_EXP() {
    return new RegExp('^[0-9]{1,19}([.][0-9]{1,2})?$');
  }

  static validate(value) {
    return value && !CostBeforeTax.REG_EXP.test(value) ? 'Введите число в формате 19.2' : undefined;
  }

  static isValid(value) {
    return !CostBeforeTax.validate(value);
  }

  static mask(value) {
    if (!value && value !== 0) return '';
    return `${value}`.replace(/[^\d.]/g, '')
      .replace(/^([^.]*[.])|[.]/g, '$1');
  }

  static get hint() {
    return 'Введите стоимость товара без НДС';
  }

  static get placeholder() {
    return '0.00';
  }

  static get name() {
    return 'Стоимость без налога';
  }

  static get field() {
    return 'costBeforeTax';
  }

  constructor(value) {
    this._value = `${value}`;
  }

  get value() {
    return this._value;
  }
}

export default CostBeforeTax;
