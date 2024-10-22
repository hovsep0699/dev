import React from 'react';
import PropTypes from 'prop-types';
import { SHOW_RECORDS } from '../Lbl';

const Perpage = props => {
  return (
    <label>
      <span>{SHOW_RECORDS} </span>
      <select className="ds-select width-auto" value={props.value} onChange={props.handleChange}>
        {props.limits.map((limit, index) => (
          <option key={index} value={limit}>
            {limit}
          </option>
        ))}
      </select>
    </label>
  );
};
Perpage.propTypes = {
  limits: PropTypes.array.isRequired,
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Perpage;
