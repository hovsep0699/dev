import styled from 'styled-components';
import { TableBody, Text } from 'grommet';

export const HTMLContainer = styled.div``;

export const HTMLBody = styled(TableBody)``;

export const HTMLTitle = styled.div`
  font-size: 24px;
  font-weight: 300;
  padding-bottom: 12px;
  color: #212122;
  text-align: center;
`;

export const HTMLText = styled(Text)`
  color: ${({ theme: { text } }) => text};
  padding: 0 8px;

  font-family: Roboto, Arial, 'Helvetica Neue';
  font-weight: normal;
`;
