import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import './DateInput.module.css';
import { asField } from 'informed';
import { ddmmyyyy, ddmmyyyyToDate } from '../../../utils/DateUtil';

const DateInput = asField(({ fieldState, fieldApi, ...props }) => {
  const { value } = fieldState;
  const { setValue, setTouched } = fieldApi;
  const initialLocalValue = value ? ddmmyyyyToDate(value) : null;
  const [localValue, setLocalValue] = useState(initialLocalValue);
  const onFocus = () => {
    setTouched(true);
    if (!value) {
      setValue(ddmmyyyy(new Date().toString()));
      setLocalValue(new Date());
    }
  };
  const { onChange, ...restProps } = props;
  const onChangeDate = date => {
    if (onChange) onChange(date);
    if (date) {
      setValue(ddmmyyyy(date.toString()));
    } else {
      setValue(date);
    }
    setLocalValue(date);
  };
  return (
    <DatePicker
      selected={localValue}
      onChange={onChangeDate}
      onFocus={onFocus}
      locale={ru}
      dateFormat="dd.MM.yyyy"
      placeholderText={props.placeholderText ? props.placeholderText : 'Дата'}
      popperPlacement="bottom-start"
      popperModifiers={{
        flip: {
          behavior: ['bottom'] // don't allow it to flip to be above
        },
        preventOverflow: {
          enabled: false // tell it not to try to stay within the view (this prevents the popper from covering the element you clicked)
        },
        hide: {
          enabled: false // turn off since needs preventOverflow to be enabled
        }
      }}
      {...restProps}
    />
  );
  //TODO добавить метод, который будет добавлять и убирать showMonthYearPicker props
  // при нажатии на месяц+год(кнопка сверху между стрелочками)
  // поможет описание custom header в примерах datepicker'a
});

export default DateInput;
