import React from 'react';
import Label from './Label';
import PropTypes from 'prop-types';

const FieldWrap = props => {
  const {
    children,
    label,
    labelAlign,
    isRequired,
    width,
    errorMsg,
    key,
    hasLabel,
    customClasses
  } = props;
  return (
    <div className={`group ${customClasses}`} key={key}>
      <Label
        title={label}
        align={labelAlign}
        isVisible={!!label && hasLabel}
        isRequired={isRequired}
      />
      <div className="group" style={{ width }}>
        {children}
        <span className="ds-field-name bottom error">{errorMsg}</span>
      </div>
    </div>
  );
};

FieldWrap.defaultProps = {
  hasLabel: true
};

FieldWrap.propTypes = {
  children: PropTypes.element.isRequired,
  label: PropTypes.string,
  labelAlign: PropTypes.string,
  isRequired: PropTypes.bool,
  width: PropTypes.string,
  errorMsg: PropTypes.string,
  key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hasLabel: PropTypes.bool
};

export default FieldWrap;
