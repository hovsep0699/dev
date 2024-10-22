class TaxRate18_118 {
  static get title() {
    return '18/118';
  }

  static get value() {
    return '118';
  }

  static calculate(cost) {
    let numberCost = parseFloat(cost);
    numberCost = numberCost && numberCost > 0 ? numberCost : 0;
    return Math.floor(numberCost / TaxRate18_118.value * (TaxRate18_118.value - 100) * 100) / 100;
  }
}

export default TaxRate18_118;
