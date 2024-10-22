import React from 'react';
import { HTMLContainer, HTMLHeader, HTMLSelect } from './companies.style';

export const Companies: React.FC<any> = ({ data = [], value, onChange }) => {
  return (
    <HTMLContainer>
      <HTMLHeader>Компания:</HTMLHeader>
      <HTMLSelect
        options={data.map((item: any) => ({ value: item.id, label: item.name }))}
        onChange={onChange}
        value={value}
      />
    </HTMLContainer>
  );
};
