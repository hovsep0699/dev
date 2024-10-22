import React from 'react';
import { StyledTag, StyledIconClose } from './Tag.styles';

export type TagKinds = 'success';
export type TagProps = {
  children: React.ReactNode;
  kind?: TagKinds;
  className?: string;
  handleRemove?: () => void;
};

const Tag = ({ className, children, kind, handleRemove }: TagProps) => {
  return (
    <StyledTag
      as={handleRemove ? 'button' : 'span'}
      className={className}
      kind={kind}
      removable={!!handleRemove}
      onClick={handleRemove}
    >
      {children}
      <StyledIconClose />
    </StyledTag>
  );
};

export default Tag;
