import React from 'react';
import './style.css';

type Props = {
  value: string | number;
  name: string;
  onChange: any;
  label?: string;
  id?: string | number;
  defaultChecked?: boolean;
  style?: any;
  checked?: any;
};

export const RadioButton = (props: Props) => {
  const {
    value,
    name,
    id = Math.random(),
    defaultChecked,
    label,
    onChange,
    style,
    checked
  } = props;

  return (
    <div className="common-radio-button" style={style}>
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        onChange={onChange}
        id={id.toString()}
        checked={checked}
      />{' '}
      <label htmlFor={id.toString()}>{label}</label>
    </div>
  );
};
