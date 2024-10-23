import React, { useMemo, useRef } from 'react';
import set from 'lodash.set';

import { Autocomplete } from '../../Autocomplete';
import { isObject } from '../utils';
import { Context } from '../context';

type Option = {
  label: any;
  value: any;
};

const AutocompleteWidget: React.FC<any> = ({
  name,
  label,
  options,
  onChange,
  required,
  schemaPath,
  formValue,
  formDefaultValue,
  error = [],
  uiSchema = {}
}) => {
  const optionsRef = useRef<Option | Option[]>();
  const { enumOptions = [], loadOptions = () => {} } = options;
  const { onChange: onChangeDefault, formData } = React.useContext(Context);
  const { width, placeholder = '' } = uiSchema;

  const handleOnChange = (options: Option | Option[]) => {
    optionsRef.current = options;
    if (onChange) {
      onChange(name, options);
    } else {
      const data = set(formData, schemaPath, options);
      onChangeDefault({ ...data });
    }
  };

  const value = () => {
    if (isObject(formValue) && formValue.hasOwnProperty('value')) {
      return formValue;
    }

    return typeof formValue === 'undefined' ? formValue : formDefaultValue;
  };

  return (
    <Autocomplete
      name={name}
      label={label}
      width={width}
      placeholder={placeholder}
      defaultOptions={enumOptions}
      required={required}
      error={Boolean(error.length)}
      value={value()}
      loadOptions={loadOptions}
      onChange={handleOnChange}
    />
  );
};

export { AutocompleteWidget };
