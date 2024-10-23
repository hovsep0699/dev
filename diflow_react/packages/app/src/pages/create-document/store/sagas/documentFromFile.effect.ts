import { takeLatest, put } from 'redux-saga/effects';
import { documentFromFileGateway } from '@distate/core/dist/application/create-document/DocumentFromFileGateway';

import { Flash } from '../../../../common/flash/Flash';
import { sendFile, setFlowType, createDocumentFromFile } from '../actions';
import { history } from '../../../../App';

/** Создание документа из файла */
export function* documentFromFileEffect() {
  yield takeLatest(sendFile, sendFileWorker);
  yield takeLatest(createDocumentFromFile, createDocumentFromFileWorker);
}

/** отправить файл на сервер */
function* sendFileWorker({ payload }: { payload: File }) {
  try {
    let formData = new FormData();
    formData.append('file', payload);

    const response = yield documentFromFileGateway.loadFile(formData);
    yield put(setFlowType({ fileResponse: response?.data }));
  } catch ({ response }) {
    yield Flash.error(response?.data?.messages[0] || 'Возникла ошибка');
  }
}

type CreateDocumentFromFile = {
  id: string;
  params: {
    /** Дата докмуента в формате Д.М.Г */
    date: string;
    /** Наименование */
    title: string;
    /** Номер */
    number: string;
    /** Идентификатор пользовательского типа документа типа */
    customTypeId: string;
    /** Наименвоание пользовательского типа документа типа */
    customTypeTitle: string;
  };
};
/** создать документ из файла */
function* createDocumentFromFileWorker({ payload }: { payload: CreateDocumentFromFile }) {
  try {
    const { id, params } = payload;
    const response = yield documentFromFileGateway.createDocumentFromFile(id, params);
    yield history.push(`/document/${response.data.id}`);
  } catch ({ response }) {
    yield Flash.error(response?.data?.messages[0] || 'Возникла ошибка');
  }
}
