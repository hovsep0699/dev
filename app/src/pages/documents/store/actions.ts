import { createAction } from 'redux-actions';

import {
  DOCUMENT_INIT,
  DOCUMENT_MODE,
  DOCUMENT_RELOAD,
  DOCUMENT_UPDATE,
  DOCUMENT_CHECKED,
  DOCUMENT_REQUEST,
  DOCUMENT_FAILURE,
  DOCUMENT_TOOLS,
  DOCUMENT_SET_TOOLS,
  DOCUMENT_SUCCESS,
  DOCUMENT_SET_SELECTED,
  DOCUMENT_MODAL_SEARCH,
  DOCUMENT_DETATCH_FOLDER,
  DOCUMENT_ATTATCH_FOLDER,
  DOCUMENT_DOWNLOAD_FAILURE,
  DOCUMENT_DOWNLOAD_REQUEST,
  DOCUMENT_DOWNLOAD_SUCCESS,
  DOCUMENT_ARCHIVE,
  DOCUMENT_ARCHIVE_FAILURE,
  DOCUMENT_ARCHIVE_REQUEST,
  DOCUMENT_ARCHIVE_SUCCESS,
  DOCUMENT_DELETE,
  DOCUMENT_DELETE_REQUEST,
  DOCUMENT_DELETE_SUCCESS,
  DOCUMENT_DELETE_FAILURE,
  DOCUMENT_FILTER,
  DOCUMENT_SIGN,
  DOCUMENT_SIGN_FAILURE,
  DOCUMENT_SIGN_REQUEST,
  DOCUMENT_SIGN_SUCCESS,
  DOCUMENT_SIGN_CONTAINER,
  DOCUMENT_SIGN_CONTAINER_FAILURE,
  DOCUMENT_SIGN_CONTAINER_REQUEST,
  DOCUMENT_SIGN_CONTAINER_SUCCESS,
  DOCUMENT_NEXT_FAILURE,
  DOCUMENT_NEXT_REQUEST,
  DOCUMENT_NEXT_SECCESS,
  DOCUMENT_NEXT
} from './constants';
import {
  ADocumentRequest,
  ADocumentSuccess,
  DocumentDetachAction,
  DocumentAttachAction,
  ADocumentModalSearch
} from '../helpers/documents.typings';

export const actionMode = createAction(DOCUMENT_MODE);

export const actionArchive = createAction(DOCUMENT_ARCHIVE);
export const actionArchiveRequest = createAction(DOCUMENT_ARCHIVE_REQUEST);
export const actionArchiveSuccess = createAction(DOCUMENT_ARCHIVE_SUCCESS);
export const actionArchiveFailure = createAction(DOCUMENT_ARCHIVE_FAILURE);

export const actionDelete = createAction(DOCUMENT_DELETE);
export const actionDeleteRequest = createAction(DOCUMENT_DELETE_REQUEST);
export const actionDeleteSuccess = createAction(DOCUMENT_DELETE_SUCCESS);
export const actionDeleteFailure = createAction(DOCUMENT_DELETE_FAILURE);

export const actionSign = createAction(DOCUMENT_SIGN);
export const actionSignRequest = createAction(DOCUMENT_SIGN_REQUEST);
export const actionSignSuccess = createAction(DOCUMENT_SIGN_SUCCESS);
export const actionSignFailure = createAction(DOCUMENT_SIGN_FAILURE);

export const actionSignContainer = createAction(DOCUMENT_SIGN_CONTAINER);
export const actionSignContainerRequest = createAction(DOCUMENT_SIGN_CONTAINER_REQUEST);
export const actionSignContainerSuccess = createAction(DOCUMENT_SIGN_CONTAINER_SUCCESS);
export const actionSignContainerFailure = createAction(DOCUMENT_SIGN_CONTAINER_FAILURE);

export const actionDocumentChecked = createAction(DOCUMENT_CHECKED);
export const actionDocumentSetSelected = createAction(DOCUMENT_SET_SELECTED);

export const actionDocumentTools = createAction(DOCUMENT_TOOLS);
export const actionDocumentSetTools = createAction(DOCUMENT_SET_TOOLS);

export const actionDocumentInit = createAction(DOCUMENT_INIT);
export const actionDocumentFilter = createAction(DOCUMENT_FILTER);
export const actionDocumentUpdate = createAction(DOCUMENT_UPDATE);
export const actionDocumentReload = createAction(DOCUMENT_RELOAD);
export const actionDocumentRequest = createAction<ADocumentRequest>(DOCUMENT_REQUEST);
export const actionDocumentSuccess = createAction<ADocumentSuccess>(DOCUMENT_SUCCESS);
export const actionDocumentFailure = createAction(DOCUMENT_FAILURE);
export const actionDocumentNext = createAction(DOCUMENT_NEXT);
export const actionDocumentNextRequest = createAction(DOCUMENT_NEXT_REQUEST);
export const actionDocumentNextSuccess = createAction(DOCUMENT_NEXT_SECCESS);
export const actionDocumentNextFailure = createAction(DOCUMENT_NEXT_FAILURE);

export const actionDocumentAttachFolder = createAction<DocumentAttachAction>(
  DOCUMENT_ATTATCH_FOLDER
);
export const actionDocumentDetachFolder = createAction<DocumentDetachAction>(
  DOCUMENT_DETATCH_FOLDER
);

export const actionDocumentDownloadRequest = createAction(DOCUMENT_DOWNLOAD_REQUEST);
export const actionDocumentDownloadSuccess = createAction(DOCUMENT_DOWNLOAD_SUCCESS);
export const actionDocumentDownloadFailure = createAction(DOCUMENT_DOWNLOAD_FAILURE);

export const actionDocumentModalSearch = createAction<ADocumentModalSearch>(DOCUMENT_MODAL_SEARCH);
