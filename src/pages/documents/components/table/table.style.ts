import styled from 'styled-components';
import {
  TableHeader,
  Table,
  TableFooter,
  TableBody,
  TableRow,
  TableCell,
  TableCellProps
} from 'grommet';

export const HTMLContainer = styled.div<{}>(() => {
  return {
    position: 'relative',
    width: '100%'
  };
});

export const HTMLTableHeader = styled(TableHeader)<{}>(() => {
  return {
    width: '100%'
  };
});

export const HTMLTableBody = styled(TableBody)<{}>(() => {
  return {
    width: '100%',
    overflow: 'auto',

    '.table-row > .table-cell': {
      borderTop: '1px solid #d3d3d3'
    },
    '.table-row:first-child > .table-cell, .no-border > .table-cell': {
      borderTop: 0
    }
  };
});

export const HTMLTableFooter = styled(TableFooter)<{}>(() => {
  return {
    width: '100%'
  };
});

export const HTMLTable = styled(Table)<{}>(() => {
  return {
    borderCollapse: 'separate',
    borderSpacing: 0,
    height: 'auto'
  };
});

export const HTMLTableRow = styled(TableRow)<{}>(() => {
  return {
    position: 'relative',
    width: '100%'

    // td: {
    //   borderTop: '1px solid #c3c3c3'
    // },
    // ':first-child td': {
    //   borderTop: 0
    // }
  };
});

interface ITableCell extends TableCellProps {
  alignBlock?: 'center' | 'end';
}

export const HTMLTableCell = styled(TableCell)<ITableCell>(({ alignBlock }) => {
  const align = alignBlock === 'end' ? 'flex-end' : alignBlock;
  const textAlign = alignBlock === 'end' ? 'right' : alignBlock;

  return {
    textAlign,

    '> div': {
      textAlign,
      justifyContent: align
    }
  };
});

export const HTMLFooter = styled.div<{}>(() => {
  return {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: -12,
    marginRight: -12
  };
});

export const HTMLFooterItem = styled.div<{}>(() => {
  return {
    position: 'relative',
    whiteSpace: 'nowrap',
    paddingLeft: 12,
    paddingRight: 12
  };
});

export const HTMLFooterButton = styled.div<{}>(() => {
  return {};
});
