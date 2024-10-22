import { createSelector } from 'reselect';

import { RootState } from '../../../types/store';

const root = (state: RootState) => state.documents;

export const selectMode = createSelector(root, state => state.mode);
export const selectList = createSelector(root, state => state.list);
export const selectIsNext = createSelector(root, state => state.isNext);
export const selectIsNextLoading = createSelector(root, state => state.isNextLoading);
export const selectOptions = createSelector(root, state => state.options);
export const selectLimit = createSelector(root, state => state.limit);
export const selectTools = createSelector(root, state => state.tools);
export const selectFilter = createSelector(root, state => state.filter);
export const selectOffset = createSelector(root, state => state.offset);
export const selectLoading = createSelector(root, state => state.isLoading);
export const selectArchive = createSelector(root, state => state.isArchive);
export const selectSelected = createSelector(root, state => state.selected);
export const selectDelete = createSelector(root, state => state.isDelete);
export const selectDownload = createSelector(root, state => state.isDownload);
export const selectReLoading = createSelector(root, state => state.isReLoading);
export const selectIsSign = createSelector(root, state => state.isSignLoading);
export const selectIsSignContainer = createSelector(root, state => state.isSignContainerLoading);
