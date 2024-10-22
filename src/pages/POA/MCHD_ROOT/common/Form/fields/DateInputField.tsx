import React from 'react';
import { useField } from 'formik';
import DateInput from '../elements/DateInput';
import { StyledFormField, FieldWrapper } from '../Form.styles';
import FieldLabel from '../FieldLabel';
import FieldError from '../FieldError';
import { format, isValid } from 'date-fns';

type DateInputField = {
  name: string;
  label?: string;
  hideErrors?: boolean;
  placeholder?: string;
};

const DateInputField = ({ name, label, hideErrors, placeholder }: DateInputField) => {
  const [field, meta, helpers] = useField({ name, type: 'date' });
  const { value } = field;
  const { touched, error } = meta;
  const { setValue } = helpers;
  const dateFormat = 'dd.MM.yyyy';

  const handleChange = (date: Date) => isValid(date) && setValue(format(date, dateFormat));
  const handleFocus = () => value === '' && setValue(format(new Date(), dateFormat));

  return (
    <StyledFormField>
      {label && <FieldLabel name={name}>{label}</FieldLabel>}

      <FieldWrapper>
        <DateInput
          name={name}
          value={value}
          hasError={!!error}
          touched={touched}
          hideErrors={hideErrors}
          setValue={setValue}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={handleFocus}
          dateFormat={dateFormat}
        />
      </FieldWrapper>

      {!hideErrors && touched && error && <FieldError>{error}</FieldError>}
    </StyledFormField>
  );
};

export default DateInputField;
