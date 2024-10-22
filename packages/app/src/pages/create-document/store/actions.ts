import { createAction } from 'redux-actions';
import {
  SEND_FILE,
  SET_FLOW_TYPE,
  CREATE_DOCUMENT_FROM_FILE,
  SET_UNFORMALIZED_FLOW,
  SET_UNFORMALIZED_DIVISION_EMPLOYEE,
  GET_UNFORMALIZED_DICTONARIES,
  CREATE_UNFORMALIZED,
  SET_UNFORMALIZED_ERROR,
  GET_DOCUMENT_JSON,
  SET_DOCUMENT_JSON
} from './constants';
import { EDIT_UNFORMALIZED } from '../../../common/Url';

/** отправить файл */
export const sendFile = createAction(SEND_FILE);

/** установить тип документооборота */
export const setFlowType = createAction(SET_FLOW_TYPE);

/** создать документ из файла */
export const createDocumentFromFile = createAction(CREATE_DOCUMENT_FROM_FILE);

/** получить справочники для создания неформализованного документа */
export const getUnformalizedDictonaries = createAction(GET_UNFORMALIZED_DICTONARIES);
/** сохранить подразделения отправителя */
export const setUnformalizedDivisionEmployee = createAction(SET_UNFORMALIZED_DIVISION_EMPLOYEE);
/** сохранить вид документа */
export const setUnformalizedFlow = createAction(SET_UNFORMALIZED_FLOW);

/** создать неформализованный документ */
export const createUnformalized = createAction(CREATE_UNFORMALIZED);

/** установить ошибки неформализованного документа */
export const setUnformalizedError = createAction(SET_UNFORMALIZED_ERROR);

/** получить информацию о документе */
export const getDocumentJson = createAction(GET_DOCUMENT_JSON);
/** установить информацию о документе */
export const setDocumentJson = createAction(SET_DOCUMENT_JSON);
/** редактировать неформализованный документ */
export const editUnformalized = createAction(EDIT_UNFORMALIZED);
