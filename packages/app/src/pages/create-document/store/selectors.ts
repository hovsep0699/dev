import { createSelector } from 'reselect';

import { RootState } from '../../../types/store';

const root = (state: RootState) => state.createDocument;

/** тип документа определенный по файлу */
export const selectDocumentType = createSelector(root, state => state?.fileResponse?.type);
/** id документа по отправленному файлу */
export const selectFileResponseId = createSelector(root, state => state?.fileResponse?.id);

/** подразделения отправителя */
export const selectDivisionEmployee = createSelector(root, state => state?.divisionsEmployee);
/** виды документов */
export const selectFlow = createSelector(root, state => state?.flow);

/** ошибки */
export const selectErrors = createSelector(root, state => state?.errors);

/** информкация о документе */
export const selectDocumentJson = createSelector(root, state => state?.documentJson);
/** информкация о документе */
export const selectDocumentFormData = createSelector(root, state => state?.documentJson?.formData);
