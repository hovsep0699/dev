import { takeLatest, select, put, call } from 'redux-saga/effects';

import { Flash } from '../../../../common/flash/Flash';

import {
  actionDocumentRequest,
  actionSign,
  actionSignFailure,
  actionSignRequest,
  actionSignSuccess,
  actionSignContainer,
  actionSignContainerRequest,
  actionSignContainerFailure,
  actionSignContainerSuccess
} from '../actions';
import { selectSelected, selectList } from '../selects';
import { DocumentsApiServices } from '../../services/documents.api';
import { DocumentType } from '../../helpers/documents.typings';

export function* ducumentsSign() {
  yield takeLatest(actionSign, sagaSign);
}

export function* ducumentsSignContainer() {
  yield takeLatest(actionSignContainer, sagaSignContainer);
}

function* sagaSign() {
  const documents: DocumentType[] = yield select(selectList);
  const selected: string[] = yield select(selectSelected);

  const signDocuments = documents.filter(doc => selected.includes(doc.packageId));

  yield put(actionSignRequest());
  try {
    yield call(DocumentsApiServices.signDocument, signDocuments);
    yield put(actionDocumentRequest({}));
    yield put(actionSignSuccess());
  } catch ({ message }) {
    yield put(actionSignFailure(message));
    yield Flash.error(message || 'Возникла ошибка при подписании');
  }
}

function* sagaSignContainer() {
  const documents: DocumentType[] = yield select(selectList);
  const selected: string[] = yield select(selectSelected);

  const companies: string[] = [];
  const signDocuments = documents.filter(doc => selected.includes(doc.packageId));

  for (const { toCompanyName } of signDocuments) {
    companies.push(toCompanyName);
  }

  const count = companies.filter((current, index) => companies.indexOf(current) === index).length;
  try {
    if (count > 1) {
      throw new Error('Для отправки пакетом надо выбрать одинаковых получателей');
    }

    yield put(actionSignContainerRequest());
    yield call(DocumentsApiServices.signContainer, signDocuments);
    yield put(actionSignContainerSuccess());
    yield put(actionDocumentRequest({}));
  } catch ({ message }) {
    yield put(actionSignContainerFailure(message));
    yield Flash.error(message || 'Возникла ошибка при подписании');
  }
}
