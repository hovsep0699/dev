import { Schema, UISchema } from '@distate/components/dist/FormSchema';

export const schemaUCD: Schema = {
  type: 'object',
  required: ['purpose', 'invoiceCorrectionNumber', 'invoiceCorrectionDate'],
  properties: {
    invoiceCorrectionNumber: {
      type: 'string',
      title: 'Номер'
    },

    invoiceCorrectionDate: {
      type: 'string',
      title: 'Дата',
      format: 'date'
    },

    factActivity: {
      type: 'string'
    },

    purpose: {
      type: 'string',
      enum: ['КСФ', 'КСФДИС','ДИС'],
      default: 'КСФ',
      enumNames: [
          'Корр. счет-фактура',
          'Корр. счет-фактура и документ об изменении стоимости',
          'Документ об изменении стоимости'
      ]
    },

    seller: {
      type: 'object',
      properties: {
        companyName: {
          type: 'string'
        },
        address: {
          type: 'object',
          properties: {
            computed: {
              type: 'string'
            }
          }
        },
        innkpp: {
          type: 'string'
        }
      }
    },

    buyer: {
      type: 'object',
      properties: {
        companyName: {
          type: 'string'
        },
        address: {
          type: 'object',
          properties: {
            computed: {
              type: 'string'
            }
          }
        },
        innkpp: {
          type: 'string'
        }
      }
    },

    name: {
      type: 'string',
      dependencies: {
        purpose: ['ДИС']
      }
    },

    currencyString: {
      type: 'string'
    },

    governmentContractId: {
      type: 'string'
    },

    attributeValues: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          attribute: {
            type: 'string'
          },
          value: {
            type: 'string'
          }
        }
      }
    }
  }
};

export const uiSchemaUCD: UISchema = {
  'ui:group': [{ type: 'group', fields: ['invoiceCorrectionNumber', 'invoiceCorrectionDate'] }],
  'ui:label': {
    invoiceCorrectionNumber: 'Исходящий УКД',
    factActivity: 'К документу',
    purpose: 'Функция',
    currencyString: 'Валюта',
    governmentContractId: 'Идентификатор гос. контракта, (кол.сим: 20-25)',
    attributeValues: 'Дополнительные сведения ко всему документу'
  },
  invoiceCorrectionNumber: { placeholder: 'Введите номер' },
  invoiceCorrectionDate: { placeholder: 'Дата' },
  factActivity: { 'ui:widget': 'button' },
  seller: {
    'ui:title': 'Продавец',
    'ui:label': {
      companyName: 'Название',
      address: 'Адрес',
      innkpp: 'ИНН/КПП'
    },
    innkpp: { disabled: true, 'ui:widget': 'info' },
    address: { computed: { disabled: true, 'ui:widget': 'info' } },
    companyName: { disabled: true, 'ui:widget': 'info' }
  },
  buyer: {
    'ui:title': 'Покупатель',
    'ui:label': {
      companyName: 'Название',
      address: 'Адрес',
      innkpp: 'ИНН/КПП'
    },
    innkpp: { disabled: true, 'ui:widget': 'info' },
    address: { computed: { disabled: true, 'ui:widget': 'info' } },
    companyName: { disabled: true, 'ui:widget': 'info' }
  },
  currencyString: { disabled: true },
  attributeValues: { attribute: { placeholder: 'Тип' }, value: { placeholder: 'Значение' } }
};

/**
 * ---------------------
 * --- Schema footer ---
 * ---------------------
 */

export const schemaFooter: Schema = {
  type: 'object',
  required: ['operationInformation', 'transferDocuments', 'basisDocuments'],
  properties: {
    transferDocuments: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            title: 'Основание',
            type: 'string'
          },
          number: {
            title: '№',
            type: 'string'
          },
          date: {
            title: 'от',
            type: 'string',
            format: 'date'
          },
          information: {
            type: 'string',
            title: 'Дополнительная информация об основании изменения стоимости'
          }
        }
      }
    },
    basisDocuments: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            title: 'Основание',
            type: 'string'
          },
          number: {
            title: '№',
            type: 'string'
          },
          date: {
            title: 'от',
            type: 'string',
            format: 'date'
          },
          information: {
            type: 'string',
            title: 'Дополнительная информация об основании изменения стоимости'
          }
        }
      }
    },
    additionalInformation: {
      type: 'string'
    },
    operationInformation: {
      type: 'string'
    }
  }
};

export const uischemaFooter: UISchema = {
  'ui:group': [{ type: 'group', fields: ['name', 'number', 'date'] }],
  'ui:label': {
    transferDocuments:
      'Реквизиты передаточных (отгрузочных) документов, к которым относится корректировка.',
    basisDocuments: 'Реквизиты документов, являющихся основанием корректировки.',
    additionalInformation: 'Иные сведения',
    operationInformation: 'Содержание операции'
  },
  transferDocuments: {
    width: '1000px',
    name: { width: 140 },
    date: { width: 100 },
    number: { width: 140 },
    information: { width: 430 }
  },
  basisDocuments: {
    width: '1000px',
    name: { width: 140 },
    date: { width: 100 },
    number: { width: 140 },
    information: { width: 430 }
  }
};
