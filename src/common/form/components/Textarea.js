import React from 'react';
import PropTypes from 'prop-types';
import FieldWrap from './FieldWrap';
import styles from './Textarea.module.css';

const Textarea = ({
  DomainVO,
  initialValue,
  onValueChange,
  errorMsg,
  width,
  labelAlign,
  isRequired,
  hasLabel,
  wrapperClasses
}) => {
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
      <textarea
        rows={3}
        name={DomainVO.field}
        title={DomainVO.hint}
        className={`ds-input ${styles.textarea}`}
        data-field-name={DomainVO.field}
        placeholder={DomainVO.placeholder}
        onChange={e => onValueChange(e.target.value)}
        value={initialValue}
      />
    </FieldWrap>
  );
};

Textarea.defaultProps = {
  onChange: () => {},
  initialValue: ''
};

Textarea.propTypes = {
  onValueChange: PropTypes.func,
  initialValue: PropTypes.string,
  hasLabel: PropTypes.bool,
  isRequired: PropTypes.bool
};

export default Textarea;
