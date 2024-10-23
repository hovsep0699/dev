import React, { useCallback } from 'react';
import { StyledInput, InputWrapper, StyledIconAlert } from '../Form.styles';
import { IMask } from '../utils/parseValue';
import getMaskedValue from '../utils/getMaskedValue';

export type TextInputProps = {
  name: string;
  value: string | number;
  onChange?: React.FormEventHandler<HTMLInputElement>;
  onBlur?: React.FormEventHandler<HTMLInputElement>;
  type?: 'text' | 'email' | 'number' | 'password' | 'search' | 'tel';
  placeholder?: string;
  error?: boolean;
  touched?: boolean;
  hideErrors?: boolean;
  setValue?: any;
  mask?: IMask[];
};

const TextInput = ({
  type = 'text',
  placeholder,
  error,
  touched,
  value,
  hideErrors,
  onChange,
  setValue,
  mask,
  ...rest
}: TextInputProps) => {
  const onChangeInput = useCallback(event => setValue(getMaskedValue(mask, event.target.value)), [
    mask,
    setValue
  ]);

  const renderPlaceholder = (mask: IMask[]) => {
    if (mask) {
      return mask.map((item: any) => item.placeholder || item.fixed).join('');
    }
  };

  return (
    <InputWrapper>
      <StyledInput
        hideErrors={hideErrors}
        error={error}
        touched={touched}
        placeholder={placeholder || renderPlaceholder(mask)}
        type={type}
        value={value}
        onChange={mask ? onChangeInput : onChange}
        {...rest}
      />
      {!hideErrors && error && touched && <StyledIconAlert />}
    </InputWrapper>
  );
};

export default TextInput;
