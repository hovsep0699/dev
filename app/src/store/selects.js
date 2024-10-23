import { createSelector } from 'reselect';

const root = state => state.router;

export const selectRouter = createSelector(root, state => state);

export const selectLocation = createSelector(root, state => state.location);

export const selectPathName = createSelector(root, state => state.location.pathname);
