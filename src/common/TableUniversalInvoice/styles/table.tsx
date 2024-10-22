import styled from 'styled-components';
import { Table, TableRow, TableCell, Text } from 'grommet';

export const HTMLTable = styled(Table)<{ $error: boolean }>`
  width: 100%;
  max-width: 1600px;
  margin: 25px 0;
  border: ${({ $error }) => ($error ? '1px solid red' : 'none')};
  border-block-start-width: initial;
`;

export const HTMLRow = styled(TableRow)``;

export const HTMLCell = styled(TableCell)<{ $align?: string }>`
  padding: 0;
  border: 1px solid ${({ theme: { border } }) => border};
  text-transform: none;
  vertical-align: middle;
  text-align: ${({ $align }) => ($align ? $align : '')};

  span {
    font-size: 14px;
    line-height: 18px;
  }
`;

export const HTMLCellBg = styled<any>(HTMLCell)`
  background-color: ${({ theme: { bg } }) => bg};
`;

export const HTMLText = styled(Text)`
  color: ${({ theme: { text } }) => text};

  font-family: Roboto, Arial, 'Helvetica Neue';
  font-weight: bold;
`;
