import React from 'react';
import set from 'lodash.set';

import { Context } from '../context';
import { Input } from '../../Input';

const TextWidget: React.FC<any> = React.memo(
  ({
    required,
    name,
    formValue,
    formDefaultValue,
    label,
    schemaPath,
    error = [],
    uiSchema = {}
  }) => {
    const { onChange, formData } = React.useContext(Context);
    const { placeholder, width, disabled } = uiSchema;

    const handleOnChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      const data = set(formData, schemaPath, value);
      onChange({ ...data });
    };

    return (
      <Input
        disabled={disabled}
        border={!disabled}
        name={name}
        error={Boolean(error.length)}
        errors={error}
        width={width}
        label={label}
        placeholder={placeholder}
        value={typeof formValue === 'undefined' ? formDefaultValue : formValue}
        required={required}
        onChange={handleOnChange}
      />
    );
  }
);

export { TextWidget };
