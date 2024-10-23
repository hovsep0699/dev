import React from 'react';
import { StyledFieldError } from './Form.styles';

type FieldErrorProps = {
  children: React.ReactNode;
};

const FieldError = ({ children }: FieldErrorProps) => {
  return <StyledFieldError as="div">{children}</StyledFieldError>;
};

export default FieldError;
