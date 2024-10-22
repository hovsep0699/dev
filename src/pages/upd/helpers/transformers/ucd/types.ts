export type Errors = string[];

export type DTOUCDError = {
  invoiceCorrection?: {
    number?: { errors: Errors };
    date?: { errors: Errors };
  };
  factActivity3?: {
    operationInformation?: { errors: Errors };
    transferDocuments?: { name?: { errors: Errors } }[];
    basisDocuments?: { name?: { errors: Errors } }[];
  };
  table?: {
    goods?: { count?: { after?: { errors: Errors } } }[];
  };
};

export type DTOUCDFromData = {
  purpose: string;
  force: boolean;
  document: {
    invoiceCorrection: {
      date: Nullable<string>;
      number: Nullable<string>;
      buyer: any;
      seller: any;
      factActivity3: {
        basisDocuments: Nullable<string>;
        transferDocuments: Nullable<string>;
        operationInformation: Nullable<string>;
        additionalInformation: Nullable<string>;
      };
      infoField: {
        attributeValues: any[];
      };
      information: {
        currencyName: Nullable<string>;
        governmentContractId: Nullable<string>;
      };
    };
    table: any;
  };
};

export type DTOUCDPackage = {
  id: number;
  container: any;
  type: 'OUT' | 'IN';
  from: any;
  to: any;
};

export type DTOUCDParameters = {
  ormatVersion: string;
  purpose: string;
  factActivityName: Nullable<any>;
  economicSubjectName: any;
  name: Nullable<string>;
  invoice: {
    buyers: any;
    number: any;
    date: any;
    currencyCode: any;
    information: { currencyName: any };
  };
  table: {
    goods: any[];
  };
};

export type DTOUCDDocument = {
  id: number;
  title: Nullable<string>;
  correct: boolean;
  parentId: Nullable<number>;
  createdAt: string;
  fileName: string;
  formData: Nullable<DTOUCDFromData>;
  legalDate: string;
  linkedPackages: Nullable<any>;
  package: DTOUCDPackage;
  parameters: DTOUCDParameters;
  type: {
    id: number;
    title: string;
    systemName: 'on_nschfdoppr' | 'on_schfdoppr';
  };
  status: {
    title: string;
    systemName: string;
  };
};

export type UCDDocumentSchema = {
  name?: Nullable<string>;
  invoiceCorrectionNumber: Nullable<string>;
  invoiceCorrectionDate: Nullable<string>;
  governmentContractId: Nullable<string>;
  currencyString: Nullable<string>;
  factActivity: Nullable<string>;
  purpose: Nullable<{ label: string; value: string }>;
  attributeValues: { attribute: Nullable<string>; value: Nullable<string> }[];
  seller: { companyName: string; address: string; innkpp: string };
  buyer: { companyName: string; address: string; innkpp: string };
  transferDocuments: { name?: string; number?: string; date?: string; information?: string }[];
  basisDocuments: { name?: string; number?: string; date?: string; information?: string }[];
  additionalInformation: string;
  operationInformation: string;
};

// table schema
// --------------------
export type BeforeAfter = {
  before: string | Record<string, any>;
  after: string | Record<string, any>;
  increase?: Nullable<string>;
  decrease?: Nullable<string>;
};

export type UCDTableGoodSchema = {
  row: string;
  rowType?: string;
  title?: string;
  infoFields?: any[];
  count: BeforeAfter;
  price: BeforeAfter;
  excise: BeforeAfter;
  taxRate: BeforeAfter;
  amountOfTax: BeforeAfter;
  costAfterTax: BeforeAfter;
  costBeforeTax: BeforeAfter;
  measurement?: BeforeAfter;
  measurementCode?: string;
  identificationNumbers?: any;
  information: {
    sort?: string;
    code?: string;
    article?: string;
    tracking?: any;
    kindCode?: string;
    description?: string;
    measurementTitle?: string;
  };
};

export type UCDTableGoodsSchema = UCDTableGoodSchema[];

export type UCDTableSchema = {
  goods: UCDTableGoodsSchema;
  totalIncrease: {};
  totalDecrease: {};
};
