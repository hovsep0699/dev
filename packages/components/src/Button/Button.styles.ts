import styled, { css } from 'styled-components';
import { darken, lighten, getLuminance } from 'polished';
import { IButton } from './Button';
import { IconReload } from '../icons';
import { spin } from '../styles/keyframes';

export type IconWrapper = Pick<IButton, 'size' | 'busy' | 'solid'>;

export const Reload = styled(IconReload)`
  width: 16px;
  height: 16px;
  animation: ${spin} 1.5s linear infinite;
`;

export const IconWrapper = styled.div<IconWrapper>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ theme, size }) => theme.main.sizes.lineHeight[size]};
  transform: ${({ busy }) => (busy ? 'translateY(0%)' : 'translateY(-100%)')};
  transition: transform ${({ theme }) => theme.main.animation.standart};

  svg {
    width: 16px;
    height: 16px;
    animation: ${({ busy }) =>
      busy &&
      css`
        ${spin} 1.5s linear infinite
      `};
  }
`;

export type Inner = Pick<IButton, 'busy' | 'solid'>;

export const Inner = styled.div<Inner>`
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${({ busy }) => (busy ? 'translateY(0%)' : 'translateY(-100%)')};
  transition: transform ${({ theme }) => theme.main.animation.standart};
`;

export type StyledButtonProps = Pick<
  IButton,
  'kind' | 'size' | 'disabled' | 'busy' | 'fullWidth' | 'solid'
> & {
  hasChildren: boolean;
  hasIcon: boolean;
  toogleTheme: boolean;
};

const backgroundButtonTheme = ({ theme, kind, solid, toogleTheme }: any) => {
  if (solid) return 'transparent';

  if (toogleTheme && theme.themeName === 'dark') {
    return theme.main.color?.darkBold || theme.main.color.default;
  }

  return theme.main.color?.[kind] || theme.main.color.default;
};

export default styled.button<StyledButtonProps>`
  display: inline-block;
  position: relative;
  height: ${({ theme, size, solid }) => !solid && theme.main.sizes.lineHeight[size]};
  min-width: ${({ theme, solid }) => !solid && theme.main.sizes.lineHeight.default};
  margin: 0;
  padding: ${({ theme, solid }) => (solid ? '0' : `0 ${theme.main.sizes.padding}`)};
  vertical-align: middle;
  outline: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.main.font.size.default};
  font-weight: 500;
  line-height: ${({ theme, size, solid }) => !solid && theme.main.sizes.lineHeight[size]};
  border-radius: ${({ theme }) => theme.main.sizes.borderRadius};
  overflow: hidden;
  text-decoration: none;
  text-align: center;
  box-sizing: border-box;
  border: none;
  box-shadow: ${({ theme, solid }) => !solid && theme.main.shadow.low};
  transition: box-shadow ${({ theme }) => theme.main.animation.standart};
  background-color: ${backgroundButtonTheme};
  color: ${({ theme, kind, disabled }) =>
    getLuminance(theme.main.color?.[kind] || theme.main.color.default) * 100 > 70 || disabled
      ? theme.main.font.color.black
      : theme.main.font.color.white};
  font-family: Roboto;
  white-space: nowrap;
  width: ${({ fullWidth }) => fullWidth && '100%'};

  &:hover {
    box-shadow: ${({ theme, disabled, solid }) =>
      !solid && !disabled && theme.main.shadow.standart};
  }

  &:active {
    background-color: ${({ theme, kind, solid }) =>
      !solid
        ? (kind !== 'default' &&
            darken(0.025, theme.main.color?.[kind] || theme.main.color.default)) ||
          darken(0.025, theme.main.color.default)
        : 'transparent'};
    box-shadow: ${({ theme, solid }) => !solid && theme.main.shadow.hover};
  }

  &:disabled {
    background-color: ${({ theme, kind }) =>
      (kind !== 'default' &&
        lighten(0.255, theme.main.color?.[kind] || theme.main.color.default)) ||
      lighten(0.04, theme.main.color.default)};
    cursor: default;
  }

  svg {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    margin-left: ${({ hasChildren }) => !hasChildren && 'auto'};
    margin-right: ${({ hasChildren }) => (hasChildren ? '12px' : 'auto')};
  }

  ${Inner} {
    transform: ${({ hasIcon, solid }) => (solid || !hasIcon) && 'translateY(0%)'};
  }
`;
