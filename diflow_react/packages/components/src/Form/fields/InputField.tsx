import React from 'react';
import { useField } from 'formik';
import TextInput from '../elements/TextInput';
import FieldLabel from '../FieldLabel';
import FieldError from '../FieldError';
import { StyledFormField, FieldWrapper } from '../Form.styles';
import { IMask } from '../utils/parseValue';

type InputFieldProps = {
  name: string;
  label?: string;
  type?: 'text' | 'email' | 'number' | 'password' | 'search' | 'tel';
  placeholder?: string;
  hideErrors?: boolean;
  mask?: IMask[];
};

const InputField = ({
  name,
  label,
  type = 'text',
  placeholder,
  mask,
  hideErrors = false
}: InputFieldProps) => {
  const [field, meta, helpers] = useField({ name, type });
  const { touched, error } = meta;
  const { setValue } = helpers;

  return (
    <StyledFormField>
      {label && <FieldLabel name={name}>{label}</FieldLabel>}

      <FieldWrapper>
        <TextInput
          type={type}
          touched={touched}
          error={!!error}
          placeholder={placeholder}
          hideErrors={hideErrors}
          setValue={setValue}
          mask={mask}
          {...field}
        />
      </FieldWrapper>

      {!hideErrors && touched && error ? <FieldError>{error}</FieldError> : null}
    </StyledFormField>
  );
};

export default InputField;
