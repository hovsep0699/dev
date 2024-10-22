import { handleActions } from 'redux-actions';

import { DefaultState } from '../helpers/filter.typings';
import { INIT, VISIBLE, SCHEMA, DIALOG, TITLE } from './constants';

export const defaultState: DefaultState = {
  title: '',
  visible: false,
  isDialog: false,
  isLoading: false,
  schema: {}
};

export const reducer = handleActions(
  {
    [VISIBLE]: (state, { payload: { visible } }) => ({ ...state, visible }),

    [SCHEMA]: (state, { payload: { schema } }) => ({
      ...state,
      schema: {
        ...state.schema,
        ...schema
      }
    }),

    [DIALOG]: (state, { payload: { isDialog } }) => ({ ...state, isDialog }),

    [TITLE]: (state, { payload: { title } }) => ({ ...state, title }),

    [INIT]: () => defaultState
  },
  defaultState
);
