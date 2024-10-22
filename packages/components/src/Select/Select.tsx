import React from 'react';
import ReactSelect from 'react-select';
import styled from 'styled-components';
import cn from 'classnames';
import { rgba } from 'polished';

import { getBorderColor } from '../Form/Form.styles';
import { HTMLContainer, HTMLLabel, HTMLError } from './select.style';

const StyledSelect = styled(ReactSelect)`
  &.react-select-container {
    width: 100%;
    position: relative;
  }

  & .react-select__control {
    display: flex;
    background-color: ${({ theme }) => theme.main.color.white};
    border: 1px solid
      ${({ theme, error, touched, value, hideErrors }) =>
        theme.main.color[getBorderColor({ error, touched, value, hideErrors })]};
    border-radius: 2px;
    box-sizing: border-box;
    color: ${({ theme }) => theme.main.font.color.black};
    font-size: ${({ theme }) => theme.main.font.size.default};
    font-weight: 400;
    line-height: ${({ theme }) => parseInt(theme.main.sizes.lineHeight.default) - 2}px;
    margin: 0;
    min-height: ${({ theme }) => theme.main.sizes.lineHeight.default};
    padding: 0 0 0 ${({ theme }) => theme.main.sizes.padding};
    position: relative;
    transition: box-shadow ${({ theme }) => theme.main.animation.standart};
    outline: 0;
    width: 100%;

    &:hover {
      box-shadow: ${({ theme }) => theme.main.shadow.standart};
      border-color: ${({ theme, error, touched, value, hideErrors }) =>
        theme.main.color[getBorderColor({ error, touched, value, hideErrors })]};
    }

    &:focus,
    &.react-select__control--is-focused {
      border-color: ${({ theme }) => theme.main.color.primary};
      box-shadow: ${({ theme }) => `inset 0 2px 5px 0 ${rgba(theme.main.color.primary, 0.26)},
    inset 0 2px 10px 0 ${rgba(theme.main.color.primary, 0.06)}`};
    }
  }
  & .react-select__value-container {
    padding: 0;

    & * {
      padding: 0;
      margin: 0;
    }
  }
  & .react-select__menu {
    border-radius: 0 0 2px 2px;
    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.main.color.borderColor};
    margin-top: 0;
    margin-bottom: 0;
    box-shadow: ${({ theme }) => theme.main.shadow.standart};
  }
  & .react-select__option {
    &--is-focused {
      background: ${({ theme }) => theme.main.color.primary};
      color: ${({ theme }) => theme.main.font.color.white};
    }
    &--is-selected {
      background: ${({ theme }) => theme.main.color.secondary};
      color: ${({ theme }) => theme.main.font.color.white};
    }
  }
`;

const Select = (props: any) => {
  const {
    label,
    value,
    width,
    className,
    disabled,
    error,
    errors,
    touched,
    required,
    ...rest
  } = props;

  return (
    <HTMLContainer $width={width}>
      {label && <HTMLLabel $required={!!required}>{label}</HTMLLabel>}
      <StyledSelect
        {...rest}
        className={cn('react-select-container', className)}
        classNamePrefix="react-select"
        value={value || ''}
        isDisabled={Boolean(disabled)}
        error={error}
        touched={touched}
      />
      {errors && <HTMLError>{errors}</HTMLError>}
    </HTMLContainer>
  );
};

export default Select;
