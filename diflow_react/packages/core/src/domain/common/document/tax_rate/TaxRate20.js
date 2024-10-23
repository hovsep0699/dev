class TaxRate20 {
  static get title() {
    return '20%';
  }

  static get value() {
    return '20';
  }

  static calculate(cost) {
    let numberCost = parseFloat(cost);
    numberCost = numberCost && numberCost > 0 ? numberCost : 0;
    return Math.floor(numberCost * TaxRate20.value) / 100;
  }
}

export default TaxRate20;
