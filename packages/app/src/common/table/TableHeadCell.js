import React from 'react';

const TableHeadCell = ({ children, ...rest }) => {
  return <th {...rest}>{children}</th>;
};

export default TableHeadCell;
