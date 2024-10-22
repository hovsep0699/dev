import React, { forwardRef } from 'react';
import { ReactDatePickerProps } from 'react-datepicker';
import ru from 'date-fns/locale/ru';

import { Input } from '../Input';
import { IconCalendar } from '../icons';
import { HTMLContainer, HTMLContent, HTMLLabel, HTMLDatePicker } from './DatePicker.style';

export type DatePickerProps = {
  error?: any;
  value?: Date;
  label?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
  onChange?: (date: any) => void;
} & Omit<ReactDatePickerProps, 'value' | 'onChange' | 'selected'>;

export const DatePicker = React.forwardRef<React.RefObject<HTMLInputElement>, DatePickerProps>(
  (
    {
      dateFormat = 'dd.MM.yyyy',
      placeholder,
      value,
      name,
      error,
      label,
      required,
      onChange,
      ...props
    },
    ref
  ) => {
    const [startDate, setStartDate] = React.useState<Date>(value);

    const handleOnChange = (date: Date) => {
      setStartDate(date);
      if (onChange && typeof onChange === 'function') {
        onChange(date);
      }
    };

    const CustomInput = forwardRef((inputProps: any, _ref) => {
      return (
        <Input
          ref={_ref}
          {...inputProps}
          placeholder={placeholder}
          error={error}
          autocomplete={false}
          name={name}
          iconAfter={<IconCalendar />}
        />
      );
    });

    return (
      <HTMLContainer>
        {label && <HTMLLabel $required={!!required}>{label}</HTMLLabel>}
        <HTMLContent>
          <HTMLDatePicker
            {...props}
            dateFormat={dateFormat}
            locale={ru}
            selected={value ? startDate : null}
            onChange={handleOnChange}
            customInput={<CustomInput ref={ref} />}
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
          />
        </HTMLContent>
      </HTMLContainer>
    );
  }
);
