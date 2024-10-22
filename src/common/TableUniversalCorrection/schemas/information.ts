import { Schema, UISchema } from '@distate/components/dist/FormSchema';

export const schema: Schema = {
  type: 'object',
  properties: {
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
    code: {
      type: 'string',
      title: 'Код товара'
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
      border: false,
      fields: ['code', 'description', 'sort', 'article', 'kindCode']
    }
  ],
  code: { disabled: true, placeholder: '-- информация отсутствует --' },
  sort: { disabled: true, placeholder: '-- информация отсутствует --' },
  article: { disabled: true, placeholder: '-- информация отсутствует --' },
  kindCode: { disabled: true, placeholder: '-- информация отсутствует --' },
  description: { disabled: true, placeholder: '-- информация отсутствует --' }
};
