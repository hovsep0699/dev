import styled from 'styled-components';
import { TableFooter } from 'grommet';

import Button from '@distate/components/dist/Button';
import { HTMLCell } from './table';

export const HTMLFooter = styled(TableFooter)``;

export const HTMLButtonAppend = styled(Button)`
  width: 200px;
`;

export const HTMLCellFirst = styled<any>(HTMLCell)`
  background-color: ${({ theme: { bg } }) => bg};
`;
