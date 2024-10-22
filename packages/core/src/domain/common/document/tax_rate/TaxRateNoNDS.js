class TaxRateNoNDS {
  static get title() {
    return 'Без НДС';
  }

  static get value() {
    return '-1';
  }

  static calculate() {
    return 0;
  }
}

export default TaxRateNoNDS;
