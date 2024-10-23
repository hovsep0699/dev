import get from 'lodash.get';
import { isObject } from '@distate/components/dist/FormSchema';

/**
 * Преобразуется данные корректировки из формата "фронтенда" в формат "бэкенда"
 * для отправки на сервер.
 *
 * @param UCD данные на основе которых формирукется корректировочный документ
 * @param UCDFormData данные корректировки
 */
export const transformerUCDToDTO = (UCD: any, UCDFormData: any) => {
  const {
    package: { from, to },
    parameters,
    formData: data
  } = UCD;
  const isEditUCD = Boolean(data);

  const formData = JSON.parse(JSON.stringify(UCDFormData.formData));
  const formTable = JSON.parse(JSON.stringify(UCDFormData.formTable));

  const document = isEditUCD ? data.document : parameters;
  const purpose = isObject(formData.purpose) ? formData.purpose.value : null;

  const invoiceDate = getDate(document);
  const invoiceNumber = getNumber(document);

  const currencyCode = getCurrencyCode(document);
  const currencyName = getCurrencyName(document);

  return {
    to: getToFrom(to),
    from: getToFrom(from),
    force: Boolean(UCDFormData.force),
    purpose,
    document: {
      table: getTable(formTable),
      economicSubjectName: document.economicSubjectName,
      invoiceCorrection: {
        infoField: { attributeValues: formData.attributeValues },
        number: formData.invoiceCorrectionNumber,
        date: formData.invoiceCorrectionDate,
        seller: formData.seller,
        buyer: formData.buyer,
        invoices: [{ number: invoiceNumber, date: invoiceDate }],
        currencyCode,
        information: {
          currencyName,
          currencyExchangeRate: null,
          governmentContractId: formData.governmentContractId || null
        }
      },
      factActivity3: {
        additionalInformation: formData.additionalInformation,
        operationInformation: formData.operationInformation,
        transferDocuments: formData.transferDocuments,
        basisDocuments: formData.basisDocuments
      }
    }
  };
};

function getTable(table: Record<string, any>) {
  if (!Array.isArray(table.goods)) {
    table.goods = [];
  }

  if (!table.totalDecrease) {
    table.totalDecrease = {};
  }

  if (!table.totalIncrease) {
    table.totalIncrease = {};
  }

  const tableTotal = normalizeTotal({
    totalIncrease: table.totalIncrease,
    totalDecrease: table.totalDecrease
  });

  return {
    ...tableTotal,
    goods: table.goods.map((data: Record<string, any>, index: number) => {
      const { row, rowType, ...good } = data;

      if (!good.information) {
        good.information = {};
      }

      normalizeIncreaseDecrease(good.costBeforeTax);
      normalizeIncreaseDecrease(good.costAfterTax);
      normalizeIncreaseDecrease(good.amountOfTax);
      normalizeIncreaseDecrease(good.excise);

      if (good.excise.increase === '0.00') {
        good.excise.increase = null;
      }
      if (good.excise.decrease === '0.00') {
        good.excise.decrease = null;
      }

      if (good.excise.after === '0.00' || good.excise.after === 'без акциза') {
        good.excise.after = null;
      }

      if (good.excise.before === '0.00' || good.excise.before === 'без акциза') {
        good.excise.before = null;
      }

      good.taxRate = getTaxRate(good.taxRate);
      good.information.measurementTitle = getMeasurementTitle(good.measurement);
      good.measurement = getMeasurementCode(good.measurement);

      const numbers = good?.identificationNumbers || [];
      good.identificationNumbers = numbers.map(({ type, ...number }: any) => ({
        ...number
      }));

      return { ...good, row: String(index + 1) };
    })
  };
}

function getToFrom(val: Record<string, any>) {
  if (val.division) return { division: val.division.id };
  if (val.person) return { person: val.person.id };
  return val;
}

function getDate(doc: Record<string, any>) {
  const value = get(doc, 'invoice.date');
  return get(doc, 'invoiceCorrection.date', value);
}

function getNumber(doc: Record<string, any>) {
  const value = get(doc, 'invoice.number');
  return get(doc, 'invoiceCorrection.number', value);
}

function getCurrencyCode(doc: Record<string, any>) {
  const value = get(doc, 'invoice.currencyCode');
  return get(doc, 'invoiceCorrection.currencyCode', value);
}

function getCurrencyName(doc: Record<string, any>) {
  const path = 'invoiceCorrection.information.currencyName';
  const value = get(doc, 'invoice.information.currencyName');
  return get(doc, path, value);
}

function getTaxRate(taxRate: Record<string, any> = {}) {
  const { before, after } = taxRate;
  return { before: before, after: after };
}

function getMeasurementCode(measurementCode: Record<string, any>) {
  const { before, after } = measurementCode;
  const normalize = (val: string) => (val === 'NaN' ? null : val);
  return { before: normalize(before.value), after: normalize(after.value) };
}

function getMeasurementTitle(measurementCode: Record<string, any>) {
  const { before, after } = measurementCode;
  const normalize = (val: string) => (val === 'NaN' ? null : val);
  return { before: normalize(before.label), after: normalize(after.label) };
}

function normalizeIncreaseDecrease(data: Record<string, string | null>) {
  if (!data.decrease && !data.increase) {
    data.increase = '0.00';
    data.decrease = null;
  } else if (data.decrease === '0.00' && data.increase === '0.00') {
    data.decrease = null;
  } else if (data.decrease === '0.00' && data.increase !== '0.00') {
    data.decrease = null;
  } else if (data.decrease !== '0.00' && data.increase === '0.00') {
    data.increase = null;
  } else if (!data.decrease) {
    data.decrease = null;
  } else if (!data.increase) {
    data.increase = null;
  }
}

function normalizeTotal({ totalIncrease, totalDecrease }: Record<string, any>) {
  const normalize = (key: string) => {
    if (totalIncrease[key] === null) {
      totalIncrease[key] = '0.00';
    }

    if (totalDecrease[key] === null) {
      totalDecrease[key] = '0.00';
    }
  };

  normalize('afterTax');
  normalize('beforeTax');
  normalize('amountOfTax');

  return { totalIncrease, totalDecrease };
}
