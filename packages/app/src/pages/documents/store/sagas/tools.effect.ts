import { takeLatest, select, put } from 'redux-saga/effects';

import { isArchivable } from '../../helpers/documnets.helpers';
import { DefaultState, DocumentType } from '../../helpers/documents.typings';
import { actionDocumentTools, actionDocumentSetTools, actionDocumentSuccess } from '../actions';
import { selectSelected, selectTools, selectMode, selectList } from '../selects';
import Core from '@distate/core/dist/application/Core';

export function* ducumentTools() {
  yield takeLatest(actionDocumentSuccess, sagaDocumentTools);
  yield takeLatest(actionDocumentTools, sagaDocumentTools);
}

type Tools = Pick<DefaultState, 'tools'>['tools'];
type Selected = Pick<DefaultState, 'selected'>['selected'];

function* sagaDocumentTools() {
  const mode: string = yield select(selectMode);
  const list: DocumentType[] = yield select(selectList);
  const tools: Tools = yield select(selectTools);
  const selected: Selected = yield select(selectSelected);

  const isSelected = !!selected.length;

  let archivable = 0;
  for (const { packageId, packageState } of list) {
    if (selected.includes(packageId) && isArchivable(packageState)) {
      archivable += 1;
    }
  }

  const newTools = { ...tools };

  newTools.isBtnDownload = isSelected;
  newTools.isBtnFolder = isSelected;
  newTools.isBtnSign = mode === 'draft' && isSelected;
  newTools.isBtnDelete = mode === 'draft' && isSelected;
  newTools.isBtnSignContainer = !!(Core.company && mode === 'draft' && selected.length >= 2);
  newTools.isBtnArchive = !!(!['archive', 'draft'].includes(mode) && archivable);

  yield put(actionDocumentSetTools({ tools: newTools }));
}
