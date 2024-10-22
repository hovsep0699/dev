import { handleActions } from 'redux-actions';

import { DefaultState } from '../helpers/documents.typings';
import {
  DOCUMENT_INIT,
  DOCUMENT_MODE,
  DOCUMENT_RELOAD,
  DOCUMENT_UPDATE,
  DOCUMENT_REQUEST,
  DOCUMENT_SUCCESS,
  DOCUMENT_FAILURE,
  DOCUMENT_DELETE_FAILURE,
  DOCUMENT_DELETE_REQUEST,
  DOCUMENT_DELETE_SUCCESS,
  DOCUMENT_ARCHIVE_FAILURE,
  DOCUMENT_ARCHIVE_REQUEST,
  DOCUMENT_ARCHIVE_SUCCESS,
  DOCUMENT_SET_TOOLS,
  DOCUMENT_MODAL_SEARCH,
  DOCUMENT_SET_SELECTED,
  DOCUMENT_DOWNLOAD_FAILURE,
  DOCUMENT_DOWNLOAD_SUCCESS,
  DOCUMENT_DOWNLOAD_REQUEST,
  DOCUMENT_SIGN_REQUEST,
  DOCUMENT_SIGN_SUCCESS,
  DOCUMENT_SIGN_FAILURE,
  DOCUMENT_SIGN_CONTAINER_REQUEST,
  DOCUMENT_SIGN_CONTAINER_SUCCESS,
  DOCUMENT_SIGN_CONTAINER_FAILURE,
  DOCUMENT_NEXT_FAILURE,
  DOCUMENT_NEXT_REQUEST,
  DOCUMENT_NEXT_SECCESS,
  DOCUMENT_FILTER
} from './constants';

export const defaultState: DefaultState = {
  isDelete: false,
  isLoading: false,
  isNext: false,
  isNextLoading: false,
  isArchive: false,
  isDownload: false,
  isReLoading: false,
  isSignLoading: false,
  isSignContainerLoading: false,
  visibleSearch: false,
  totalList: 0,
  tools: {
    isBtnUpdate: true
  },
  list: [],
  filter: {},
  selected: [],
  offset: 0,
  limit: 50,
  options: {
    states: [
      { value: 'waitingSigningNotification', title: 'Требуется подписать квитанции' },
      { value: 'waitingSigning', title: 'Требуется подпись' },
      { value: 'annulmentRequested', title: 'Требуется аннулирование' },
      { value: 'waitingSigning', title: 'Ожидается подпись' },
      { value: 'waitingAnnulment', title: 'Ожидается аннулирование' },
      { value: 'waitingNotification', title: 'Ожидается извещение о получении' },
      { value: 'complete', title: 'Документооборот завершен' },
      { value: 'declined', title: 'Документооборот отклонен' },
      { value: 'interrupted', title: 'Возникла ошибка' },
      { value: 'annulled', title: 'Аннулирован' },
      { value: 'processing', title: 'В обработке' },
      { value: 'waiting_for_pdotpr', title: 'Ожидание подтверждения оператора ЭДО' },
      {
        value: 'waiting_of_pdpol_seller_title_izvpol',
        title: 'Ожидание подтверждения оператора ЭДО'
      },
      { value: 'waiting_of_pdpol_clarification', title: 'Ожидание подтверждения оператора ЭДО' },
      { value: 'waiting_for_pdpol', title: 'Ожидание подтверждения оператора ЭДО' },
      { value: 'waiting_of_pdotpr_clarification', title: 'Ожидание подтверждения оператора ЭДО' }
    ],
    flow: [
      { value: 'act', title: 'Акт сдачи-приема работ(услуг)' },
      { value: 'act_552', title: 'Акт по приказу ФНС 552' },
      { value: 'bilateral', title: 'Двусторонний документ' },
      { value: 'information_message', title: 'Информационное сообщение' },
      { value: 'waybill', title: 'Накладная' },
      { value: 'waybill_551', title: 'Накладная по приказу ФНС 551' },
      { value: 'unilateral', title: 'Односторонний документ' },
      { value: 'invoice', title: 'Счет-фактура (старый формат)' },
      { value: 'invoice_utd', title: 'Счет-фактура' },
      { value: 'invoice_correction_ucd', title: 'Корректировочный счет-фактура' },
      { value: 'bill', title: 'Счет на оплату' },
      { value: 'UTD', title: 'УПД' },
      { value: 'UTD_INVOICE', title: 'УПД (СЧФ)' },
      { value: 'UTD_WAYBILL', title: 'УПД (ДОП)' },
      { value: 'UTD_INVOICE_WAYBILL', title: 'УПД (СЧФ ДОП)' },
      { value: 'UCD', title: 'УКД' },
      { value: 'UCD_INVOICE', title: 'УКД (КСЧФ)' },
      { value: 'UCD_WAYBILL', title: 'УКД (ДИС)' },
      { value: 'UCD_INVOICE_WAYBILL', title: 'УКД (КСЧФ ДИС)' },
      { value: 'unformalized_unilateral_unsigned', title: 'Выставленные счета по ЭДО' }
    ],
    docstatus: [
      { value: 'draft', title: 'Черновик' },
      { value: 'received', title: 'Получен' },
      { value: 'signed', title: 'Подписанный' }
    ]
  }
};

export const reducer = handleActions(
  {
    [DOCUMENT_MODE]: (state, { payload: { mode } }) => ({
      ...state,
      mode
    }),

    [DOCUMENT_FILTER]: (state, { payload: { filter, offset } }) => ({
      ...state,
      filter,
      offset
    }),

    [DOCUMENT_DELETE_REQUEST]: state => ({
      ...state,
      isDelete: true
    }),

    [DOCUMENT_DELETE_SUCCESS]: state => ({
      ...state,
      isDelete: false
    }),

    [DOCUMENT_DELETE_FAILURE]: state => ({
      ...state,
      isDelete: false
    }),

    [DOCUMENT_ARCHIVE_REQUEST]: state => ({
      ...state,
      isArchive: true
    }),

    [DOCUMENT_ARCHIVE_SUCCESS]: state => ({
      ...state,
      isArchive: false
    }),

    [DOCUMENT_ARCHIVE_FAILURE]: state => ({
      ...state,
      isArchive: false
    }),

    [DOCUMENT_SIGN_REQUEST]: state => ({
      ...state,
      isSignLoading: true
    }),

    [DOCUMENT_SIGN_SUCCESS]: state => ({
      ...state,
      isSignLoading: false
    }),

    [DOCUMENT_SIGN_FAILURE]: state => ({
      ...state,
      isSignLoading: false
    }),

    [DOCUMENT_SIGN_CONTAINER_REQUEST]: state => ({
      ...state,
      isSignContainerLoading: true
    }),

    [DOCUMENT_SIGN_CONTAINER_SUCCESS]: state => ({
      ...state,
      isSignContainerLoading: false
    }),

    [DOCUMENT_SIGN_CONTAINER_FAILURE]: state => ({
      ...state,
      isSignContainerLoading: false
    }),

    [DOCUMENT_MODAL_SEARCH]: (state, { payload: { visibleSearch } }) => ({
      ...state,
      visibleSearch
    }),

    [DOCUMENT_SET_SELECTED]: (state, { payload: { selected } }) => ({
      ...state,
      selected
    }),

    [DOCUMENT_SET_TOOLS]: (state, { payload: { tools } }) => ({
      ...state,
      tools
    }),

    [DOCUMENT_UPDATE]: (state, { payload: { list } }) => ({
      ...state,
      list
    }),

    [DOCUMENT_REQUEST]: state => ({
      ...state,
      isLoading: true
    }),

    [DOCUMENT_RELOAD]: state => ({
      ...state,
      isReLoading: true
    }),

    [DOCUMENT_SUCCESS]: (state, { payload: { list, isNext, offset, totalList } }) => ({
      ...state,
      isNext,
      selected: [],
      isLoading: false,
      isReLoading: false,
      isNextLoading: false,
      totalList,
      offset,
      list
    }),

    [DOCUMENT_FAILURE]: (state, { payload }) => ({
      ...state,
      isLoading: false,
      isReLoading: false,
      isNextLoading: false,
      error: payload
    }),

    [DOCUMENT_NEXT_REQUEST]: state => ({
      ...state,
      isNextLoading: true
    }),

    [DOCUMENT_NEXT_SECCESS]: (state, { payload: { list, isNext, offset } }) => ({
      ...state,
      isNext,
      offset,
      isNextLoading: false,
      list: [...state.list, ...list]
    }),

    [DOCUMENT_NEXT_FAILURE]: state => ({
      ...state,
      isNextLoading: false
    }),

    [DOCUMENT_DOWNLOAD_REQUEST]: state => ({
      ...state,
      isDownload: true
    }),

    [DOCUMENT_DOWNLOAD_SUCCESS]: state => ({
      ...state,
      isDownload: false
    }),

    [DOCUMENT_DOWNLOAD_FAILURE]: state => ({
      ...state,
      isDownload: false
    }),

    [DOCUMENT_INIT]: () => defaultState
  },
  defaultState
);
