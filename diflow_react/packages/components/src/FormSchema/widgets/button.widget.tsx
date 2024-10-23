import React from 'react';
import Button from '../../Button';

const ButtonWidget: React.FC<any> = React.memo(({ label, formValue, uiSchema = {} }) => {
  const { onClick } = uiSchema;
  return <Button onClick={onClick}>{label || formValue}</Button>;
});

export { ButtonWidget };
