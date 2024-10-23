import React from 'react';
import set from 'lodash.set';

import { Schema } from '../typings';
import { Context } from '../context';
import { CheckBox } from '../../CheckBox';
import { HTMLContainer } from './checkbox.style';

export type CheckboxWidgetProps = {
  name: string;
  label: string;
  schema: Schema;
  schemaName: string;
  options: {
    enumOptions: { label: string; value: string | number | boolean }[];
    [name: string]: any;
  };
};

const CheckboxWidget: React.FC<CheckboxWidgetProps> = ({ name, label, options, schemaName }) => {
  const { enumOptions } = options;
  const { onChange, formData } = React.useContext(Context);

  const handleOnChange = ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
    const index = checked ? 0 : 1;
    const { value } = enumOptions[index] || { value: checked };

    const path = [schemaName.replace('root', ''), name].filter(Boolean).join('.');
    const data = set(formData, path, value);
    onChange({ ...data });
  };

  return (
    <HTMLContainer>
      <CheckBox label={label} onChange={handleOnChange} />
    </HTMLContainer>
  );
};

export { CheckboxWidget };
