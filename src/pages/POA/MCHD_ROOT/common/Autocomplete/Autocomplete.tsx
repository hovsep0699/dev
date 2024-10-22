import React from 'react';
import { ThemeContext } from 'styled-components';

import {
  HTMLContainer,
  HTMLInput,
  HTMLLabel,
  HTMLSelect,
  customStyles
} from './Autocomplete.style';

type IAutocomplete = {
  value?: any;
  placeholder?: string;
  defaultOptions?: any[];
  label?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: any;
  className?: string;
  styleNoBorder?: boolean;
  error?: boolean;
  errors?: string[];
  loadOptions: (inputValue: string, callback: any) => Promise<any> | void;
  [name: string]: any;
};

export const Autocomplete: React.FC<IAutocomplete> = ({
  name,
  label,
  value,
  className,
  disabled,
  required,
  onChange,
  error,
  errors,
  loadOptions,
  simple,
  defaultOptions,
  placeholder = '',
  width,
  ...props
}) => {
  const thema = React.useContext(ThemeContext);

  const handleInputChange = (value: any) => {
    if (onChange) onChange(value, name);
  };

  return (
    <HTMLContainer className={className} $width={width}>
      {label && <HTMLLabel $required={!!required}>{label}</HTMLLabel>}
      {disabled ? (
        <HTMLInput
          value={value ? value.label || value.value : ''}
          className={className}
          disabled={disabled}
        />
      ) : (
        <HTMLSelect
          {...props}
          value={value || ''}
          width={width}
          cacheOptions
          error={error}
          styles={customStyles(thema, { simple })}
          onChange={handleInputChange}
          loadOptions={loadOptions}
          placeholder={placeholder}
          defaultOptions={defaultOptions}
        />
      )}
      {errors ? <small className="error">{errors[0]}</small> : null}
    </HTMLContainer>
  );
};
