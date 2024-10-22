import { Schema, UISchema } from '@distate/components/dist/FormSchema';

export const schema: Schema = {
  type: 'object',
  properties: {
    kind: {
      type: 'string',
      title: 'Признак',
      enum: [1, 2, 3, 4, 5],
      enumNames: ['Имущество', 'Работа', 'Услуга', 'Имущественные права', 'Иное']
    },
    orderedCount: {
      type: 'string',
      title: 'Отпускаемое количество'
    },
    code: {
      type: 'string',
      title: 'Код товара'
    },
    description: {
      type: 'string',
      title: 'Характеристика'
    },
    sort: {
      type: 'string',
      title: 'Сорт товара'
    },
    article: {
      type: 'string',
      title: 'Артикул'
    },
    catalogCode: {
      type: 'string',
      title: 'Код каталога'
    },
    kindCode: {
      type: 'string',
      title: 'Код вида товара (ТН ВЭД)'
    }
  }
};

export const uiSchema: UISchema = {
  'ui:group': [
    {
      type: 'section',
      title: 'Дополнительные сведения о товаре',
      align: 'center',
      border: false,
      fields: [
        'code',
        'sort',
        'kind',
        'article',
        'kindCode',
        'catalogCode',
        'description',
        'orderedCount'
      ]
    }
  ],
  kind: { width: 320, placeholder: 'Выберите признак' },
  orderedCount: { width: 320, placeholder: 'Введите отпускаемое количество' },
  code: { width: 320, placeholder: 'Введите код товара (до 100 символов)' },
  description: { width: 320, placeholder: 'Введите характеристики/описание товара' },
  sort: { width: 320, placeholder: 'Введите сорт товара (до 10 символов)' },
  article: { width: 320, placeholder: 'Введите артикул товара (до 50 символов)' },
  catalogCode: { width: 320, placeholder: 'Введите код каталога (27 символов)' },
  kindCode: { width: 320, placeholder: 'Введите код вида товара (ТН ВЭД)' }
};
