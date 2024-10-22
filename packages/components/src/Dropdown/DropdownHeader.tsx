import React from 'react';
import styled from 'styled-components';

const StyledDropdownHeader = styled.div`
  display: block;
  padding: ${({ theme }) =>
    `${parseInt(theme.main.sizes.padding) / 2}px ${theme.main.sizes.padding}`};
  margin: -${({ theme }) => theme.main.sizes.padding} 0 0;
  border-top-left-radius: ${({ theme }) => theme.main.sizes.borderRadius};
  border-top-right-radius: ${({ theme }) => theme.main.sizes.borderRadius};
  line-height: ${({ theme }) => theme.main.sizes.lineHeight.default};
  background: ${({ theme }) => theme.main.color.greyLight};
  color: ${({ theme }) => theme.main.font.color.dark};
  font-size: ${({ theme }) => theme.main.font.size.default};
  font-weight: 400;
`;

export interface IDropdownHeader {
  children: React.ReactNode;
}

export default ({ children }: IDropdownHeader) => (
  <StyledDropdownHeader>{children}</StyledDropdownHeader>
);
