export type PlaceDTO = {
  division: Nullable<number>;
  person: Nullable<number>;
};

export type PaymentDocument = {
  number: number;
  date: string;
  cost: string;
};

export type DocumentDTO = {
  to: PlaceDTO;
  from: PlaceDTO;
  force: boolean;
  purpose: string;
  document: {
    basisName: Nullable<string>;
    economicSubjectName: string;
    infoFieldsAgreement: Nullable<string>;
    invoice: {
      number: string;
      date: string;
      cargoFrom: Nullable<any>;
      consignee: Nullable<any>;
      paymentDocuments: PaymentDocument[];
      currencyCode: string;
      correction: Nullable<{ date: string; number: string }>;
      information: {
        basis: Nullable<any>;
        currencyName: string;
        currencyExchangeRate: string;
        factory: Nullable<any>;
      };
    };
    signor: {};
    table: {};
  };
};
