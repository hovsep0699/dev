/*
<СведТов ...>
  <СумНал>
    <СумНал>555</СумНал>
  </СумНал>
</СведТов>
*/
class AmountOfTax {
  static get REG_EXP() {
    return new RegExp('^[0-9]{1,19}([.][0-9]{1,2})?$');
  }

  static validate(value) {
    return value && !AmountOfTax.REG_EXP.test(value) ? 'Введите число в формате 19.2' : undefined;
  }

  static isValid(value) {
    return !AmountOfTax.validate(value);
  }

  static mask(value) {
    if (!value && value !== 0) return '';
    return `${value}`.replace(/[^\d.]/g, '')
      .replace(/^([^.]*[.])|[.]/g, '$1');
  }

  static get hint() {
    return 'Введите сумму налога';
  }

  static get placeholder() {
    return '0.00';
  }

  static get name() {
    return 'Сумма налога';
  }

  static get field() {
    return 'amountOfTax';
  }

  constructor(value) {
    this._value = `${value}`;
  }

  get value() {
    return this._value;
  }
}

export default AmountOfTax;
