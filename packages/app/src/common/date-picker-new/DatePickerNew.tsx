import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import './style.css';
import { Icons } from '@distate/components';

type Props = {
  value?: Date;
  onChange?: (date: any) => void;
  label?: string;
  required?: boolean;
  placeholder?: string;
  error?: any;
  errors?: string[];
};

/** Новый компонент календаря без ошибок заполнения */
export const DatePickerNew = (props: Props) => {
  const { value, onChange, label, required, placeholder, error, errors } = props;

  const [startDate, setStartDate] = useState(value);

  useEffect(() => {
    setStartDate(value);
  }, [value]);

  const handleOnChange = (date: Date) => {
    setStartDate(date);
    if (onChange && typeof onChange === 'function') {
      onChange(date);
    }
  };

  return (
    <div
      className={`date-picker-wrapper ${!label ? 'date-picker-label' : ''} ${
        error ? 'date-picker-error' : ''
      }`}
    >
      {label && (
        <div className={`date-picker-label ${required ? 'date-picker-label--required' : ''}`}>
          {label}
        </div>
      )}
      <DatePicker
        locale={ru}
        placeholderText={placeholder}
        dateFormat={'dd.MM.yyyy'}
        selected={value ? startDate : null}
        onChange={handleOnChange}
      />
      <div className="date-picker-icon">
        <Icons.IconCalendar fill="#70706a" />
      </div>
      {errors && <span className="date-picker-text-error">{errors[0]}</span>}
    </div>
  );
};
