import React from 'react';
import PropTypes from 'prop-types';

const Colgroup = props => {
  const colsTotalWidthInPercent = props.cols.reduce((sum, currentWidth) => sum + currentWidth);
  if (Math.round(colsTotalWidthInPercent) !== 100) {
    throw Error(
      `Сумма colWidth в Colgroup должна быть 100. Сейчас сумма равна ${colsTotalWidthInPercent}`
    );
  }
  const colNodes = props.cols.map((colWidth, index) => <col key={index} width={`${colWidth}%`} />);
  return <colgroup>{colNodes}</colgroup>;
};

Colgroup.propTypes = {
  cols: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default Colgroup;
