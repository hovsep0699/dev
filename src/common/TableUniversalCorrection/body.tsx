import React, { useContext } from 'react';
import set from 'lodash.set';
import get from 'lodash.get';

import { HTMLBody } from './styles/body';
import { BodyRow } from './body.row';
import { TableContext } from './context';
import { getAutoGoods, getAutoTotal } from './utils';

export const TableBody = () => {
  const { values, errors, setValues, defaultValue, authCalculated } = useContext<any>(TableContext);

  const onChange = (index: number, name: string, value: unknown) => {
    const good = values.goods[index];
    set(good, name, value);

    if (authCalculated && (name === 'taxRate.before' || name === 'taxRate.after')) {
      const goods = getAutoGoods(values.goods);
      const total = getAutoTotal(goods, { ...defaultValue });
      setValues({ goods, ...total });
    } else {
      setValues({ ...values });
    }
  };

  const onBlur = () => {
    if (authCalculated) {
      const goods = getAutoGoods(values.goods);
      const total = getAutoTotal(goods, { ...defaultValue });
      setValues({ goods, ...total });
    }
  };

  const onRemove = (index: number) => {
    const valGoods = values.goods;
    if (!valGoods[index]) {
      throw new Error(`Значение с индексом ${index} не найдено.`);
    }

    delete valGoods[index];

    const goods = getAutoGoods(values.goods);
    const total = getAutoTotal(goods, { ...defaultValue });
    setValues({ goods, ...total });
  };

  const renderRow = () => {
    const renders: React.ReactNode[] = [];
    values &&
      values.goods &&
      values.goods.forEach((good: any, i: number) => {
        const error = get(errors, ['table', 'goods', i]);

        renders.push(
          <BodyRow
            key={i}
            index={i}
            data={good}
            error={error}
            onBlur={onBlur}
            onChange={onChange}
            onRemove={onRemove}
          />
        );
      });
    return renders;
  };

  return (
    <>
      <HTMLBody>{renderRow()}</HTMLBody>
    </>
  );
};
