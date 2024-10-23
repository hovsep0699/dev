import { Action } from 'redux';

export type DefaultState = {
  mode?: string;
  isDelete: boolean;
  isLoading: boolean;
  isNext: boolean;
  isNextLoading: boolean;
  isArchive: boolean;
  isDownload: boolean;
  isReLoading: boolean;
  isSignLoading: boolean;
  isSignContainerLoading: boolean;
  visibleSearch: boolean;
  options: {
    [fieldName: string]: Array<{ value: string; title: string }>;
  };
  tools: {
    isBtnSign?: boolean;
    isBtnSignContainer?: boolean;
    isBtnUpdate?: boolean;
    isBtnFolder?: boolean;
    isBtnReaload?: boolean;
    isBtnArchive?: boolean;
    isBtnDownload?: boolean;
    isBtnDelete?: boolean;
  };
  limit: number;
  offset?: number;
  error?: any;
  list: DocumentType[];
  filter: any;
  selected: string[];
  totalList?: number;
};

export type Label = {
  id: number;
  title: string;
  visible?: boolean;
};

/* Типы контрагентов */
export enum ContractorType {
  /** локальный */
  local = 'локальный',
  /** роуминг */
  roaming = 'внутренний роуминг',
  /** локальный роуминг */
  internal_roaming = 'роуминг',
  /** 1С-ЭДО */
  taxcom = '1С-ЭДО'
}

export type DocumentType = {
  id: string;
  packageId: string;
  packageType?: 'OUT' | 'IN';
  packageState: string;
  fromCompanyName: string;
  toCompanyName: string;
  fromPersonName: string;
  toPersonName: string;
  documentTitle: string;
  documentTypeSystemName: string;
  flowType: string;
  flowGroup: string;
  status: string;
  date: string;
  isSavedCorrectly: boolean;
  isRead: boolean;
  containerSize: number;
  containerID: number;
  checked: boolean;
  labels: Label[];
  uvutochExist: boolean;
  toCompanyExternalType?: keyof typeof ContractorType;
  toCompanyExternalOperator?: string;
  toCompanyNetwork?: string;
  fromCompanyExternalType?: keyof typeof ContractorType;
  fromCompanyExternalOperator?: string;
  fromCompanyNetwork?: string;
};

export type DocumentAttachAction = {
  packageIds: string[];
  folder?: Label;
};
export type DocumentAttachPayload = {
  payload: DocumentAttachAction;
} & Action;

export type DocumentDetachAction = {
  packageId: string;
  folderId: string;
};
export type DocumentDetachPayload = {
  payload: DocumentDetachAction;
} & Action;

export type ADocumentDownload = {
  ids?: Pick<DocumentType, 'packageId'>['packageId'][];
};
export type ADocumentDownloadPayload = {
  payload: ADocumentDownload;
} & Action;

export type ADocumentRequest = {
  limit?: any;
  offset?: number;
};

export type ADocumentRequestPayload = {
  payload: ADocumentRequest;
} & Action;

export type ADocumentSuccess = Pick<DefaultState, 'list' | 'isNext' | 'totalList' | 'offset'>;

export type ADocumentSuccessPayload = {
  payload: ADocumentSuccess;
} & Action;

export type ADocumentModalSearch = {
  visible: boolean;
};

export type ADocumentModalSearchPayload = {
  payload: ADocumentModalSearch;
} & Action;

export type ADocumentChecked = {
  type?: 'append' | 'remove' | 'checkedAll';
  values?: Pick<DefaultState, 'selected'>['selected'];
};

export type ADocumentCheckedPayload = {
  payload: ADocumentChecked;
} & Action;
