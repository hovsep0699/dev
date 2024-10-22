import { Schema, UISchema } from '@distate/components/dist/FormSchema';
import AutocompleteService from '@distate/core/dist/application/autocomplete/AutocompleteService';

import { uiCompany } from './ui-schemes/company-info';
import { uiEmployee } from './ui-schemes/employee';
import { uiAssignee } from './ui-schemes/assignee';
import { uiFl } from './ui-schemes/fl';

export const schema: Schema = {
  type: 'object',
  required: [
    'date',
    'number',
    'purpose',
    'currencyCode',
    'recipient',
    'transportation',
    'economicSubjectName'
  ],
  properties: {
    number: {
      type: 'string',
      title: 'Номер'
    },
    date: {
      type: 'string',
      title: 'Дата',
      format: 'date'
    },
    updatedNumber: {
      type: 'string',
      title: 'Номер исправления'
    },
    updatedDate: {
      type: 'string',
      title: 'Дата исправления',
      format: 'date'
    },
    purpose: {
      type: 'string',
      default: 'СЧФ',
      enum: ['СЧФ', 'СЧФДОП', 'ДОП'],
      enumNames: [
        'счет-фактура',
        'счет-фактура с дополнительными сведениями',
        'документ об отгрузке товаров или передаче имущественных прав'
      ]
    },
    paymentDocuments: {
      type: 'array',
      title: 'К платежно-расчетному документу',
      items: {
        type: 'object',
        properties: {
          number: {
            type: 'string',
            title: 'Номер'
          },
          date: {
            type: 'string',
            title: 'Дата',
            format: 'date'
          },
          cost: {
            type: 'string',
            title: 'Сумма'
          }
        }
      }
    },
    economicSubjectName: {
      type: 'string'
    },
    recipient: {
      type: 'string',
      format: 'autocomplete'
    },
    factory: {
      type: 'object',
      title: 'Сведения о факторе',
      oneOf: [
        {
          type: 'null',
          title: 'Отсутствует'
        },
        {
          type: 'object',
          title: 'Сведения о факторе',
          $ref: '#definitions/company'
        }
      ]
    },
    cargoFrom: {
      type: 'object',
      title: 'Грузоотправитель',
      oneOf: {
        empty: { type: 'null', title: 'Отсутствует' },
        isSame: { type: 'null', title: 'Он же' },
        consignor: {
          type: 'object',
          title: 'Грузоотправитель',
          $ref: '#definitions/company'
        }
      }
    },
    consignee: {
      type: 'object',
      title: 'Грузополучатель',
      oneOf: [
        { type: 'null', title: 'Отсутствует' },
        {
          type: 'object',
          title: 'Грузополучатель',
          $ref: '#definitions/company'
        }
      ]
    },
    carrier: {
      type: 'object',
      title: 'Перевозчик',
      oneOf: {
        empty: { type: 'null', title: 'отсутствует' },
        carrierToUserInput: {
          type: 'object',
          title: 'Перевозчик',
          $ref: '#definitions/company'
        }
      },
      dependencies: {
        purpose: ['СЧФДОП', 'ДОП']
      }
    },
    transferred: {
      type: 'object',
      title: 'Товар передал',
      oneOf: {
        employee: {
          title: 'Работник',
          $ref: '#definitions/employee'
        },
        assignee: {
          title: 'Представитель',
          $ref: '#definitions/assignee'
        },
        fl: {
          title: 'Физическое лицо',
          $ref: '#definitions/fl'
        }
      },
      dependencies: {
        purpose: ['СЧФДОП', 'ДОП']
      }
    },
    transportation: {
      type: 'object',
      title: 'Транспортировка и груз',
      allOf: [
        {
          type: 'object',
          required: ['operationInformation'],
          properties: {
            operationInformation: {
              title: 'Содержание операции',
              type: 'string'
            }
          }
        },
        {
          type: 'object',
          title: 'Основание отгрузки (передачи, уступки)',
          properties: {
            fields: {
              type: 'array',
              items: {
                $ref: '#definitions/base.ts'
              }
            }
          }
        }
      ],
      dependencies: {
        purpose: ['СЧФДОП', 'ДОП']
      }
    },
    currencyCode: {
      type: 'string',
      format: 'autocomplete',
      default: '643',
      enum: ['643'],
      enumNames: ['Российский рубль']
    },
    currencyExchangeRate: {
      type: 'string'
    },
    informationField: {
      type: 'array',
      items: {
        $ref: '#definitions/fields'
      }
    },
    basisName: {
      type: 'string'
    },
    basis: {
      type: 'object',
      $ref: '#definitions/base.ts'
    }
  },
  definitions: {
    fields: {
      type: 'object',
      properties: {
        attribute: { type: 'string', title: 'Идентификаторм' },
        value: { type: 'string', title: 'Значение' }
      }
    },
    base: {
      type: 'object',
      properties: {
        title: { type: 'string', title: 'Наименование документа' },
        number: { type: 'string', title: 'Номер' },
        date: { type: 'string', title: 'Дата', format: 'date' },
        information: { type: 'string', title: 'Доп. сведения' },
        identifier: { type: 'string', title: 'Идентификатор документа' }
      }
    },
    company: {
      type: 'object',
      required: ['companyName', 'regionCode'],
      properties: {
        participant: { type: 'string' },

        type: {
          type: 'string',
          default: 'UL',
          enum: ['UL', 'IP'],
          enumNames: ['ЮР', 'ИП']
        },
        companyName: { type: 'string', title: 'Наименование' },
        okpoul: { type: 'string', title: 'ОКПО' },
        inn: { type: 'string', title: 'ИНН' },
        kpp: { type: 'string', title: 'КПП' },
        divisionName: { type: 'string', title: 'Структурное подразделение' },
        informationForParticipant: {
          type: 'string',
          title: 'Информация для участника документооборота'
        },

        regionCode: { type: 'string', title: 'Код региона' },
        postalCode: { type: 'string', title: 'Индекс' },
        district: { type: 'string', title: 'Район' },
        city: { type: 'string', title: 'Город' },
        settlement: { type: 'string', title: 'Населенный пункт' },
        street: { type: 'string', title: 'Улица' },
        house: { type: 'string', title: 'Дом' },
        building: { type: 'string', title: 'Корпус' },
        room: { type: 'string', title: 'Офис/квартира' },

        accountNumber: { type: 'string', title: 'Номер банковского счета' },

        bankName: { type: 'string', title: 'Наименование банка' },
        bik: { type: 'string', title: 'БИК' },
        correspondentAccount: { type: 'string', title: 'Корреспондентский счет банка' },

        phone: { type: 'string', title: 'Номер контактного телефона/факс' },
        email: { type: 'string', title: 'Email' }
      }
    },
    employee: {
      type: 'object',
      required: ['surname', 'name', 'patronymic', 'position'],
      properties: {
        surname: { type: 'string', title: 'Фамилия' },
        name: { type: 'string', title: 'Имя' },
        patronymic: { type: 'string', title: 'Отчество' },
        position: { type: 'string', title: 'Должность' },
        assigneeBasis: {
          type: 'string',
          title: 'Основание полномочий',
          default: 'Должностные обязанности'
        },
        information: { type: 'string', title: 'Иные сведения' }
      }
    },
    assignee: {
      type: 'object',
      required: ['surname', 'name', 'position', 'companyName'],
      properties: {
        surname: { type: 'string', title: 'Фамилия' },
        name: { type: 'string', title: 'Имя' },
        patronymic: { type: 'string', title: 'Отчество' },
        position: { type: 'string', title: 'Должность' },
        companyName: { type: 'string', title: 'Наименование организации' },
        shipmentBasis: { type: 'string', title: 'Доверенность' },
        assigneeBasis: { type: 'string', title: 'Основание полномочий' },
        information: { type: 'string', title: 'Иные сведения' }
      }
    },
    fl: {
      type: 'object',
      required: ['surname', 'name', 'position'],
      properties: {
        surname: { type: 'string', title: 'Фамилия' },
        name: { type: 'string', title: 'Имя' },
        patronymic: { type: 'string', title: 'Отчество' },
        shipmentBasis: { type: 'string', title: 'Доверенность' },
        information: { type: 'string', title: 'Иные сведения' }
      }
    }
  }
};

export const uischema: UISchema = {
  'ui:group': [
    { type: 'group', fields: ['number', 'date'] },
    { type: 'group', fields: ['updatedNumber', 'updatedDate'] }
  ],
  'ui:label': {
    basisName: 'Основание доверия составителя документа',
    number: 'Универсальный передаточный документ',
    factory: 'Сведения о факторе',
    purpose: 'Функция',
    currencyCode: 'Валюта',
    currencyExchangeRate: 'Курс валюты',
    paymentDocuments: 'К платежно-расчетному документу',
    cargoFrom: 'Грузоотправитель',
    consignee: 'Грузополучатель',
    updatedNumber: '',
    economicSubjectName: 'Продавец',
    recipient: 'Покупатель',
    carrier: 'Перевозчик',
    transferred: 'Товар передал',
    transportation: 'Транспортировка и груз',
    informationField: 'Информационное поле',
    basis: 'Основание уступки денежного требования'
  },

  number: { placeholder: 'Введите номер' },
  date: { placeholder: 'Дата' },
  updatedNumber: { placeholder: 'Введите номер исправления' },
  updatedDate: { placeholder: 'Дата' },
  economicSubjectName: { disabled: true },
  basisName: { placeholder: 'Введите основание доверия' },
  paymentDocuments: {
    number: { placeholder: 'Введите номер' },
    date: { placeholder: 'Дата' },
    cost: { placeholder: 'Сумма' }
  },
  basis: {
    width: 1300,
    title: { width: 195, placeholder: 'Введите наименование' },
    number: { width: 195, placeholder: 'Введите номер' },
    date: { width: 120, placeholder: 'Дата' },
    information: { width: 195, placeholder: 'Введите доп.сведения' },
    identifier: { width: 195, placeholder: 'Введите идентификатор' },

    'ui:group': [
      {
        type: 'group',
        fields: ['title', 'number', 'date', 'information', 'identifier']
      }
    ]
  },
  informationField: {
    attribute: { placeholder: 'Введите идентификатор' },
    value: { placeholder: 'Введите значение' }
  },
  recipient: {
    placeholder: 'Введите покупателя',
    'ui:options': {
      loadOptions: async (search: string, callback: (fn: any) => void) => {
        const { rows } = await AutocompleteService.recipient.request(search);
        const options = rows.map(({ id, type, title }: any) => ({
          type,
          label: title,
          value: id
        }));
        callback(options);
      }
    }
  },
  currencyCode: {
    placeholder: 'Введите валюту',
    'ui:options': {
      loadOptions: async (search: string, callback: (fn: any) => void) => {
        const { rows } = await AutocompleteService.currency.request(search);
        const options = rows.map(({ digital_code, title }: any) => ({
          label: title,
          value: digital_code
        }));
        callback(options);
      }
    }
  },
  transferred: {
    employee: uiEmployee(),
    assignee: uiAssignee(),
    fl: uiFl(),

    'ui:widget': 'radio',
    'ui:popup': { title: 'Товар передал' }
  },
  currencyExchangeRate: {
    placeholder: 'Введите курс валюты',
    width: 320
  },
  transportation: {
    operationInformation: { placeholder: 'Введите содержание операции' },
    fields: {
      title: { placeholder: 'Введите наименование' },
      number: { placeholder: 'Введите номер' },
      date: { placeholder: 'Дата' },
      information: { placeholder: 'Введите доп.сведения' },
      identifier: { placeholder: 'Введите идентификатор' }
    },
    'ui:widget': 'radio',
    'ui:popup': { title: 'Транспортировка и груз', width: '880px' },
    'ui:group': [
      {
        type: 'group',
        width: ['25%', '15%', '17%', '18%', '25%'],
        fields: ['title', 'number', 'date', 'information', 'identifier']
      }
    ]
  },

  carrier: uiCompany({ titlePopup: 'Перевозчик' }),
  factory: uiCompany({ titlePopup: 'Сведения о факторе' }),
  cargoFrom: uiCompany({ titlePopup: 'Грузоотправитель' }),
  consignee: uiCompany({ titlePopup: 'Грузополучатель' })
};
