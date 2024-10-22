import { Schema, UISchema } from '@distate/components/dist/FormSchema';

export const schema: Schema = {
  type: 'object',
  properties: {
    infoFields: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          attribute: {
            type: 'string',
            title: 'Идентификатор'
          },
          value: {
            type: 'string',
            title: 'Значение'
          }
        }
      }
    }
  }
};

export const uiSchema: UISchema = {
  'ui:group': [
    {
      type: 'section',
      title: 'Информационное поле',
      align: 'center',
      border: false,
      fields: ['infoFields']
    }
  ]
};
