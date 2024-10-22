import { Calculator } from '../../utils/Calculator';

export const isChangeSumma = (name: string) => {
  return ['taxRate'].indexOf(name) !== -1;
};

export type Value = string | number;

export type AutoSumma<T> = {
  goods: T;
  total: {
    totalCostBeforeTax: string;
    totalCostAfterTax: string;
    totalAmountOfTax: string;
    totalNetto: string;
  };
};

export function getAutoSumma<T>(rows: T[]): AutoSumma<T> {
  const table: any = {
    goods: [],
    total: {
      totalCostBeforeTax: '0.00',
      totalCostAfterTax: '0.00',
      totalAmountOfTax: '0.00',
      totalNetto: '0.00'
    }
  };

  if (!Array.isArray(rows)) {
    return table;
  }

  const summary = (val1: Value, val2: Value): string => {
    return Number.parseFloat(String(Number(val1) + Number(val2))).toFixed(2);
  };

  return rows.reduce((prev: any, row: any) => {
    const { totalCostBeforeTax, totalAmountOfTax, totalCostAfterTax } = prev.total;
    const { taxRate, count, price } = row;

    const costBeforeTax = Calculator.costBeforeTax(count, price);
    const amountOfTax = Calculator.amountOfTax(taxRate, costBeforeTax);
    const costAfterTax = Calculator.costAfterTax(costBeforeTax, taxRate, amountOfTax);

    prev.total.totalCostBeforeTax = summary(totalCostBeforeTax, costBeforeTax);
    prev.total.totalCostAfterTax = summary(totalCostAfterTax, costAfterTax);
    prev.total.totalAmountOfTax = summary(totalAmountOfTax, amountOfTax);
    prev.goods.push({
      ...row,
      costBeforeTax,
      costAfterTax,
      amountOfTax
    });

    return prev;
  }, table);
}
