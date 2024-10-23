import React from 'react';
import get from 'lodash.get';
import { logos } from '../../../../../helpers/path';
import {
  HTMLList,
  HTMLListImage,
  HTMLCheckbox,
  HTMLListItem,
  HTMLListLabel
} from './operators.style';

export interface IOperatorsProps {
  data: any[];
  onChange?: (data: any, checked: boolean) => void;
}

export const Operators: React.FC<IOperatorsProps> = ({ data, onChange }) => {
  return (
    <HTMLList>
      {data.map(item => (
        <Operator key={item.code} onChange={onChange} {...item} />
      ))}
    </HTMLList>
  );
};

export const Operator: React.FC<any> = ({ code, checked, name, onChange }) => {
  const onClick = () => {
    onChange?.(code, !checked);
  };

  return (
    <HTMLListItem key={code} $active={Boolean(checked)}>
      <HTMLCheckbox checked={Boolean(checked)} noState={true} onChange={onClick} />
      <HTMLListImage src={get(logos, code)} />
      <HTMLListLabel>{name}</HTMLListLabel>
    </HTMLListItem>
  );
};
