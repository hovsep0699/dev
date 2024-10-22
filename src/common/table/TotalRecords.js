import React from 'react';
import PropTypes from 'prop-types';
import { TOTAL_RECORDS } from '../Lbl';

const TotalRecords = props => {
  return (
    <span>
      <span>{TOTAL_RECORDS}: </span>
      <span>{props.recordsNum}</span>
    </span>
  );
};
TotalRecords.defaultProps = {
  recordsNum: 0
};
TotalRecords.propTypes = {
  recordsNum: PropTypes.number
};
export default TotalRecords;
