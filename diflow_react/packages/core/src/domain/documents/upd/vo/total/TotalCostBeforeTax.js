import CostBeforeTax from '../good/CostBeforeTax';

class TotalCostBeforeTax {
  static get placeholder() {
    return '0.00';
  }

  static get field() {
    return 'totalCostBeforeTax';
  }

  static get aggregatedField() {
    return CostBeforeTax.field;
  }

  static calculate(...args) {
    return args.reduce((acc, arg) => (!Number.isNaN(+arg) ? acc + Math.floor(arg * 100) / 100 : acc), 0);
  }

  constructor(totalCost) {
    this.value = totalCost;
  }

  clone() {
    return new TotalCostBeforeTax(this.value);
  }

  set value(arg) {
    this._value = Number.isNaN(+arg) ? '' : `${Math.floor(+arg * 100) / 100}`;
  }

  get value() {
    return `${this._value}`;
  }
}

export default TotalCostBeforeTax;
