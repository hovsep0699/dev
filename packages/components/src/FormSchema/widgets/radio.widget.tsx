import React, { FC } from 'react';
import set from 'lodash.set';

import { Context } from '../context';
import { RadioBox } from '../../radio';

import { HTMLRadio, HTMLRadioItem } from './radio.styled';

export interface IRadioWidgetProps {
  onChange: (name: string, value: string) => void;
  name: string;
  uiSchema: Record<string, unknown>;
  formValue: any;
  schemaPath: string;
  schemaName: string;
  options: {
    enumOptions: { label: string; value: string | number | boolean }[];
  };
}

const RadioWidget: FC<IRadioWidgetProps> = ({
  name,
  onChange,
  formValue,
  schemaPath,
  options: { enumOptions }
}) => {
  const { onChange: onChangeDefault, formData } = React.useContext(Context);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(name, e.target.value);
    } else {
      const data = set(formData, schemaPath, e.target.value);
      onChangeDefault({ ...data });
    }
  };

  return (
    <HTMLRadio>
      {enumOptions.map((opt, i) => (
        <HTMLRadioItem key={`${name}-${i}`}>
          <RadioBox
            key={String(opt.value)}
            label={opt.label}
            name={name}
            value={opt.value}
            checked={String(formValue) === String(opt.value)}
            onChange={handleOnChange}
          />
        </HTMLRadioItem>
      ))}
    </HTMLRadio>
  );
};

export { RadioWidget };
export default RadioWidget;
