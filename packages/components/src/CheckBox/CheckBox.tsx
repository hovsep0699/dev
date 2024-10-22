import React from 'react';
import { Label, Icon, HiddenCheckbox, StyledCheckbox, LabelContent } from './CheckBox.styles';

export interface ICheckBox {
  name?: string;
  checked?: boolean;
  defaultValue?: boolean;
  onChange?: React.FormEventHandler<HTMLInputElement>;
  onBlur?: React.FormEventHandler<HTMLInputElement>;
  children?: React.ReactNode;
  label?: string;
  dark?: boolean;
  className?: string;
  noState?: boolean;
}

const CheckBox = ({
  name,
  checked,
  defaultValue,
  label,
  children,
  onChange,
  onBlur,
  className,
  dark,
  noState
}: ICheckBox) => {
  const handleOnChange = (e: any) => {
    onChange(e);
  };

  if (defaultValue) {
    return (
      <Label>
        <HiddenCheckbox name={name} defaultChecked={defaultValue} onBlur={onBlur} />

        <StyledCheckbox checked={defaultValue} $isLabel={!!(label || children)}>
          <Icon />
        </StyledCheckbox>

        {(label || children) && <LabelContent dark={dark}>{label || children}</LabelContent>}
      </Label>
    );
  }

  return (
    <Label>
      <HiddenCheckbox name={name} checked={checked} onBlur={onBlur} onChange={handleOnChange} />

      <StyledCheckbox checked={checked} $isLabel={!!(label || children)}>
        <Icon />
      </StyledCheckbox>

      {(label || children) && <LabelContent dark={dark}>{label || children}</LabelContent>}
    </Label>
  );
};

export default CheckBox;
