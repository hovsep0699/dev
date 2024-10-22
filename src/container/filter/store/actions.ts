import { createAction } from 'redux-actions';

import { INIT, DIALOG, TITLE, SCHEMA, VISIBLE, SEARCH_CLEAR, SEARCH_SUBMIT } from './constants';
import { ActionInit } from '../helpers/filter.typings';

export const actionInit = createAction<ActionInit>(INIT);

export const actionTitle = createAction(TITLE);
export const actionSchema = createAction(SCHEMA);
export const actionDialog = createAction(DIALOG);
export const actionVisible = createAction(VISIBLE);

export const actionSearchClear = createAction(SEARCH_CLEAR);
export const actionSearchSubmit = createAction(SEARCH_SUBMIT);
