import React from 'react';
import set from 'lodash.set';
import get from 'lodash.get';

import { widgets } from '../widgets';
import { Context } from '../context';
import { isSelect, hasWidget } from '../utils';
import { getOptions, optionsList, dateFormat } from '../utils';

export const SchemaString: React.FC<any> = props => {
  const {
    required,
    schemaName,
    schemaPath,
    schema,
    uiSchema,
    onChange,
    formData,
    errorSchema
  } = props;
  const { title, format } = schema;

  const { formData: mainFormData } = React.useContext(Context);

  const enumOptions = isSelect(schema) && optionsList(schema);
  let defautlWidget: keyof typeof widgets = enumOptions ? 'select' : 'text';

  if (format && hasWidget(format)) {
    defautlWidget = format;
  }

  const { widget = defautlWidget, ...rest } = getOptions(uiSchema);
  const options: Record<string, any> = { ...rest, enumOptions };

  if (!widgets.hasOwnProperty(widget)) {
    throw new Error(`widget list does not contain ${widget}`);
  }

  const formDefaultValue = get(schema, 'default');
  if (typeof formDefaultValue !== 'undefined' && typeof formData === 'undefined') {
    let value;

    switch (widget) {
      case 'select':
        value = enumOptions.find(({ value }: any) => String(value) === formDefaultValue);
        break;
      case 'date':
        const { format = 'dd.MM.yyyy' } = options;
        value = dateFormat(formDefaultValue, format);
        break;
      default:
        value = formDefaultValue;
        break;
    }

    if (value) {
      set(mainFormData, schemaPath, value);
    }
  }

  const Widget = widgets[widget];
  const error = get(errorSchema, 'errors');

  return (
    <Widget
      name={schemaName}
      label={title}
      error={error}
      required={required}
      schema={schema}
      uiSchema={uiSchema}
      schemaPath={schemaPath}
      onChange={onChange}
      formValue={formData}
      formDefaultValue={formDefaultValue}
      options={options}
    />
  );
};
