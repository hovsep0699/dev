import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Label from '../Label';

const Select = props => {
  const {
    DomainVO,
    initialValue,
    onChange,
    onValueChange,
    width,
    labelAlign,
    isRequired,
    errorMsg,
    hasLabel,
    selectorWidth,
    wrapperClasses
  } = props;

  const [selectValue, setSelectValue] = useState(initialValue || DomainVO.options[0].value);
  useEffect(() => {
    if (!initialValue) setSelectValue(DomainVO.options[0].value);
    if (initialValue && initialValue !== selectValue) {
      setSelectValue(initialValue);
    }
  }, [DomainVO.options, initialValue, selectValue]);
  const handleChange = e => {
    const newValue = e.target.value || null;
    setSelectValue(newValue);
    onChange(e);
    onValueChange(newValue);
  };
  const errorClass = errorMsg ? 'error' : '';
  const classes = `ds-select ${errorClass}`;
  const options = DomainVO.options.map(({ value, title }, index) => (
    <option value={value ?? ''} key={`${DomainVO.field}${index}`} selected={selectValue === value}>
      {title}
    </option>
  ));
  const placeholderOption = DomainVO.placeholder && (
    <option value="" disabled key={`${DomainVO.field}.placeholder`}>
      {DomainVO.placeholder}
    </option>
  );
  return (
    <div className={`group ${wrapperClasses}`}>
      <Label
        title={DomainVO.name}
        isRequired={isRequired}
        align={labelAlign}
        isVisible={!!labelAlign && hasLabel}
      />
      <div className="group" style={{ width }}>
        <select
          name={DomainVO.field}
          title={DomainVO.hint}
          value={selectValue}
          onChange={handleChange}
          className={classes}
          style={{ width: selectorWidth }}
        >
          {placeholderOption}
          {options}
        </select>
        <span className="ds-field-name bottom error">{errorMsg}</span>
      </div>
    </div>
  );
};
Select.defaultProps = {
  onChange: () => {},
  initialValue: '',
  width: '',
  hasLabel: true
};
Select.propTypes = {
  onChange: PropTypes.func,
  DomainVO: PropTypes.any.isRequired,
  initialValue: PropTypes.any,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hasLabel: PropTypes.bool
};

export default Select;
