import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Radio from './Radio';

const RadioGroup = props => {
  const { DomainVO, initialValue, onChange, isBlock, isWidthAuto } = props;
  const [groupValue, setGroupValue] = useState(initialValue || DomainVO.options[0].value);
  const handleRadioChange = newValue => {
    setGroupValue(newValue);
    onChange(newValue);
  };
  useEffect(() => {
    if (initialValue !== groupValue) {
      setGroupValue(initialValue);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return DomainVO.options.map(option => {
    return (
      <Radio
        name={DomainVO.title}
        title={option.title}
        value={option.value}
        onChange={handleRadioChange}
        isChecked={groupValue === option.value}
        isBlock={isBlock}
        isWidthAuto={isWidthAuto}
      />
    );
  });
};
RadioGroup.defaultProps = {
  onChange: () => {},
  initialValue: ''
};
RadioGroup.propTypes = {
  onChange: PropTypes.func,
  DomainVO: PropTypes.any.isRequired,
  initialValue: PropTypes.any
};

export default RadioGroup;
