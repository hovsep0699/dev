import { createSelector } from 'reselect';

import { RootState } from '../../../types/store';

const root = (state: RootState) => state.sign;

export const selectAll = createSelector(root, state => state);

export const selectStart = createSelector(root, state => state.start);

export const selectList = createSelector(root, state => state.signList);

export const selectTotal = createSelector(root, state => state.signTotal);

export const selectCurrent = createSelector(root, state => state.signCurrent);

export const selectHasAutosigning = createSelector(root, state => state.hasAutosigning);
