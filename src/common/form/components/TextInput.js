import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TextInput = props => {
  const [inputValue, setInputValue] = useState('');
  const { DomainVO, initialValue, onChange, onValueChange, customClasses } = props;
  useEffect(() => {
    if (initialValue !== inputValue) {
      setInputValue(initialValue);
    }
  }, [initialValue, inputValue]);

  const handleChange = event => {
    const newVal = DomainVO.hasOwnProperty('mask')
      ? DomainVO.mask(event.target.value)
      : event.target.value;
    setInputValue(newVal);
    onChange(event);
    onValueChange(newVal);
  };

  const classes = classNames('ds-input', customClasses);

  return (
    <input
      type="text"
      name={DomainVO.field}
      title={DomainVO.hint}
      data-field-name={DomainVO.field}
      className={classes}
      placeholder={DomainVO.placeholder}
      onChange={handleChange}
      value={inputValue}
    />
  );
};
TextInput.defaultProps = {
  onChange: () => {},
  onValueChange: () => {},
  initialValue: ''
};
TextInput.propTypes = {
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  initialValue: PropTypes.any
};

export default TextInput;
