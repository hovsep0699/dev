import React from 'react';
import { useField } from 'formik';
import FieldLabel from '../FieldLabel';
import FieldError from '../FieldError';
import { StyledFormField, FieldWrapper } from '../Form.styles';
import Select from '../../Select';

type Option = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
  options: Option[];
  isClearable?: boolean;
  isSearchable?: boolean;
  hideErrors?: boolean;
};

const SelectField = ({
  name,
  label,
  placeholder = '',
  options,
  hideErrors = false,
  ...rest
}: SelectFieldProps) => {
  const [field, meta, helpers] = useField({ name });
  const { touched, error } = meta;
  const { setValue, setTouched } = helpers;
  const handleOnChange = (option: Option, actionData: any): void => {
    setTouched(true);
    if (actionData.action === 'set-value' || actionData.action === 'select-option') {
      setValue(option.value);
    }
    if (actionData.action === 'clear') {
      setValue('');
    }
  };
  const handleOnBlur = () => {
    setTouched(true);
  };
  return (
    <StyledFormField>
      {label && <FieldLabel name={name}>{label}</FieldLabel>}

      <FieldWrapper>
        <Select
          name={field.name}
          placeholder={placeholder}
          options={options}
          value={options ? options.find((option: Option) => option.value === field.value) : ''}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          error={error}
          touched={touched}
          hideErrors={hideErrors}
          {...rest}
        />
      </FieldWrapper>

      {!hideErrors && touched && error ? <FieldError>{error}</FieldError> : null}
    </StyledFormField>
  );
};

export default SelectField;
