import { Action } from 'redux';

export type Folder = {
  id: string;
  title: string;
  visible?: boolean;
};

export type FolderContext = {
  onSubmit: (values: FormSubmitAction) => void;
};

export type DefaultState = {
  isDialog: boolean;
  isLoading: boolean;
  isFormRequest: boolean;
  isRemoveRequest: boolean;
  isAttachPackage: boolean;
  isDetachPackage: boolean;
  selected?: any[];
  list: Folder[];
  total: number;
};
export type RemoveAction = Pick<Folder, 'id'>;

export type RemovePayload = {
  payload: RemoveAction;
} & Action;

export type FormSubmitAction = {
  id?: string;
} & Omit<Folder, 'id' | 'visible'>;
export type FormSubmitPayload = {
  payload: FormSubmitAction;
} & Action;

export type AddPackageAction = {
  folderId: string;
  packageIds: string[];
  callback?: { success: () => void; failure: () => void };
};
export type AddPackagePayload = {
  payload: AddPackageAction;
} & Action;

export type DetchPackageAction = {
  folderId: string;
  packageId: string;
  callback?: { success: () => void; failure: () => void };
};
export type DetchPackagePayload = {
  payload: DetchPackageAction;
} & Action;
