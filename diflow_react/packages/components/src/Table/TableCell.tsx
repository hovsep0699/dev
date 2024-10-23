import React from 'react';
import styled from 'styled-components';

const StyledTableCell = styled.td`
  color: ${({ theme }) => theme.main.font.color.black};
  padding: ${({ theme }) => parseInt(theme.main.sizes.padding) / 2}px;
  font-size: ${({ theme }) => theme.main.font.size.small};
  line-height: ${({ theme }) => theme.main.sizes.lineHeight.default};
  min-height: ${({ theme }) =>
    parseInt(theme.main.sizes.lineHeight.default) + parseInt(theme.main.sizes.padding)}px;
  font-weight: 400;
  transition: all 0.2s;
`;

const TableCellInner = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${({ theme }) => theme.main.font.size.small};
  line-height: ${({ theme }) => parseInt(theme.main.sizes.lineHeight.default) / 2}px;
`;

type TableCellTypes = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  rowSpan?: number;
  colSpan?: number;
};

const TableCell = ({ children, style, rowSpan, colSpan }: TableCellTypes) => {
  return (
    <StyledTableCell rowSpan={rowSpan} colSpan={colSpan}>
      <TableCellInner style={style}>{children}</TableCellInner>
    </StyledTableCell>
  );
};

export default TableCell;
