import React from 'react';
import PropTypes from 'prop-types';
import FieldWrap from './FieldWrap';
import TextInput from './TextInput';
import classNames from 'classnames';

const Text = props => {
  const {
    DomainVO,
    initialValue,
    onChange,
    onValueChange,
    errorMsg,
    width,
    labelAlign,
    isRequired,
    hasLabel,
    wrapperClasses
  } = props;
  const inputClasses = classNames({
    error: errorMsg
  });
  return (
    <FieldWrap
      key={DomainVO.field}
      label={DomainVO.name}
      hasLabel={hasLabel}
      labelAlign={labelAlign}
      isRequired={isRequired}
      width={width}
      errorMsg={errorMsg}
      customClasses={wrapperClasses}
    >
      <TextInput
        DomainVO={DomainVO}
        initialValue={initialValue}
        onChange={onChange}
        onValueChange={onValueChange}
        customClasses={inputClasses}
      />
    </FieldWrap>
  );
};
Text.defaultProps = {
  onChange: () => {},
  onValueChange: () => {},
  initialValue: ''
};
Text.propTypes = {
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  initialValue: PropTypes.any
};

export default Text;
