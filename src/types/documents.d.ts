export type Label = {
  id: number;
  title: string;
};

export type DocumentType = {
  id: string;
  packageId: string;
  fromCompanyName: string;
  toCompanyName: string;
  documentTitle: string;
  documentTypeSystemName: string;
  flowType: string;
  flowGroup: string;
  status: string;
  packageState: string;
  date: string;
  isSavedCorrectly: boolean;
  isRead: boolean;
  containerSize: number;
  containerID: number;
  checked: boolean;
  labels: Label[];
};

export type StateType = {
  documents: any[];
  isPending: boolean;
  offset: number;
  allLoaded: boolean;
};

export type ColumnPropertyType =
  | 'companyName'
  | 'checkbox'
  | 'documentTitle'
  | 'status'
  | 'date'
  | 'buttons'
  | 'edit'
  | 'download'
  | 'folder';
export type ColumnType = {
  property: ColumnPropertyType;
  header?: string | JSX.Element;
  footer?: string;
  format?: (datum: any, location?: string) => JSX.Element | string;
  align?: string;
};
