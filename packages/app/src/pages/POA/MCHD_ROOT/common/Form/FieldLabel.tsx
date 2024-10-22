import React from 'react';
import { StyledFormLabel } from './Form.styles';

type FieldLabelProps = {
  id?: string;
  name?: string;
  children: React.ReactNode;
};

const FieldLabel = ({ id, name, children }: FieldLabelProps) => {
  return <StyledFormLabel htmlFor={id || name}>{children}</StyledFormLabel>;
};

export default FieldLabel;
