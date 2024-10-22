import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Radio from './Radio';
import Label from '../Label';
import { TOP } from '../../../Placement';

const RadioField = props => {
  const { DomainVO, initialValue, onChange, width, noCaption } = props;
  const [groupValue, setGroupValue] = useState(initialValue || DomainVO.options[0].value);
  const handleRadioChange = newValue => {
    setGroupValue(newValue);
    onChange(newValue);
  };
  useEffect(() => {
    if (initialValue !== groupValue) {
      setGroupValue(initialValue);
    }
  }, [groupValue, initialValue]);
  const renderRadios = () =>
    DomainVO.options.map(option => {
      return (
        <Radio
          name={DomainVO.title}
          title={option.title}
          value={option.value}
          onChange={handleRadioChange}
          isChecked={groupValue === option.value}
          isBlock
        />
      );
    });

  return (
    <div className="group" style={{ width }}>
      {!noCaption && <Label title={DomainVO.name} align={TOP} />}
      <div className="group-block">{renderRadios()}</div>
    </div>
  );
};
RadioField.defaultProps = {
  onChange: () => {},
  initialValue: ''
};
RadioField.propTypes = {
  onChange: PropTypes.func,
  DomainVO: PropTypes.any.isRequired,
  initialValue: PropTypes.any
};

export default RadioField;
