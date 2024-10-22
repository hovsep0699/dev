import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import {
  HTMLContainer,
  HTMLContent,
  HTMLInput,
  HTMLLabel,
  HTMLIcon,
  HTMLError
} from './Input.style';
import { getValueFloat } from './utils';

export type InputProps = {
  value?: string | number;
  float?: number;
  placeHolder?: string;
  label?: string;
  error?: boolean;
  errors?: string[];
  disabled?: boolean;
  width?: number;
  border?: boolean;
  touched?: boolean;
  required?: boolean;
  className?: string;
  iconAfter?: React.ReactNode;
  hideErrors?: boolean;
  iconBefore?: React.ReactNode;
  autocomplete?: boolean;
  contentClassName?: string;
  maxLength?: number;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<any, InputProps>(
  (
    {
      className,
      contentClassName,
      name,
      label,
      disabled,
      error,
      errors = [],
      border = true,
      autocomplete = true,
      value = '',
      required,
      iconBefore,
      iconAfter,
      width,
      float,
      placeHolder,
      onChange,
      onFocus,
      onBlur,
      type,
      maxLength,
      ...props
    },
    ref
  ) => {
    const [isFocus, setFocus] = React.useState(false);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
      if (!errors.length) return;
      setShowError(true);
    }, [errors]);

    const mask = () => {
      let str = value || '';

      if (typeof placeHolder !== 'undefined') {
        if (!str || str === '0.00' || str === placeHolder) {
          return "";
        }
      }

      if (typeof float !== 'undefined') {
        str = String(str)
          .replace(/[^\d.]/g, '')
          .replace(/^([^.]*[.])|[.]/g, '$1');

        if (!str) {
          str = Number.parseFloat(str).toFixed(float);
        }

        if (str === 'NaN') {
          str = Number.parseFloat('0').toFixed(float);
        }
      }

      return str;
    };

    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocus(false);

      if (typeof float !== 'undefined') {
        const targetValue = Number.parseFloat(e.target.value).toFixed(float);
        e.target.value = targetValue;
        onChange?.(e);
      }

      if (onBlur) onBlur?.(e);
    };

    const onFocusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocus(true);
      e.target.select();
      if (onFocus) onFocus?.(e);
    };

    /** првоерка длины текста */
    const isLimitAllows = (e: React.ChangeEvent<HTMLInputElement>) => {
      /** если не задана длина или она меньше указанной - вернется true */
      return !maxLength || e.target.value.length < maxLength;
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setShowError(false);
      if (typeof float !== 'undefined' && isLimitAllows(e)) {
        const cursor = e.target.selectionStart ?? 0;
        const { value, offset } = getValueFloat(e.target.value, float);

        e.target.value = value;
        e.target.selectionStart = cursor + offset;
        e.target.selectionEnd = cursor + offset;
      }

      onChange?.(e);
    };

    const [isHover, setHover] = React.useState(false);

    const onMouseEnterHandler = () => setHover(true);
    const onMouseLeaveHandler = () => setHover(false);

    const renderIcon = (icon: React.ReactNode) => {
      if (!icon) return null;

      return <HTMLIcon>{icon}</HTMLIcon>;
    };

    return (
      <HTMLContainer $width={width ?? 0} className={className}>
        {label && <HTMLLabel $required={!!required}>{label}</HTMLLabel>}
        <HTMLContent
          $isFocus={isFocus}
          $isHover={isHover}
          $border={border}
          $error={error}
          $hasBeforeIcon={!!iconBefore}
          $hasAfterIcon={!!iconAfter}
          className={cn(contentClassName)}
        >
          {renderIcon(iconBefore)}
          <HTMLInput
            {...props}
            ref={ref}
            placeholder={placeHolder}
            type={type}
            name={name}
            value={mask()}
            disabled={Boolean(disabled)}
            autoComplete={autocomplete ? 'on' : 'off'}
            $border={border}
            $hasBeforeIcon={!!iconBefore}
            $hasAfterIcon={!!iconAfter}
            $paddingLefg={!iconBefore}
            $paddingRight={!iconAfter}
            onBlur={onBlurHandler}
            onFocus={onFocusHandler}
            onChange={onChangeHandler}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
            maxLength={maxLength}
          />
          {renderIcon(iconAfter)}
        </HTMLContent>
        {showError && errors.length ? <HTMLError>{errors[0]}</HTMLError> : null}
      </HTMLContainer>
    );
  }
);
