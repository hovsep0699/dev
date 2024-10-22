import React from 'react';
import './style.css';

type Props = {
  /** значение */
  value?: string;
  /** ппризнак ошибки */
  error?: boolean;
  /** обработка изменения текста */
  onChange: any;
  /** заголовок */
  label?: string;
};

export const Textarea = (props: Props | any) => {
  const { value, error, onChange, label, ...properties } = props;

  return (
    <label>
      {label && <span className="common-label">{label}</span>}
      <textarea
        value={value}
        className={error ? 'custom-textarea error' : 'custom-textarea'}
        onChange={onChange}
        {...properties}
      />
    </label>
  );
};
