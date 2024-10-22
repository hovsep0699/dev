type Nullable<T extends unknown> = T | null;

type taxRateEnum = [-1, 0, 10, 18, 20, 110, 118, 120];

type UtdGoodTrackingDTO = {
  number: string;
  measurementCode: string;
  measurementTitle: string;
  measurementValue: string;
  additionalIndicator: string;
};

type UtdGoodIdentificationDTO = {
  packNumber: string;
  numbers: Nullable<{
    type: string;
    collection: string[];
  }>;
};

type UtdGoodDTO = {
  title: string;
  measurementCode: Nullable<string>;
  count: Nullable<string>;
  price: Nullable<string>;
  costBeforeTax: Nullable<string>;
  taxRate: Nullable<taxRateEnum>;
  costAfterTax: Nullable<string>;
  excise: Nullable<string>;
  amountOfTax: Nullable<string>;
  declaration: {
    countryCode: Nullable<string>;
    number: Nullable<string>;
  };
  information: {
    kind: Nullable<string>;
    additionalMark: Nullable<string>;
    measurementTitle: Nullable<string>;
    countryShortTitle: Nullable<string>;
    orderedCount: Nullable<string>;
    description: Nullable<string>;
    sort: Nullable<string>;
    article: Nullable<string>;
    code: Nullable<string>;
    catalogCode: Nullable<string>;
    kindCode: Nullable<string>;
    tracking: UtdGoodTrackingDTO[];
    identificationNumbers: UtdGoodIdentificationDTO[];
  };
};

export type UTDFactActivity2DTO = {
  goods: UtdGoodDTO[];
  total: {
    totalCostBeforeTax: Nullable<string>;
    totalCostAfterTax: Nullable<string>;
    totalAmountOfTax: Nullable<string>;
    totalNetto: Nullable<string>;
  };
};

export type ItemData = UTDFactActivity2DTO;

export interface ITableHeader {}

export interface ITableUniversalInvoice {
  errors?: Record<string, any>;
  values?: ItemData;
  onChange?: (values: ItemData) => void;
}

export enum ModalType {
  close = 'close',
  stamp = 'stamp',
  information = 'information',
  infofields = 'info fields'
}
