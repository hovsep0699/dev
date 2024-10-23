/*
<СведТов СтТовУчНал="5555">
*/
class CostAfterTax {
  static get REG_EXP() {
    return new RegExp('^[0-9]{1,19}([.][0-9]{1,2})?$');
  }

  static validate(value) {
    return value && !CostAfterTax.REG_EXP.test(value) ? 'Введите число в формате 19.2' : undefined;
  }

  static isValid(value) {
    return !CostAfterTax.validate(value);
  }

  static mask(value) {
    if (!value && value !== 0) return '';
    return `${value}`.replace(/[^\d.]/g, '')
      .replace(/^([^.]*[.])|[.]/g, '$1');
  }

  static get hint() {
    return 'Введите стоимость товаров с учётом налога';
  }

  static get placeholder() {
    return '0.00';
  }

  static get name() {
    return 'Стоимость c налогом';
  }

  static get field() {
    return 'costAfterTax';
  }

  constructor(value) {
    this._value = `${value}`;
  }

  get value() {
    return this._value;
  }
}

export default CostAfterTax;
