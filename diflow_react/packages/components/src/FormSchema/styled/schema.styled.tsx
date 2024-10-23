import styled from 'styled-components';
import { HTMLTitle } from '../template/style';

export const HTMLObject = styled.div<any>`
  width: ${({ $width }) => ($width ? $width + 'px' : '100%')};
`;

export const HTMLObjectTitle = styled<any>(HTMLTitle)`
  margin-top: 12px;
  font-size: 17px;
  font-weight: 600;
`;
