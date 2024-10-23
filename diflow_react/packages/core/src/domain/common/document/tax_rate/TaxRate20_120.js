class TaxRate20_120 {
  static get title() {
    return '20/120';
  }

  static get value() {
    return '120';
  }

  static calculate(cost) {
    let numberCost = parseFloat(cost);
    numberCost = numberCost && numberCost > 0 ? numberCost : 0;
    return Math.floor(numberCost / TaxRate20_120.value * (TaxRate20_120.value - 100) * 100) / 100;
  }
}

export default TaxRate20_120;
