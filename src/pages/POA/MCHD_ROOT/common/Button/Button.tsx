import React from 'react';
import StyledButton, { Inner, IconWrapper, Reload } from './Button.styles';
import { IconReload } from '../../assets/icons';

export enum ButtonKinds {
  Default = 'default',
  Primary = 'primary',
  Orange = 'orange',
  Secondary = 'secondary',
  Danger = 'danger',
  LightGreen = 'lightGreen',
  Dark = 'dark'
}

export enum ButtonSizes {
  Default = 'default',
  Small = 'small',
  Large = 'large'
}

export interface IButton {
  onClick?: (e: React.SyntheticEvent) => void;
  children?: React.ReactNode;
  kind?: ButtonKinds;
  size?: ButtonSizes;
  disabled?: boolean;
  icon?: JSX.Element;
  busy?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  solid?: boolean;
  className?: string;
  toogleTheme?: boolean;
  style?: Object;
}

const Button = ({
  children,
  kind = ButtonKinds.Default,
  size = ButtonSizes.Default,
  icon,
  disabled,
  onClick,
  busy,
  type = 'button',
  fullWidth,
  solid,
  className,
  toogleTheme,
  style,
  
}: IButton) => {
  const hasChildren = !!children;
  const hasIcon = !!icon;

  const handleOnClick = (e: React.SyntheticEvent) => {
    if (busy) return;
    if (onClick) onClick(e);
  };

  return (
    <StyledButton
      type={type}
      onClick={handleOnClick}
      kind={kind}
      size={size}
      disabled={disabled}
      hasChildren={hasChildren}
      hasIcon={hasIcon}
      busy={busy}
      fullWidth={fullWidth}
      solid={solid}
      className={className}
      toogleTheme={Boolean(toogleTheme)}
      style={style}
    >
      {!solid && icon && (
        <IconWrapper busy={busy} size={size}>
          <IconReload fill="currentColor" />
        </IconWrapper>
      )}
      <Inner busy={busy}>
        {solid && busy ? <Reload fill="currentColor" /> : icon}
        {children}
      </Inner>
      
    </StyledButton>
  );
};

export default Button;
