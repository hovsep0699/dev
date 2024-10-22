import { DestinationType } from '../../../contractors/helpers/contractors.typings';

type DocType = {
  value: string;
  label: string;
};

/** опции селекта "Тип документа" */
export const docTypeOptions: DocType[] = [
  { value: 'ACT_423', label: 'Акт сдачи-приема работ/услуг' },
  { value: 'ACT', label: 'Акт' },
  { value: 'information_message', label: 'Информационное сообщение' },
  { value: 'WAYBILL', label: 'Накладная' },
  { value: 'BILATERAL', label: 'Двусторонний неформализованный документ' },
  { value: 'UNILATERAL', label: 'Односторонний неформализованный документ' },
  { value: 'INVOICE', label: 'Счет-фактура' },
  { value: 'INVOICE_CORRECTION', label: 'Корректировочный счет-фактура' },
  { value: 'bill', label: 'Счет на оплату' },
  { value: 'UTD', label: 'УПД' },
  { value: 'UTD_INVOICE', label: 'УПД (СЧФ)' },
  { value: 'UTD_WAYBILL', label: 'УПД (ДОП)' },
  { value: 'UTD_INVOICE_WAYBILL', label: 'УПД (СЧФ ДОП)' },
  { value: 'UCD', label: 'УКД' },
  { value: 'UCD_INVOICE', label: 'УКД (КСЧФ)' },
  { value: 'UCD_WAYBILL', label: 'УКД (ДИС)' },
  { value: 'UCD_INVOICE_WAYBILL', label: 'УКД (КСЧФ ДИС)' },
  { value: 'unformalized_unilateral_unsigned', label: 'Выставленные счета по ЭДО' }
];

type ContractorType = {
  value: DestinationType;
  label: string;
};

/** опции селекта "Тип контрагента" */
export const contractorTypeOptions: ContractorType[] = [
  {
    value: DestinationType.Local,
    label: 'Локальный'
  },
  {
    value: DestinationType.Roaming,
    label: 'Роуминг'
  },
  {
    value: DestinationType.LoaclRoaming,
    label: 'Локальный Роуминг'
  },
  {
    value: DestinationType.Hub1c,
    label: '1С-ЭДО'
  },
  {
    value: DestinationType.Connector,
    label: 'Коннектор'
  }
];

/** все опции селекта "Статус документа" */
const docStatusOptions = [
  {
    value: 'waitingSigningNotification',
    label: 'Требуется подписать квитанции'
  },
  {
    value: 'waitingBuyer',
    label: 'Требуется подпись'
  },
  {
    value: 'annulmentRequested',
    label: 'Требуется аннулирование'
  },
  {
    value: 'waitingSigning',
    label: 'Ожидается подпись'
  },
  {
    value: 'waitingAnnulment',
    label: 'Ожидается аннулирование'
  },
  {
    value: 'waitingNotification',
    label: 'Ожидается извещение о получении'
  },
  {
    value: 'complete',
    label: 'Документооборот завершен'
  },
  {
    value: 'declined',
    label: 'Документооборот отклонен'
  },
  {
    value: 'interrupted',
    label: 'Возникла ошибка'
  },
  {
    value: 'annulled',
    label: 'Аннулирован'
  },
  {
    value: 'processing',
    label: 'В обработке'
  },
  {
    value: 'waitingEDO',
    label: 'Ожидание подтверждения оператора ЭДО'
  }
];

/** возвращает опции для статуса документа взависимости
 * от типа документов (входящие, исходящие, черновики, архив) */
export const getDocStatusOptions = (mode?: string) => {
  /** если входящие */
  if (mode === 'inbox') {
    /** значения, которые не должны отображаться во входящих */
    const exceptions = ['waitingSigning', 'waitingNotification'];
    return docStatusOptions.filter(status => !exceptions.includes(status.value));
  }

  /** если исходящие */
  if (mode === 'outbox') {
    /** значения, которые не должны отображаться в исходящиех */
    const exceptions = ['waitingBuyer'];
    return docStatusOptions.filter(status => !exceptions.includes(status.value));
  }

  /** остальные - черновик и архив */
  return docStatusOptions;
};
