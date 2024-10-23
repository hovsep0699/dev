import { UISchema, Schema } from '../typings';

export const formData = {
  purpose: 'СЧФ'
};

export const schema: Schema = {
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
      enum: ['СЧФ', 'СЧФДОП', 'ДОП'],
      enumNames: [
        'счет-фактура',
        'счет-фактура с дополнительными сведениями',
        'документ об отгрузке товаров или передаче имущественных прав'
      ]
    },
    document: {
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
          summa: {
            type: 'string',
            title: 'Сумма'
          }
        }
      }
    },
    factory: {
      type: 'object',
      title: 'Сведения о факторе',
      oneOf: [
        {
          title: 'Отсутствует'
        },
        {
          title: 'Сведения о факторе',
          properties: {
            participant: {
              type: 'string'
            },
            type: {
              type: 'string',
              title: 'Тип',
              enum: ['UL', 'IP'],
              enumNames: ['ЮЛ', 'ИП']
            },
            name: {
              type: 'string',
              title: 'Наименование'
            },
            okpoul: {
              type: 'string',
              title: 'ОКПО'
            },
            inn: {
              type: 'string',
              title: 'ИНН'
            },
            kpp: {
              type: 'string',
              title: 'КПП'
            },
            divisionName: {
              type: 'string',
              title: 'Структурное подразделение'
            },
            regionCode: {
              type: 'string',
              title: 'Код региона'
            },
            postalCode: {
              type: 'string',
              title: 'Индекс'
            },
            district: {
              type: 'string',
              title: 'Район'
            },
            city: {
              type: 'string',
              title: 'Город'
            },
            settlement: {
              type: 'string',
              title: 'Населенный пункт'
            },
            street: {
              type: 'string',
              title: 'Улица'
            },
            house: {
              type: 'string',
              title: 'Дом'
            },
            building: {
              type: 'string',
              title: 'Корпус'
            },
            room: {
              type: 'string',
              title: 'Офис/квартира'
            },
            accountNumber: {
              type: 'string',
              title: 'Номер банковского счета'
            },
            bankName: {
              type: 'string',
              title: 'Наименование банка'
            },
            bik: {
              type: 'string',
              title: 'БИК'
            },
            correspondentAccount: {
              type: 'string',
              title: 'Корреспондентский счет банка'
            },
            phone: {
              type: 'string',
              title: 'Номер контактного телефона/факс'
            },
            email: {
              type: 'string',
              title: 'Email'
            }
          }
        }
      ]
    }
  }
};

export const uischema: UISchema = {
  'ui:group': [
    { type: 'group', fields: ['number', 'date'] },
    { type: 'group', fields: ['updatedNumber', 'updatedDate'] }
  ],
  'ui:label': {
    number: 'Универсальный передаточный документ',
    updatedNumber: '',
    purpose: 'Функция',
    document: 'К платежно-расчетному документу',
    factory: 'Сведения о факторе'
  },
  'ui:blocks': [
    {
      title: 'Участник',
      fields: [
        'factory.type',
        'factory.name',
        'factory.okpoul',
        'factory.inn',
        'factory.kpp',
        'factory.divisionName'
      ]
    },
    {
      title: 'Сведения об адресе',
      fields: [
        'factory.regionCode',
        'factory.postalCode',
        'factory.district',
        'factory.city',
        'factory.settlement',
        'factory.street',
        'factory.house',
        'factory.building',
        'factory.room'
      ]
    },
    {
      title: 'Банковские резвизиты',
      fields: ['factory.accountNumber']
    },
    {
      title: 'Сведения о банке',
      fields: ['factory.bankName', 'factory.bik', 'factory.correspondentAccount']
    },
    {
      title: 'Контактные данные',
      fields: ['factory.phone', 'factory.email']
    }
  ],
  purpose: {},
  number: {},
  factory: {
    inn: { width: 320 },
    kpp: { width: 320 },
    type: { width: 320 },
    name: { width: 320 },
    okpoul: { width: 320 },
    participant: { width: 320 },
    divisionName: { width: 320 },
    regionCode: { width: 320 },
    postalCode: { width: 320 },
    district: { width: 320 },
    city: { width: 320 },
    settlement: { width: 320 },
    street: { width: 320 },
    house: { width: 320 },
    building: { width: 320 },
    room: { width: 320 },
    accountNumber: { width: 320 },
    bankName: { width: 320 },
    bik: { width: 320 },
    correspondentAccount: { width: 320 },
    phone: { width: 320 },
    email: { width: 320 },
    'ui:widget': 'radio',
    'ui:popup': {
      title: 'Сведения о факторе'
    }
  }
};
