import { takeLatest, put, select } from 'redux-saga/effects';

import {
  actionDocumentUpdate,
  actionDocumentChecked,
  actionDocumentSetSelected,
  actionDocumentTools
} from '../actions';
import {
  ADocumentCheckedPayload,
  DocumentType,
  DefaultState
} from '../../helpers/documents.typings';
import { switchCheckDocuments } from '../../helpers/documnets.helpers';
import { selectSelected, selectList } from '../selects';

export function* ducumentChecked() {
  yield takeLatest(actionDocumentChecked, sagaDocumentChecked);
}

type ISelected = Pick<DefaultState, 'selected'>['selected'];

function* sagaDocumentChecked(action: ADocumentCheckedPayload) {
  let {
    payload: { type, values = [] }
  } = action;

  let check: boolean = false;
  let selected: ISelected = values;
  let documents: DocumentType[] = [];

  const stateSelected: ISelected = yield select(selectSelected);
  const stateDocuments: DocumentType[] = yield select(selectList);

  if (type === 'append') {
    check = true;
    selected = [...stateSelected, ...values];
  } else if (type === 'remove') {
    check = false;
    selected = [...stateSelected.filter(item => !values.includes(item))];
  } else {
    check = !(stateDocuments.length && stateDocuments.length === stateSelected.length);
    values = stateDocuments.map(({ packageId }) => packageId);
    selected = check ? values : [];
  }

  documents = switchCheckDocuments(check, stateDocuments, values);

  yield put(actionDocumentSetSelected({ selected }));
  yield put(actionDocumentUpdate({ list: documents }));
  yield put(actionDocumentTools());
}
