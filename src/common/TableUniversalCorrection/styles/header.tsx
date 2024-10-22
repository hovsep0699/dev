import styled from 'styled-components';
import { TableHeader } from 'grommet';

import { HTMLCell as Cell } from './table';

export const HTMLHeader = styled(TableHeader)`
  background: ${({ theme: { bg } }) => bg};
`;

// @ts-ignore
export const HTMLCell = styled(Cell)`
  padding: 3px 6px;
`;
