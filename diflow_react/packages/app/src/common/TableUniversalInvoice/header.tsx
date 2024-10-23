import React, { memo } from 'react';

import { ITableHeader } from './types';
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

export const TableHeader: React.FC<ITableHeader> = memo(() => {
  return (
    <HTMLHeader>
      <HTMLRow>
        {renderText('№')}
        {renderText('Наименование')}
        {renderText('Единица измерения')}
        {renderText('Кол-во')}
        {renderText('Цена за ед.')}
        {renderText('Стоимость без налога')}
        {renderText('В том числе акциз')}
        {renderText('Налоговая ставка')}
        {renderText('Сумма налога')}
        {renderText('Стоимость c налогом')}
        {renderText('')}
        {renderText('')}
        {renderText('')}
        {renderText('', { colSpan: 2 })}
      </HTMLRow>
    </HTMLHeader>
  );
});
