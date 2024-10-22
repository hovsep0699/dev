import React, { FC } from 'react';

import { HTMLLabel, HTMLLabelName } from './radio.style';

export interface IRadioProps {
  name?: string;
  label?: string;
  checked?: boolean;
  value?: string | number | boolean;
  options?: any;
  onChange?: any;
}

export const RadioBox: FC<IRadioProps> = ({ name, label, value, checked, onChange }) => {
  return (
    <HTMLLabel>
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        value={String(value)}
        data-label={label}
      />
      <HTMLLabelName>{label}</HTMLLabelName>
    </HTMLLabel>
  );
};
