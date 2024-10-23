import { Schema, UISchema } from '@distate/components/dist/FormSchema';

export const schema: Schema = {
  type: 'object',
  properties: {
    root: {
      type: 'object',
      oneOf: {
        productNotSubjectToLabelingOrTraceability: {
          title: 'Товар не подлежит маркировке или прослеживаемости',
          type: 'null'
        },
        productTraceabilityInformation: {
          title: 'Сведения о товаре, подлежащем прослеживаемости',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              number: {
                type: 'string',
                title: 'Регистрационный номер партии товаров'
              },
              measurement: {
                type: 'string',
                title: 'Единица измерения'
              },
              measurementValue: {
                type: 'string',
                title: 'Кол-во'
              },
              additionalIndicator: {
                type: 'string',
                title: 'Дополнительная информация'
              }
            }
          }
        },
        productIdentificationNumber: {
          type: 'array',
          title: 'Номер средств идентификации товаров',
          items: {
            type: 'object',
            properties: {
              packNumber: {
                type: 'string',
                title: 'Уникальный идентификатор'
              },
              type: {
                type: 'string',
                title: 'Тип идентификатора',
                enum: ['empty', 1, 2],
                // @ts-ignore
                enumNames: [
                  'отсутствует',
                  'Контрольный идентификационный знак',
                  'Уникальный идентификатор вторичной (потребительской)/третичной (заводской, транспортной) упаковки'
                ]
              },
              collection: {
                type: 'string',
                title: 'Значение'
              }
            }
          }
        }
      }
    }
  }
};

export const uiSchema: UISchema = {
  root: {
    'ui:widget': 'radio',
    productNotSubjectToLabelingOrTraceability: {
      display: 'none'
    }
  },
  'ui:group': [
    {
      type: 'section',
      border: false,
      title: 'Сведения о прослеживаемости или маркировке товара',
      fields: ['root']
    }
  ]
};
