import React from 'react';

import {
  HTMLBlock,
  HTMLHeader,
  HTMLList,
  HTMLListItem,
  HTMLListImage,
  HTMLListLabel
} from './dev.operators.style';
import seeds from './seeds';

export const DevOperators: React.FC<{}> = () => {
  if (!seeds.length) return null;

  return (
    <HTMLBlock>
      <HTMLHeader>Коннекторы находятся в разработке:</HTMLHeader>
      <HTMLList>
        {seeds.map(({ path, label }) => (
          <HTMLListItem title={`Коннектор "${label}" в разработке`} key={path}>
            <HTMLListImage src={path} />
            <HTMLListLabel>{label}</HTMLListLabel>
          </HTMLListItem>
        ))}
      </HTMLList>
    </HTMLBlock>
  );
};
