import { Schema, UISchema } from '@distate/components/src/FormSchema/typings';

export const UISchemaSearch: UISchema = {
  'ui:order': [
    'externalType',
    'contractor',
    'documentType',
    'packageStatus',
    'createdFrom',
    'documentNumber',
    'documentDateFrom',
    '*'
  ],
  'ui:group': [
    {
      type: 'group',
      fields: ['createdFrom', 'createdTo']
    },
    {
      type: 'group',
      fields: ['changedFrom', 'changedTo']
    },
    {
      type: 'group',
      fields: ['documentDateFrom', 'documentDateTo']
    }
  ]
};

export const SchemaSearch: Schema = {
  type: 'object',
  title: 'Поиск по документам',
  required: [],
  properties: {
    externalType: {
      type: 'string',
      title: 'Тип контрагента',
      enum: ['local', 'roaming', 'internal_roaming', 'taxcom'],
      enumNames: ['Локальный', 'Роуминг', 'Локальный роуминг', '1С-ЭДО']
    },
    contractor: {
      type: 'string',
      format: 'сontractor',
      title: 'Контрагент'
    },
    documentType: {
      type: 'string',
      title: 'Тип документа',
      enum: [
        'ACT_423',
        'ACT',
        'information_message',
        'WAYBILL',
        'BILATERAL',
        'UNILATERAL',
        'INVOICE',
        'INVOICE_CORRECTION',
        'bill',
        'UTD',
        'UTD_INVOICE',
        'UTD_WAYBILL',
        'UTD_INVOICE_WAYBILL',
        'UCD',
        'UCD_INVOICE',
        'UCD_WAYBILL',
        'UCD_INVOICE_WAYBILL',
        'unformalized_unilateral_unsigned'
      ],
      enumNames: [
        'Акт сдачи-приема работ/услуг',
        'Акт',
        'Информационное сообщение',
        'Накладная',
        'Двусторонний неформализованный документ',
        'Односторонний неформализованный документ',
        'Счет-фактура',
        'Корректировочный счет-фактура',
        'Счет на оплату',
        'УПД',
        'УПД (СЧФ)',
        'УПД (ДОП)',
        'УПД (СЧФ ДОП)',
        'УКД',
        'УКД (КСЧФ)',
        'УКД (ДИС)',
        'УКД (КСЧФ ДИС)',
        'Выставленные счета по ЭДО'
      ]
    },
    documentNumber: {
      type: 'string',
      title: 'Номер документа'
    },
    createdFrom: {
      type: 'string',
      title: 'Создано с',
      format: 'date'
    },
    createdTo: {
      type: 'string',
      title: 'по',
      format: 'date'
    },
    documentDateFrom: {
      type: 'string',
      title: 'Дата в документе c',
      format: 'date'
    },
    documentDateTo: {
      type: 'string',
      title: 'по',
      format: 'date'
    }
  }
};
