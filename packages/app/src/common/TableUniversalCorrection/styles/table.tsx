import styled, { css } from 'styled-components';
import { Table, TableRow, TableCell, Text } from 'grommet';

const csserror = ({ error }: any) => {
  if (!error) return '';
  return css`
    padding: 1px;
    box-shadow: 0px 0px 0px 3px rgba(255, 0, 0, 1) inset;
  `;
};

export const HTMLTable = styled(Table)`
  width: 100%;
  max-width: 1600px;
  margin: 25px 0;
`;

export const HTMLRow = styled(TableRow)``;

export const HTMLCell = styled<any>(TableCell)`
  padding: 0;
  border: 1px solid ${({ theme: { border } }) => border};
  text-transform: none;
  position: relative;

  span {
    font-size: 14px;
    line-height: 42px;
  }
  ${csserror}
`;

export const HTMLCellBg = styled<any>(HTMLCell)`
  background-color: ${({ theme: { bg } }) => bg};
`;

export const HTMLText = styled(Text)`
  color: ${({ theme: { text } }) => text};

  font-family: Roboto, Arial, 'Helvetica Neue';
  font-weight: bold;
`;
