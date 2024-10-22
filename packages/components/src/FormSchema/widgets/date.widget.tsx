import React from 'react';
import set from 'lodash.set';

import { dateParse, dateFormat } from '../utils';
import { Context } from '../context';
import { DatePicker } from '../../DatePicker';

const DateWidget: React.FC<any> = ({
  name,
  label,
  error = [],
  options,
  formValue,
  formDefaultValue,
  schemaPath,
  uiSchema = {}
}) => {
  const { onChange, formData } = React.useContext(Context);
  const { placeholder, disabled } = uiSchema;
  const { format = 'dd.MM.yyyy' } = options;

  const result = typeof formValue === 'undefined' ? formDefaultValue : formValue;
  const value = React.useMemo(() => dateParse(result, format), [format, result]);

  const onChangeStartHandle = (date: Date) => {
    const data = set(formData, schemaPath, dateFormat(date, format));
    onChange({ ...data });
  };

  return (
    <DatePicker
      placeholder={placeholder}
      name={name}
      label={label}
      error={Boolean(error.length)}
      onChange={onChangeStartHandle}
      value={value}
      dateFormat={format}
      disabled={disabled}
    />
  );
};

export { DateWidget };
