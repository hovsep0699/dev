import React from 'react';
import PropTypes from 'prop-types';
import style from './Radio.module.css';
import classNames from 'classnames';

const Radio = props => {
  const { name, title, value, onChange, isChecked, isBlock, isWidthAuto } = props;
  const handleChange = e => {
    if (!e.target.checked) return;
    onChange(e.target.value);
  };
  const classes = classNames(
    {
      [style.block]: isBlock,
      [style.widthAuto]: isWidthAuto,
      group: !isBlock
    },
    [style.radio]
  );
  return (
    <label className={classes}>
      <div className="ds-radio">
        <input
          type="radio"
          id={value}
          name={name}
          value={value}
          onChange={handleChange}
          checked={isChecked}
        />
        <span></span>
      </div>
      {title}
    </label>
  );
};
Radio.defaultProps = {
  title: '',
  onChange: () => {}
};
Radio.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.any,
  onChange: PropTypes.func
};

export default Radio;
