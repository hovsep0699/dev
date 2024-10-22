import React, { useContext } from 'react';
import set from 'lodash.set';
import get from 'lodash.get';

import { HTMLBody } from './styles/body';
import { ModalType } from './types';
import { BodyRow } from './body.row';
import { TableContext } from './context';
import { defaultGood } from './table-universal-invoice';
import { getAutoSumma, isChangeSumma } from './utils';

export const TableBody = () => {
  const { values, setValues, setStateModal, rowsErrors } = useContext(TableContext);
  const { goods } = values;

  const onBlur = () => {
    setValues(getAutoSumma(goods));
  };

  const onChange = (index: number, name: string, value: unknown) => {
    if (!goods.hasOwnProperty(index)) {
      throw new Error(`Значение с индексом "${index}" не найдено`);
    }

    set(values, `goods[${index}].${name}`, value);

    if (isChangeSumma(name)) {
      setValues(getAutoSumma(values.goods));
    } else {
      setValues({ ...values });
    }
  };

  const onOpenModal = (state: ModalType, index: number) => setStateModal({ type: state, index });

  /**
   * Копируем строку в таблицу
   *
   * @param index {number}
   */
  const handleOnCopy = (index: number) => {
    if (!goods.hasOwnProperty(index)) {
      throw new Error(`Значение с индексом "${index}" не найдено`);
    }

    let data = { ...values };
    data.goods.push({ ...values.goods[index] });

    setValues(data);
  };

  /**
   * Удаляем строку таблицы по индексу
   *
   * @param index {number}
   */
  const handleOnRemove = (index: number) => {
    if (!goods.hasOwnProperty(index)) {
      throw new Error(`Значение с индексом "${index}" не найдено`);
    }

    let data = { ...values };
    delete data.goods[index];

    data.goods = data.goods.filter(Boolean);
    if (!data.goods.length) {
      data.goods = [{ ...defaultGood }];
    }

    setValues(data);
  };

  return (
    <>
      <HTMLBody>
        {Array.isArray(goods) &&
          goods.map((data, i) => (
            <BodyRow
              key={i}
              index={i}
              data={data}
              error={get(rowsErrors, i)}
              onCopy={handleOnCopy}
              onBlur={onBlur}
              onChange={onChange}
              onRemove={handleOnRemove}
              onOpenModal={onOpenModal}
            />
          ))}
      </HTMLBody>
    </>
  );
};
