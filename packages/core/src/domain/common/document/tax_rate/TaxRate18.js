class TaxRate18 {
  static get title() {
    return '18%';
  }

  static get value() {
    return '18';
  }

  static calculate(cost) {
    let numberCost = parseFloat(cost);
    numberCost = numberCost && numberCost > 0 ? numberCost : 0;
    return Math.floor(numberCost * TaxRate18.value) / 100;
  }
}

export default TaxRate18;
