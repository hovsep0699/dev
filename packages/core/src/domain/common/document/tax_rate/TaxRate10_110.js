class TaxRate10_110 {
  static get title() {
    return '10/110';
  }

  static get value() {
    return '110';
  }

  static calculate(cost) {
    let numberCost = parseFloat(cost);
    numberCost = numberCost && numberCost > 0 ? numberCost : 0;
    return Math.floor(numberCost / TaxRate10_110.value * (TaxRate10_110.value - 100) * 100) / 100;
  }
}

export default TaxRate10_110;
