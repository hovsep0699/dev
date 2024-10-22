import styled, { css } from 'styled-components';

function disabled({ theme: { disabled } }: any) {
  return disabled
    ? css`
        color: hsl(0, 0%, 60%);
      `
    : '';
}

export const HTMLTextArea = styled.textarea`
  ${disabled}
`;
