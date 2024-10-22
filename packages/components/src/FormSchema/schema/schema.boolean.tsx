import React from 'react';

import Widgets from '../widgets';
import { getOptions, optionsList } from '../utils';

export const SchemaBoolean: React.FC<any> = props => {
  const { name, schema, uiSchema, onChange } = props;
  const { title } = schema;
  const { widget = 'checkbox', ...options } = getOptions(uiSchema);

  if (!Widgets.hasOwnProperty(widget)) {
    throw new Error(`widget list does not contain ${widget}`);
  }

  // @ts-ignore
  const Widget = Widgets[widget];
  const enumOptions = optionsList({
    enum: schema.enum || [true, false],
    enumNames: schema.enumNames || ['Да', 'Нет']
  });

  return (
    <Widget
      name={name}
      label={title || name}
      schema={schema}
      options={{ ...options, enumOptions }}
      onChange={onChange}
    />
  );
};
