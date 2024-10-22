import get from 'lodash.get';
import set from 'lodash.set';

export function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}
// TODO: удалить
export type IncreaseDecreaseData = {
  before?: string | number;
  after?: string | number;
};

export type IncreaseDecreaseResult = {
  increase: string;
  decrease: string;
} & IncreaseDecreaseData;

export const getIncreaseDecrease = (data: IncreaseDecreaseData = {}): IncreaseDecreaseResult => {
  let { before = 0, after = 0 } = data;

  let increase = +Number(after) - +Number(before);
  let decrease = 0;

  if (increase <= 0) {
    increase = 0;
    decrease = Number(before) - Number(after);
  }

  return {
    after: String(after),
    before: String(before),
    increase: String(increase),
    decrease: String(decrease)
  };
};
// ------- the end --------

export const inBlurCalculator = (name: string) => {
  const changeFields = [
    'count.after',
    'count.before',
    'price.after',
    'price.before',
    'excise.after',
    'excise.before',
    'taxRate.after',
    'taxRate.before',
    'costBeforeTax.after',
    'costBeforeTax.before'
  ];

  return changeFields.indexOf(name) !== -1;
};

export const isChangeCalculator = (name: string) => {
  const changeFields = [
    'count.after',
    'count.before',
    'price.after',
    'price.before',
    'excise.after',
    'excise.before',
    'taxRate.after',
    'taxRate.before',
    'costBeforeTax.after',
    'costBeforeTax.before'
  ];

  return changeFields.indexOf(name) !== -1;
};

export const getSummary = (val1: string | number, val2: string | number): string => {
  return Number.parseFloat(String(Number(val1) + Number(val2))).toFixed(2);
};

export const getFloat = (data: Record<string, unknown>, fieldName: string) => {
  const value = get(data, fieldName, '0.00');
  return Number.parseFloat(String(value)).toFixed(2);
};

const checkIsBeforeAfter = (val: unknown): val is BeforeAfter => {
  return (
    !Array.isArray(val) &&
    typeof val === 'object' &&
    val !== null &&
    val.hasOwnProperty('before') &&
    val.hasOwnProperty('after')
  );
};

const updateIncreaseDecrease = (prop: IncreaseDecrease): void => {
  if (!checkIsBeforeAfter(prop)) {
    return;
  }

  const before = parseFloat(prop.before) || 0;
  const after = parseFloat(prop.after) || 0;

  let increase = +after - +before;
  let decrease = 0;

  if (increase > 0) {
    prop.increase = Number.parseFloat(String(increase)).toFixed(2);
    prop.decrease = Number.parseFloat(String(decrease)).toFixed(2);
  } else {
    prop.increase = Number.parseFloat('0').toFixed(2);
    prop.decrease = Number.parseFloat(String(before - after)).toFixed(2);
  }
};

export type TotalFields = {
  beforeTax: string;
  afterTax: string;
  amountOfTax: string;
  excise: string;
};

export type AutoSumma<T> = {
  totalIncrease: TotalFields;
  totalDecrease: TotalFields;
  goods: T[];
};

export type BeforeAfter = {
  after: string;
  before: string;
};

export type IncreaseDecrease = {
  decrease?: string;
  increase?: string;
} & BeforeAfter;

export type AutoGood = {
  excise: IncreaseDecrease;
  amountOfTax: IncreaseDecrease;
  costAfterTax: IncreaseDecrease;
  costBeforeTax: IncreaseDecrease;
  count: BeforeAfter;
  price: BeforeAfter;
  taxRate: BeforeAfter;
  title: string;
  row: string;
  rowType?: 'edit';
};

/**
 * Получить цену без НДС
 */
export function getPriceWithoutVAT(good: AutoGood, type: keyof BeforeAfter): string {
  const count = parseFloat(good.count[type]) || 0;
  const price = parseFloat(good.price[type]) || 0;
  return (count * price).toFixed(2) || Number(0).toFixed(2);
}

/**
 * Получить сумму НДС
 */
export function getVAT(good: AutoGood, type: keyof BeforeAfter): string {
  const cost = parseFloat(good.costBeforeTax[type]) || 0;
  const taxRate = good.taxRate;

  let vat = 0;
  let tax = !taxRate[type] || Number(taxRate[type]) < 0 ? 0 : parseInt(taxRate[type]);

  if (tax > 100) {
    vat = (cost / tax) * (tax - 100);
  } else {
    vat = (cost * tax) / 100;
  }

  return Number(vat).toFixed(2);
}

/**
 * Получить общую сумму с НДС
 */
export function getAllPrice(good: AutoGood, type: keyof BeforeAfter): string {
  const taxRate = Number(good.taxRate[type]) < 0 ? 0 : parseInt(good.taxRate[type]);
  if (['110', '118', '120'].indexOf(String(taxRate)) === -1) {
    const price = parseFloat(good.costBeforeTax[type]) || 0;
    const tax = parseFloat(good.amountOfTax[type]) || 0;
    return (price + tax).toFixed(2);
  }

  return Number(good.costBeforeTax[type] || 0).toFixed(2);
}

/**
 * Автоматический подсчет строки
 */
export function getAutoGoods(goods: AutoGood[]): AutoGood[] {
  const reducer = (prev: AutoGood[], good: AutoGood) => {
    // стоимость без НДС
    set(good, 'costBeforeTax.before', getPriceWithoutVAT(good, 'before'));
    set(good, 'costBeforeTax.after', getPriceWithoutVAT(good, 'after'));

    // НДС
    set(good, 'amountOfTax.before', getVAT(good, 'before'));
    set(good, 'amountOfTax.after', getVAT(good, 'after'));

    // Всего
    set(good, 'costAfterTax.before', getAllPrice(good, 'before'));
    set(good, 'costAfterTax.after', getAllPrice(good, 'after'));

    // Увеличение и Уменьшение
    updateIncreaseDecrease(good.costBeforeTax);
    updateIncreaseDecrease(good.costAfterTax);
    updateIncreaseDecrease(good.amountOfTax);
    updateIncreaseDecrease(good.excise);

    prev.push(good);
    return prev;
  };

  return goods.reduce(reducer, []);
}
// -------------------------------

/**
 * Суммирование итогов
 * в таблице
 */
export type AutoTotal = {
  totalIncrease: TotalFields;
  totalDecrease: TotalFields;
};

export function getAutoTotal(goods: any[], defaultValue: any = {}): AutoTotal {
  const { goods: goodsDefault } = defaultValue;
  const fields: TotalFields = {
    beforeTax: '0.00',
    afterTax: '0.00',
    amountOfTax: '0.00',
    excise: '0.00'
  };

  const commonGoods = mergeGoods(goods, goodsDefault);

  const reducer = (prev: AutoTotal, curr: any) => {
    const { totalDecrease, totalIncrease } = prev;

    totalDecrease.beforeTax = getSummary(totalDecrease.beforeTax, curr.costBeforeTax.decrease);
    totalDecrease.amountOfTax = getSummary(totalDecrease.amountOfTax, curr.amountOfTax.decrease);
    totalDecrease.afterTax = getSummary(totalDecrease.afterTax, curr.costAfterTax.decrease);

    totalIncrease.beforeTax = getSummary(totalIncrease.beforeTax, curr.costBeforeTax.increase);
    totalIncrease.amountOfTax = getSummary(totalIncrease.amountOfTax, curr.amountOfTax.increase);
    totalIncrease.afterTax = getSummary(totalIncrease.afterTax, curr.costAfterTax.increase);

    return prev;
  };

  const totalGoods = commonGoods.reduce<AutoTotal>(reducer, {
    totalIncrease: { ...fields },
    totalDecrease: { ...fields }
  });

  const { totalIncrease, totalDecrease } = totalGoods;
  const amountOfTax = getTotal(totalIncrease.amountOfTax, totalDecrease.amountOfTax);
  const beforeTax = getTotal(totalIncrease.beforeTax, totalDecrease.beforeTax);
  const afterTax = getTotal(totalIncrease.afterTax, totalDecrease.afterTax);

  return {
    totalIncrease: {
      amountOfTax: amountOfTax.increase,
      beforeTax: beforeTax.increase,
      afterTax: afterTax.increase
    },
    totalDecrease: {
      amountOfTax: amountOfTax.decrease,
      beforeTax: beforeTax.decrease,
      afterTax: afterTax.decrease
    }
  } as AutoTotal;
}
// --------------------------------

export const mergeGoods = (...goods: any[]): any[] => {
  const common: any[] = [];
  const [currents = [], defaults = []] = goods;

  currents.forEach((current: any) => common.push(current));

  // проверяем были удалены товары или нет
  defaults.forEach((productDefault: any) => {
    const productCurrent = currents.findIndex((product: any) => {
      const { row, costBeforeTax, costAfterTax, amountOfTax } = productDefault;
      return (
        row === product.row &&
        costBeforeTax.before === product.costBeforeTax.before &&
        costAfterTax.before === product.costAfterTax.before &&
        amountOfTax.before === product.amountOfTax.before
      );
    });

    if (productCurrent === -1) {
      // Если продукт не найден то добавляем его в общий список
      productDefault.costBeforeTax.decrease = productDefault.costBeforeTax.before;
      productDefault.costAfterTax.decrease = productDefault.costAfterTax.before;
      productDefault.amountOfTax.decrease = productDefault.amountOfTax.before;

      common.push(productDefault);
    }
  });

  return common;
};

export const getTotal = (
  increase: string,
  decrease: string
): { increase: string; decrease: string } => {
  const a = Number.parseFloat(increase);
  const b = Number.parseFloat(decrease);

  if (a > b && b > 0) {
    increase = (a - b).toFixed(2);
    decrease = '0.00';
  } else if (b > a && a > 0) {
    increase = '0.00';
    decrease = (b - a).toFixed(2);
  }

  return { increase, decrease };
};
