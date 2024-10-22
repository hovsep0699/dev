import AmountOfTax from '../good/AmountOfTax';

class TotalAmountOfTax {
  static get placeholder() {
    return '0.00';
  }

  static get field() {
    return 'totalAmountOfTax';
  }

  static get aggregatedField() {
    return AmountOfTax.field;
  }

  static calculate(...args) {
    return args.reduce((acc, arg) => (!Number.isNaN(+arg) ? acc + Math.floor(arg * 100) / 100 : acc), 0);
  }

  constructor(totalCost) {
    this.value = totalCost;
  }

  clone() {
    return new TotalAmountOfTax(this.value);
  }

  set value(arg) {
    this._value = Number.isNaN(+arg) ? '' : `${Math.floor(+arg * 100) / 100}`;
  }

  get value() {
    return `${this._value}`;
  }
}

export default TotalAmountOfTax;
