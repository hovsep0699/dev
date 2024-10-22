import {
  DTOUCDDocument,
  UCDTableGoodsSchema,
  UCDTableGoodSchema,
  UCDTableSchema,
  BeforeAfter
} from './types';
import { isObject } from '../../../../../utils/ObjectUtil';

/**
 * Преобразует формат "сервера" в формат "фронтенда".
 * Возвращает данные таблицы коррекционного документа.
 *
 * @param UCD Данные полученные от сервера
 */
export const transformerDTOUCDTable = (UCD: DTOUCDDocument) => {
  const table = UCD.formData ? UCD.formData.document.table : UCD.parameters.table;
  return parseTable(table);
};

const parseTable = (table: any): UCDTableSchema => {
  if (!Array.isArray(table.goods)) {
    table.goods = [];
  }

  const reducerGoods = (
    prev: UCDTableGoodSchema[],
    good: Record<string, any>,
    index: number
  ): UCDTableGoodsSchema => {
    const row = String(index + 1);

    prev.push({
      row,
      title: good.title,
      infoFields: good.infoFields,
      count: createBeforeAfter(good.count),
      price: createBeforeAfter(good.price, true),
      excise: createBeforeAfter(good.excise, true),
      taxRate: createBeforeAfter(good.taxRate),
      amountOfTax: createBeforeAfter(good.amountOfTax, true),
      costAfterTax: createBeforeAfter(good.costAfterTax, true),
      costBeforeTax: createBeforeAfter(good.costBeforeTax, true),
      measurement: getMeasurement(good),
      identificationNumbers: parseNumbers(good?.information?.identificationNumbers),
      information: {
        sort: good?.information?.sort,
        code: good?.information?.code,
        article: good?.information?.article,
        tracking: good?.information?.tracking,
        kindCode: good?.information?.kindCode,
        description: good?.information?.description
      }
    });

    return prev;
  };

  return {
    goods: table.goods.reduce(reducerGoods, []),
    totalIncrease: {
      beforeTax: '0.00',
      amountOfTax: '0.00',
      afterTax: '0.00',
      ...table.totalIncrease
    },
    totalDecrease: {
      beforeTax: '0.00',
      amountOfTax: '0.00',
      afterTax: '0.00',
      ...table.totalDecrease
    }
  };
};

function createBeforeAfter(val: any, float = false): BeforeAfter {
  if (isObject(val) && val.hasOwnProperty('before') && val.hasOwnProperty('after')) {
    val.after = parseValue(val.after, float);
    val.before = parseValue(val.before, float);

    if (val.hasOwnProperty('increase') && val.increase === null) {
      val.increase = parseValue(val.increase, float);
    }

    if (val.hasOwnProperty('decrease') && val.decrease === null) {
      val.decrease = parseValue(val.decrease, float);
    }

    return val as BeforeAfter;
  } else if (isObject(val)) {
    return { before: val, after: val };
  }

  return { before: parseValue(val, float), after: parseValue(val, float) };
}

function parseValue(value: any, float = false): string {
  if (value === null) {
    return '0.00';
  }

  if (float) {
    return Number.parseFloat(String(value)).toFixed(2);
  }

  return String(value);
}

function parseNumbers(numbers: any[]) {
  if (!Array.isArray(numbers) || !numbers) {
    return null;
  }

  return numbers.map(({ numbers: { type, collection }, packNumber }) => {
    const data: Record<string, unknown> = {};
    switch (type) {
      case '1':
        const label1 = [];
        label1.push('Уникальный идентификатор вторичной (потребительской)/третичной');
        label1.push('(заводской, транспортной) упаковки');

        data.idetificationNumbers = createBeforeAfter(collection);
        data.type = createBeforeAfter({ value: '2', label: label1.join(' ') });
        break;
      case '2':
        const label2 = ['Контрольный идентификационный знак'];

        data.packNumbers = createBeforeAfter(collection);
        data.type = createBeforeAfter({ value: '1', label: label2.join(' ') });
        break;
    }

    return {
      ...data,
      packageIdentifier: createBeforeAfter(packNumber)
    };
  });
}

function getMeasurement({
  measurement,
  measurementCode,
  information: { measurementTitle }
}: Record<string, any>) {
  if (
    isObject(measurement) &&
    isObject(measurementTitle) &&
    measurement.hasOwnProperty('before') &&
    measurementTitle.hasOwnProperty('before')
  ) {
    return {
      before: { value: measurement.befor, label: measurementTitle.before },
      after: { value: measurement.after, label: measurementTitle.after }
    };
  }

  return createBeforeAfter({ value: measurementCode, label: measurementTitle });
}
