import { takeLatest, put } from 'redux-saga/effects';
import CompanyGateway from '@distate/core/dist/application/company/CompanyGateway';
import DictionaryGateway from '@distate/core/dist/application/dictionary/common/DictionaryGateway';
import { documentsGateway } from '@distate/core/dist/application/documents/DocumentsGateway';

import { Flash } from '../../../../common/flash/Flash';
import {
  getUnformalizedDictonaries,
  setUnformalizedDivisionEmployee,
  setUnformalizedFlow,
  createUnformalized,
  setUnformalizedError,
  getDocumentJson,
  setDocumentJson,
  editUnformalized
} from '../actions';
import { history } from '../../../../App';

const companyGateway = new CompanyGateway();
const dictionaryGateway = new DictionaryGateway();

/** Создание неформализованного документа */
export function* unformalized() {
  yield takeLatest(getUnformalizedDictonaries, getUnformalizedDictonariesWorker);
  yield takeLatest(createUnformalized, createUnformalizedWorker);
  yield takeLatest(getDocumentJson, getDocumentJsonWorker);
  yield takeLatest(editUnformalized, editUnformalizedWorker);
}

/** получение справочников */
function* getUnformalizedDictonariesWorker() {
  try {
    const { rows: flow } = yield dictionaryGateway.getUnformalizedFlow();
    yield put(setUnformalizedFlow({ flow }));

    const { rows: divisionsEmployee } = yield companyGateway.getDivisions();
    yield put(setUnformalizedDivisionEmployee({ divisionsEmployee }));
  } catch ({ response }) {
    yield Flash.error(response?.data?.messages[0] || 'Возникла ошибка');
  }
}

/** создание нового неформализованного документа */
function* createUnformalizedWorker({ payload }: { payload: any }) {
  try {
    const { data } = yield documentsGateway.createUnformalized(payload);
    history.push(`/document/${data?.id}`);
  } catch ({ response }) {
    yield put(setUnformalizedError({ errors: response?.data?.messages }));
    yield Flash.error(response?.data?.messages[0] || 'Возникла ошибка');
  }
}

/** получить информацию о документе */
function* getDocumentJsonWorker({ payload }: { payload: number }) {
  try {
    const documentJson = yield documentsGateway.getDocumentJson(payload);
    yield put(setDocumentJson({ documentJson }));
  } catch ({ response }) {
    yield Flash.error('Возникла ошибка');
  }
}

type EditUnformalizedPayload = {
  documentId: number;
  formData: any;
};
/** редакутировать неформализованный документ */
function* editUnformalizedWorker({ payload }: { payload: EditUnformalizedPayload }) {
  try {
    const { documentId, formData } = payload;
    const { data } = yield documentsGateway.editUnformalized(documentId, formData);
    history.push(`/document/${data?.id}`);
  } catch ({ response }) {
    yield Flash.error('Возникла ошибка');
  }
}
