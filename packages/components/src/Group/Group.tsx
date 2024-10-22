import React from 'react';

import { HTMLContainer, HTMLItem } from './Group.style';

type GroupProps = {
  children: React.ReactNode;
};

export const Group: React.FC<GroupProps> = ({ children }) => {
  const items = React.Children.toArray(children);

  return (
    <HTMLContainer>
      {items.map((child, i) => (
        <HTMLItem key={i}>{child}</HTMLItem>
      ))}
    </HTMLContainer>
  );
};
