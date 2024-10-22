import { createSelector } from 'reselect';

import { RootState } from '../../../types/store';

const root = (state: RootState) => state.folders;

export const selectDialog = createSelector(root, state => state.isDialog);
export const selectLoading = createSelector(root, state => state.isLoading);
export const selectFolders = createSelector(root, state => state.list);
export const selectSelected = createSelector(root, state => state.selected);
export const selectFormLoading = createSelector(root, state => state.isFormRequest);
export const selectRemoveLoading = createSelector(root, state => state.isRemoveRequest);
export const selectAttachLoading = createSelector(root, state => state.isAttachPackage);
export const selectDetachLoading = createSelector(root, state => state.isDetachPackage);
