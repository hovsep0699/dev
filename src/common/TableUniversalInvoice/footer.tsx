import React, { useContext } from 'react';

import { IconPlus } from '@distate/components/dist/icons';
import { HTMLInput } from './styles/form';
import { HTMLRow, HTMLCell, HTMLCellBg } from './styles/table';
import { HTMLFooter, HTMLButtonAppend, HTMLCellFirst } from './styles/footer';
import { TableContext } from './context';

export const TableFooter: React.FC<{}> = () => {
  const { values, onAppend } = useContext(TableContext);
  const {
    total: { totalAmountOfTax = '0.00', totalCostAfterTax = '0.00', totalCostBeforeTax = '0.00' }
  } = values;

  return (
    <HTMLFooter>
      <HTMLRow>
        <HTMLCellFirst colSpan={2}>
          <HTMLButtonAppend icon={<IconPlus />} onClick={onAppend}>
            Добавить запись
          </HTMLButtonAppend>
        </HTMLCellFirst>
        <HTMLCell colSpan={3} $align="right">
          Итого:
        </HTMLCell>
        <HTMLCell>
          <HTMLInput float={2} name="totalCostBeforeTax" value={totalCostBeforeTax as string} />
        </HTMLCell>
        <HTMLCell colSpan={2} />
        <HTMLCell>
          <HTMLInput float={2} name="totalAmountOfTax" value={totalAmountOfTax as string} />
        </HTMLCell>
        <HTMLCell>
          <HTMLInput float={2} name="totalCostAfterTax" value={totalCostAfterTax as string} />
        </HTMLCell>
        <HTMLCell colSpan={3}> </HTMLCell>
        <HTMLCellBg colSpan={2}> </HTMLCellBg>
      </HTMLRow>
    </HTMLFooter>
  );
};
