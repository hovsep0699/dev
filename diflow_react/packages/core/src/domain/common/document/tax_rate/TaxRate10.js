class TaxRate10 {
  static get title() {
    return '10%';
  }

  static get value() {
    return '10';
  }

  static calculate(cost) {
    let numberCost = parseFloat(cost);
    numberCost = numberCost && numberCost > 0 ? numberCost : 0;
    return Math.floor(numberCost * TaxRate10.value) / 100;
  }
}

export default TaxRate10;
