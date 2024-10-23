export const LOAD_FOLDERS_LOADING = 'LOAD_FOLDERS_LOADING';
export const LOAD_FOLDERS = 'LOAD_FOLDERS';
export const CREATE_FOLDER_LOADING = 'CREATE_FOLDER_LOADING';
export const CREATE_FOLDER = 'CREATE_FOLDER';
export const DELETE_FOLDER_LOADING = 'DELETE_FOLDER_LOADING';
export const DELETE_FOLDER = 'DELETE_FOLDER';
export const SET_EDIT_FOLDER = 'SET_EDIT_FOLDER';
export const EDIT_FOLDER_LOADING = 'EDIT_FOLDER_LOADING';
export const EDIT_FOLDER = 'EDIT_FOLDER';
export const FOLDERS_ERROR = 'FOLDERS_ERROR';
export const ATTACH_DOCUMENTS_LOADING = 'ATTACH_DOCUMENTS_LOADING';
export const ATTACH_DOCUMENTS_SUCCESS = 'ATTACH_DOCUMENTS_SUCCESS';
export const DETACH_DOCUMENT_LOADING = 'DETACH_DOCUMENT_LOADING';
export const DETACH_DOCUMENT_SUCCESS = 'DETACH_DOCUMENT_SUCCESS';

export interface Folder {
  id: number;
  title: string;
  isVisible: boolean;
  editing: boolean;
}

export interface FolderState {
  folders: Folder[];
  attachLoading: boolean;
  error: string | null;
}
