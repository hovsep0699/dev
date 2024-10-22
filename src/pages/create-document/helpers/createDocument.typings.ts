/** дефолтный стейт создания документа из файла */
export type DefaultState = {
  fileResponse?: {
    type: DocumentType;
    id: string;
  };
  flow?: {
    group: string;
    id: number;
    systemName: string;
    title: string;
  }[];
  divisionsEmployee?: {
    id: number;
    title: string;
    kpp: string;
    visible: boolean;
    head: boolean;
  }[];
  errors?: any;
  documentJson?: any;
};

/** типы документов */
export enum DocumentType {
  on_nschfdoppr = 'on_nschfdoppr',
  on_nkorschfdoppr = 'on_nkorschfdoppr',
  universal = 'universal',
  dp_tovtorgpr = 'dp_tovtorgpr',
  dp_rezruisp = 'dp_rezruisp'
}

/** названия типов документов */
export enum DocumentTypeName {
  on_nschfdoppr = 'Счет-фактура / Универсальный передаточный документ',
  on_nkorschfdoppr = 'Универсальный корректировочный документ',
  universal = 'Неформализованный документ',
  dp_tovtorgpr = 'Накладная',
  dp_rezruisp = 'Акт'
}
