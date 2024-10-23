import styled from 'styled-components';
import { TableBody, Text } from 'grommet';

export const HTMLBody = styled(TableBody)``;

export const HTMLText = styled(Text)<{ $error?: boolean }>`
  color: ${({ theme: { text } }) => text};

  font-family: Roboto, Arial, 'Helvetica Neue';
  font-weight: normal;
  background-color: ${({ $error }) => ($error ? 'red' : 'none')};
`;
