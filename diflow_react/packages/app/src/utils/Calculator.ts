export const Calculator = {
  adaptTaxRate(taxRate: any) {
    return Number(taxRate) === -1 ? 0 : taxRate;
  },
  toNumber(value: string) {
    return parseFloat(value) || 0;
  },
  costBeforeTax(count: string, price: string) {
    const _count = Calculator.toNumber(count);
    const _price = Calculator.toNumber(price);

    return (_count * _price).toFixed(2) || '';
  },
  amountOfTax(taxRate: any, cost: any) {
    taxRate = Calculator.adaptTaxRate(taxRate);
    const _tax = parseInt(taxRate);
    const _cost = Calculator.toNumber(cost);
    if (_tax > 100) {
      return ((_cost / _tax) * (_tax - 100)).toFixed(2) || 0;
    }

    return ((_cost * _tax) / 100).toFixed(2) || 0;
  },
  costAfterTax(costBeforeTaxes: any, taxRate: any, amountOfTax: any) {
    taxRate = Calculator.adaptTaxRate(taxRate);
    const _cost_before = Calculator.toNumber(costBeforeTaxes);
    const _tax_rate = parseInt(taxRate);
    const _tax = Calculator.toNumber(amountOfTax);

    if (_tax_rate > 100) {
      return _cost_before.toFixed(2) || '';
    }

    return (_cost_before + _tax).toFixed(2) || '';
  }
};
