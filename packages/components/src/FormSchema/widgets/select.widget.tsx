import React from 'react';
import set from 'lodash.set';

import { isObject } from '../utils';
import { Context } from '../context';
import { Select } from '../../Select';

type Option = {
  label: any;
  value: any;
};

const SelectWidget: React.FC<any> = React.memo(
  ({
    onChange,
    required,
    name,
    label,
    options,
    formValue,
    formDefaultValue,
    schemaPath,
    error = [],
    uiSchema = {}
  }) => {
    const { enumOptions = [], ...props } = options;
    const { onChange: onChangeDefault, formData } = React.useContext(Context);
    const { width, placeholder = '' } = uiSchema;

    const handleOnChange = (options: Option | Option[]) => {
      if (onChange) {
        onChange(name, options);
      } else {
        const data = set(formData, schemaPath, options);
        onChangeDefault({ ...data });
      }
    };

    let value = enumOptions.find((item: any) => {
      if (Array.isArray(formValue)) {
        return formValue.indexOf(item.value) !== -1;
      }

      return formValue;
    });

    if (!value && formDefaultValue) {
      value = enumOptions.find((item: any) => item.value === formDefaultValue);
    }

    return (
      <Select
        {...props}
        name={name}
        label={label}
        error={Boolean(error.length)}
        value={formValue || formDefaultValue}
        width={width}
        onChange={handleOnChange}
        options={enumOptions}
        placeholder={placeholder}
        required={required}
      />
    );
  }
);

export { SelectWidget };
