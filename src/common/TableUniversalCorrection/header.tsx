import React, { memo } from 'react';

import { HTMLText, HTMLRow } from './styles/table';
import { HTMLHeader, HTMLCell } from './styles/header';

const renderText = (name: string, props: any = {}) => {
  const { align = 'center', colSpan } = props;
  return (
    <HTMLCell colSpan={colSpan} align={align} verticalAlign="middle">
      <HTMLText>{name}</HTMLText>
    </HTMLCell>
  );
};

export interface ITableHeader {}

export const TableHeader: React.FC<ITableHeader> = memo(() => {
  return (
    <HTMLHeader>
      <HTMLRow>
        {renderText('Наименование')}
        {renderText('')}
        {renderText('Единица измерения')}
        {renderText('Кол-во')}
        {renderText('Цена за ед.')}
        {renderText('Стоимость без НДС')}
        {renderText('В том числе акциз')}
        {renderText('Налоговая ставка')}
        {renderText('НДС')}
        {renderText('Всего')}
        {renderText('')}
        {renderText('')}
        {renderText('')}
      </HTMLRow>
    </HTMLHeader>
  );
});
