import React from 'react';
import { useField } from 'formik';
import FieldError from '../FieldError';
import { StyledFormField, FieldWrapper } from '../Form.styles';
import CheckBox from '../../CheckBox';

type CheckboxFieldProps = {
  name: string;
  label: string;
  hideErrors?: boolean;
  dark?: boolean;
};

const CheckboxField = ({ name, label, hideErrors = false, dark = false }: CheckboxFieldProps) => {
  const [field, meta] = useField({ name, type: 'checkbox' });
  const { touched, error } = meta;

  return (
    <StyledFormField>
      <FieldWrapper>
        <CheckBox label={label} {...field} dark={dark} />
      </FieldWrapper>

      {!hideErrors && touched && error ? <FieldError>{error}</FieldError> : null}
    </StyledFormField>
  );
};

export default CheckboxField;
