import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import './DateInput.module.css';
import { ddmmyyyy, ddmmyyyyToDate } from '../../../utils/DateUtil';
import styles from '../../../pages/upd/forms/ArrayGroup.module.css';
import FieldWrap from './FieldWrap';
import PropTypes from 'prop-types';
import MaskedInput from 'react-maskedinput';
import classNames from 'classnames';

const DateInputNew = ({
  DomainVO,
  initialValue,
  onValueChange,
  labelAlign,
  hasLabel,
  isRequired,
  errorMsg,
  wrapperClasses,
  ...restProps
}) => {
  const [dateState, setDateState] = useState(null);
  const selectedDate = initialValue
    ? ddmmyyyyToDate(initialValue, 'dd.MM.yyyy', new Date())
    : dateState;

  const handleFocus = () => {
    if (!dateState && dateState !== '') {
      setDateState(new Date());
      onValueChange(ddmmyyyy(new Date().toString()));
    }
  };

  const handleDateChange = value => {
    if (value instanceof Date) {
      setDateState(value);
      onValueChange(ddmmyyyy(value.toString()));
    } else {
      setDateState('');
      onValueChange('');
    }
  };

  const errorClasses = classNames({
    error: errorMsg
  });

  return (
    <FieldWrap
      label={DomainVO.name}
      labelAlign={labelAlign}
      hasLabel={hasLabel}
      isRequired={isRequired}
      errorMsg={errorMsg}
      customClasses={wrapperClasses}
    >
      <DatePicker
        selected={selectedDate}
        onFocus={handleFocus}
        onChange={handleDateChange}
        className={`ds-input date ${styles.input} ${errorClasses}`}
        title="Введите дату в формате dd.mm.yyyy"
        locale={ru}
        dateFormat="dd.MM.yyyy"
        placeholderText="Дата"
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
        labelAlign={labelAlign}
        {...restProps}
        customInput={<MaskedInput mask="11.11.1111" size={null} />}
      />
    </FieldWrap>
  );
};

DateInputNew.propTypes = {
  DomainVO: PropTypes.object,
  initialValue: PropTypes.string,
  onValueChange: PropTypes.func,
  labelAlign: PropTypes.string,
  hasLabel: PropTypes.string
};

export default DateInputNew;
