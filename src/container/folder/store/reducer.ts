import { handleActions } from 'redux-actions';

import { DefaultState } from '../helpers/folder.typings';
import {
  INIT,
  CLEAR,
  DIALOG,
  REQUEST,
  SUCCESS,
  FAILURE,
  SELECTED,
  FORM_REQUEST,
  FORM_FAILURE,
  FORM_SUCCESS,
  ADD_PACKAGE_FAILURE,
  ADD_PACKAGE_SUCCESS,
  ADD_PACKAGE_REQUEST,
  DETACH_PACKAGE_FAILURE,
  DETACH_PACKAGE_SUCCESS,
  DETACH_PACKAGE_REQUEST
} from './constants';

export const defaultState: DefaultState = {
  isDialog: false,
  isLoading: false,
  isFormRequest: false,
  isRemoveRequest: false,
  isAttachPackage: false,
  isDetachPackage: false,
  list: [],
  total: 0
};

export const reducer = handleActions(
  {
    [DETACH_PACKAGE_REQUEST]: state => ({
      ...state,
      isDetachPackage: true
    }),

    [DETACH_PACKAGE_SUCCESS]: state => ({
      ...state,
      isDetachPackage: false
    }),

    [DETACH_PACKAGE_FAILURE]: state => ({
      ...state,
      isDetachPackage: false
    }),

    [ADD_PACKAGE_REQUEST]: state => ({
      ...state,
      isAttachPackage: true
    }),

    [ADD_PACKAGE_SUCCESS]: state => ({
      ...state,
      isAttachPackage: false
    }),

    [ADD_PACKAGE_FAILURE]: state => ({
      ...state,
      isAttachPackage: false
    }),

    [FORM_REQUEST]: state => ({
      ...state,
      isFormRequest: true
    }),

    [FORM_SUCCESS]: state => ({
      ...state,
      isFormRequest: false
    }),

    [FORM_FAILURE]: state => ({
      ...state,
      isFormRequest: false
    }),

    [SELECTED]: (state, { payload: { selected } }) => ({
      ...state,
      selected
    }),

    [DIALOG]: (state, { payload: { isDialog } }) => ({
      ...state,
      isDialog
    }),

    [REQUEST]: state => ({
      ...state,
      isLoading: true
    }),

    [SUCCESS]: (state, { payload: { list, total } }) => ({
      ...state,
      isLoading: false,
      total,
      list
    }),

    [FAILURE]: state => ({
      ...state,
      isLoading: false
    }),

    [INIT]: () => defaultState,

    [CLEAR]: () => defaultState
  },
  defaultState
);
