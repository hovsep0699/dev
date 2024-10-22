import { createSelector } from 'reselect';

import { RootState } from '../../../types/store';

const root = (state: RootState) => state.filter;

export const selectAll = createSelector(root, state => state);

export const selectTitle = createSelector(root, state => state.title);
export const selectDialog = createSelector(root, state => state.isDialog);
export const selectVisible = createSelector(root, state => state.visible);
export const selectSchema = createSelector(root, state => state.schema);
