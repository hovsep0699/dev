import styled from 'styled-components';
import { rgba } from 'polished';

import { InputProps } from './index';

type BorderColor = Pick<InputProps, 'error' | 'touched' | 'value' | 'hideErrors'>;

const getBorderColor = ({ error, touched, hideErrors, value }: BorderColor): string => {
  if (error || (error && touched)) {
    return 'danger';
  } else if (!hideErrors && !error && touched && value !== '') {
    return 'success';
  } else {
    return 'borderColor';
  }
};

export const HTMLContainer = styled.label<{ $width: number; $disabled?: boolean }>(
  ({ $width, $disabled }) => {
    return {
      display: 'block',
      maxWidth: '100%',
      width: $width ? `${$width}px` : '100%',
      boxSizing: 'border-box',
      position: 'relative',

      '*': {
        boxSizing: 'border-box'
      }
    };
  }
);

type StyleInput = {
  $hasBeforeIcon: boolean;
  $hasAfterIcon: boolean;
  $isFocus?: boolean;
  $border?: boolean;
  $isHover?: boolean;
  $error?: boolean;
  $touched?: boolean;
  $hideErrors?: boolean;
} & Pick<InputProps, 'value'>;

export const HTMLContent = styled.div<StyleInput>(
  ({ theme, $border, value, $error, $touched, $hideErrors, $isFocus, $isHover }) => {
    let styles = {};
    const codeBorderColor = getBorderColor({
      value,
      error: $error,
      touched: $touched,
      hideErrors: $hideErrors
    });

    const borderColor = theme.main.color[codeBorderColor];
    const color26 = rgba(theme.main.color.primary, 0.26);
    const color06 = rgba(theme.main.color.primary, 0.06);

    if ($isHover) {
      styles = { ...styles, boxShadow: theme.main.shadow.standart };
    }

    if ($isFocus) {
      styles = {
        ...styles,
        borderColor: theme.main.color.primary,
        boxShadow: `inset 0 2px 5px 0 ${color26}, inset 0 2px 10px 0 ${color06}`
      };
    }

    return {
      display: 'flex',
      position: 'relative',
      transition: `box-shadow ${theme.main.animation.standart}`,
      border: `1px solid ${borderColor}`,
      borderWidth: $border ? '1px' : '0px',
      borderRadius: 2,
      backgroundColor: theme.main.color.white,

      ...styles
    };
  }
);

export const HTMLLabel = styled.div<{ $required?: boolean }>(({ $required, theme }) => {
  let styles = {};

  if ($required) {
    styles = {
      ...styles,
      '::after': {
        content: '" *"',
        color: theme.main.color.danger
      }
    };
  }

  return {
    ...styles,

    fontStyle: 'italic',
    fontSize: theme.main.font.size.small,
    lineHeight: parseInt(theme.main.sizes.lineHeight.default) / 2 + 'px',
    color: theme.main.font.color.dark
  };
});

export const HTMLInput = styled.input<{
  $hasBeforeIcon: boolean;
  $hasAfterIcon: boolean;
  $paddingLefg: boolean;
  $border: boolean;
  $paddingRight: boolean;
}>(({ theme, $border, $paddingLefg, $paddingRight }) => {
  return {
    color: theme.main.font.color.black,
    width: '100%',
    minWidth: 0,
    margin: 0,
    outline: 0,
    fontSize: theme.main.font.size.default,
    lineHeight: parseInt(theme.main.sizes.lineHeight.default) - 2 + 'px',
    minHeight: theme.main.sizes.lineHeight.default,
    paddingTop: 0,
    paddingLeft: $paddingLefg && $border ? theme.main.sizes.padding : 0,
    paddingRight: $paddingRight ? theme.main.sizes.padding : 0,
    paddingBottom: 0,
    fontWeight: 400,
    border: 0,
    backgroundColor: 'transparent',

    ':hover,:focus': {
      borderColor: 'none',
      boxShadow: 'none'
    }
  };
});

export const HTMLIcon = styled.div<{}>(({ theme }) => {
  return {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    minHeight: theme.main.sizes.lineHeight.default,
    paddingLeft: 8,
    paddingRight: 8,

    path: {
      fill: '#70706a'
    }
  };
});

export const HTMLError = styled.span`
  color: red;
  position: absolute;
  background: white;
  padding: 2px;
  z-index: 100;
  top: 100%;
  left: 0;
  right: 0;
  font-size: 11px;
  line-height: 12px;
`;
