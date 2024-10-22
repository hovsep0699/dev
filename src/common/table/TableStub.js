import React from 'react';
import PropTypes from 'prop-types';

const TableStub = ({ colSpan, stubContent }) => {
  return (
    <tbody>
      <tr>
        <td colSpan={colSpan}>{stubContent}</td>
      </tr>
    </tbody>
  );
};

TableStub.propTypes = {
  colSpan: PropTypes.number.isRequired,
  stubContent: PropTypes.node.isRequired
};

export default TableStub;
