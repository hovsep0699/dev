import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import './DateInput.styles.css';
import styled from 'styled-components';
import { StyledInput, InputWrapper, StyledIconCalendar } from '../Form.styles';
import { parse } from 'date-fns';
import ru from 'date-fns/locale/ru';
import getMaskedValue from '../utils/getMaskedValue';
import { dateMask } from '../utils/masks';

const StyledDateInput = styled<any>(StyledInput)`
  padding-right: ${({ theme }) => parseInt(theme.main.sizes.padding) * 2}px;
`;

const MaskedDateInput = forwardRef(({ value, ...rest }: any, ref) => {
  const maskedValue = getMaskedValue(dateMask, value);
  return <StyledDateInput ref={ref} value={maskedValue} {...rest} />;
});

type DateInput = {
  name: string;
  value: string;
  hasError?: boolean;
  touched?: boolean;
  hideErrors?: boolean;
  setValue?: (value: any) => void;
  placeholder?: string;
  onChange?: (value: any) => void;
  onFocus?: (value: any) => void;
  dateFormat?: string;
};

const DateInput = ({
  value,
  hasError,
  touched,
  hideErrors,
  placeholder,
  name,
  onChange,
  onFocus,
  dateFormat
}: DateInput) => {
  const isValueEmpty = value === '';
  let selected;

  if (!isValueEmpty) {
    const maskedValue = getMaskedValue(dateMask, value);
    selected = parse(maskedValue, dateFormat ?? new Date().toDateString() , new Date());
  }

  return (
    <InputWrapper>
      <DatePicker
        name={name}
        selected={selected}
        onChange={(e)=> onChange ? onChange(e) : null}
        onFocus={onFocus}
        dateFormat={dateFormat}
        locale={ru}
        placeholderText={placeholder || 'Дата'}
        title="Введите дату в формате дд.мм.гггг"
        popperPlacement="bottom-start"
        popperModifiers={{
          flip: {
            behavior: ['bottom']
          },
          preventOverflow: {
            enabled: false
          },
          hide: {
            enabled: false
          }
        }}
        customInput={<MaskedDateInput error={hasError} touched={touched} hideErrors={hideErrors} />}
      />
      <StyledIconCalendar />
    </InputWrapper>
  );
};

export default DateInput;
