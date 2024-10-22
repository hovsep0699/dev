import { createAction } from 'redux-actions';

import {
  INIT,
  CLEAR,
  REQUEST,
  SUCCESS,
  FAILURE,
  FORM_SUCCESS,
  FORM_FAILURE,
  FORM_REQUEST,
  FORM_SUBMIT,
  REMOVE,
  REMOVE_REQUEST,
  REMOVE_SUCCESS,
  REMOVE_FAILURE,
  ADD_PACKAGE,
  ADD_PACKAGE_FAILURE,
  ADD_PACKAGE_REQUEST,
  ADD_PACKAGE_SUCCESS,
  DETACH_PACKAGE,
  DETACH_PACKAGE_FAILURE,
  DETACH_PACKAGE_REQUEST,
  DETACH_PACKAGE_SUCCESS
} from './constants';
import { FormSubmitAction, AddPackageAction, DetchPackageAction } from '../helpers/folder.typings';

export const actionInit = createAction(INIT);
export const actionClear = createAction(CLEAR);

export const actionRemove = createAction(REMOVE);
export const actionRemoveRequest = createAction(REMOVE_REQUEST);
export const actionRemoveSuccess = createAction(REMOVE_SUCCESS);
export const actionRemoveFailure = createAction(REMOVE_FAILURE);

export const actionSuccess = createAction(SUCCESS);
export const actionFailure = createAction(FAILURE);
export const actionRequest = createAction(REQUEST);

export const actionFormSubmit = createAction<FormSubmitAction>(FORM_SUBMIT);
export const actionFormSuccess = createAction(FORM_SUCCESS);
export const actionFormFailure = createAction(FORM_FAILURE);
export const actionFormRequest = createAction(FORM_REQUEST);

export const actionAddPackage = createAction<AddPackageAction>(ADD_PACKAGE);
export const actionAddPackageRequest = createAction(ADD_PACKAGE_REQUEST);
export const actionAddPackageSuccess = createAction(ADD_PACKAGE_SUCCESS);
export const actionAddPackageFailure = createAction(ADD_PACKAGE_FAILURE);

export const actionDetachPackage = createAction<DetchPackageAction>(DETACH_PACKAGE);
export const actionDetachPackageRequest = createAction(DETACH_PACKAGE_REQUEST);
export const actionDetachPackageSuccess = createAction(DETACH_PACKAGE_SUCCESS);
export const actionDetachPackageFailure = createAction(DETACH_PACKAGE_FAILURE);
