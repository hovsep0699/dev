import React, { useContext } from 'react';
import get from 'lodash.get';
import set from 'lodash.set';

import { IconPlus } from '@distate/components/dist/icons';
import { HTMLRow, HTMLCell } from './styles/table';
import { HTMLInput } from './styles/form';
import { HTMLText } from './styles/body';
import { HTMLFooter, HTMLButtonAppend } from './styles/footer';
import { TableContext } from './context';
import { defaultGood } from './table-universal-correction';

export const TableFooter: React.FC<{}> = () => {
  const { values, setValues, authCalculated } = useContext(TableContext);
  const { totalIncrease, totalDecrease } = values;

  const onAppend = () => {
    const newValues = { ...values };
    newValues.goods.push({
      ...defaultGood,
      row: String(newValues.goods.length + 1),
      rowType: 'edit'
    });
    setValues(newValues);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const data = { ...values };
    set(data, name, value);
    setValues(data);
  };

  return (
    <HTMLFooter>
      <HTMLRow>
        <HTMLCell rowSpan={2} colSpan={3} plain>
          <HTMLButtonAppend icon={<IconPlus />} onClick={onAppend}>
            Добавить запись
          </HTMLButtonAppend>
        </HTMLCell>
        <HTMLCell colSpan={2}>
          <HTMLText>Всего увеличение</HTMLText>
        </HTMLCell>
        <HTMLCell>
          <HTMLInput
            float={2}
            name="totalIncrease.beforeTax"
            value={get(totalIncrease, 'beforeTax', '0')}
            onChange={onChangeInput}
            disabled={authCalculated}
          />
        </HTMLCell>
        <HTMLCell rowSpan={2} colSpan={2} plain></HTMLCell>
        <HTMLCell>
          <HTMLInput
            float={2}
            name="totalIncrease.amountOfTax"
            value={get(totalIncrease, 'amountOfTax', '0')}
            onChange={onChangeInput}
            disabled={authCalculated}
          />
        </HTMLCell>
        <HTMLCell>
          <HTMLInput
            float={2}
            name="totalIncrease.afterTax"
            value={get(totalIncrease, 'afterTax', '0')}
            onChange={onChangeInput}
            disabled={authCalculated}
          />
        </HTMLCell>
        <HTMLCell rowSpan={2} colSpan={3} plain></HTMLCell>
      </HTMLRow>
      <HTMLRow>
        <HTMLCell colSpan={2}>
          <HTMLText>Всего уменьшение</HTMLText>
        </HTMLCell>
        <HTMLCell>
          <HTMLInput
            float={2}
            name="totalDecrease.beforeTax"
            value={get(totalDecrease, 'beforeTax', '0')}
            onChange={onChangeInput}
            disabled={authCalculated}
          />
        </HTMLCell>
        <HTMLCell>
          <HTMLInput
            float={2}
            name="totalDecrease.amountOfTax"
            value={get(totalDecrease, 'amountOfTax', '0')}
            onChange={onChangeInput}
            disabled={authCalculated}
          />
        </HTMLCell>
        <HTMLCell>
          <HTMLInput
            float={2}
            name="totalDecrease.afterTax"
            value={get(totalDecrease, 'afterTax', '0')}
            onChange={onChangeInput}
            disabled={authCalculated}
          />
        </HTMLCell>
      </HTMLRow>
    </HTMLFooter>
  );
};
