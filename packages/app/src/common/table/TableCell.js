import React from 'react';

const TableCell = ({ children, ...rest }) => {
  return <td {...rest}>{children}</td>;
};

export default TableCell;
