import styled from 'styled-components';

export const StyledBadge = styled.div`
  box-sizing: border-box;
  display: inline-block;
  position: relative;
  vertical-align: middle;
`;

export const StyledBadgeInner = styled.div`
  display: inline-block;
  position: absolute;
  top: -7px;
  right: 4px;
  padding: ${({ theme }) => parseInt(theme.main.sizes.padding) / 4}px 6px;
  line-height: 1;
  font-size: ${({ theme }) => theme.main.font.size.default};
  font-weight: 600;
  text-shadow: none;
  border-radius: ${({ theme }) =>
    parseInt(theme.main.font.size.default) + parseInt(theme.main.sizes.padding) / 2}px;
  background: ${({ theme }) => theme.main.color.danger};
  color: ${({ theme }) => theme.main.font.color.light};
  text-align: center;
  z-index: 60;
  letter-spacing: normal;
  transform: translateX(50%);
  pointer-events: none;
`;
