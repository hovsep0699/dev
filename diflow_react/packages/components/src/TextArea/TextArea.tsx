import React, { FC, FocusEvent, ChangeEvent } from 'react';
import { ThemeProvider } from 'styled-components';

import { HTMLTextArea } from './TextArea.style';

export interface TextAreaProps {
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onInput?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  value?: string[] | string;
  name?: string;
  disabled?: boolean;
  style?: any;
}

export const TextArea: FC<TextAreaProps> = ({
  name,
  value,
  onChange,
  onInput,
  onFocus,
  ...props
}) => {
  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => onChange?.(e);

  const handleOnInput = (e: ChangeEvent<HTMLTextAreaElement>) => onInput?.(e);

  const handleOnFocus = (e: FocusEvent<HTMLTextAreaElement>) => onFocus?.(e);

  return (
    <ThemeProvider theme={{ disabled: Boolean(props.disabled) }}>
      <HTMLTextArea
        {...props}
        onChange={handleOnChange}
        onInput={handleOnInput}
        onFocus={handleOnFocus}
        value={value}
        name={name}
      />
    </ThemeProvider>
  );
};
