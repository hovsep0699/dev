import React, { FC, useState } from 'react';
import { IconPlus, IconCheck } from '@distate/components/dist/icons';
import set from 'lodash.set';

import { HTMLContainer, HTMLBody, HTMLTitle, HTMLText } from '../../styles/body';
import { HTMLHeader, HTMLCell as HTMLHeaderCell } from '../../styles/header';
import { HTMLFooter, HTMLButtonAppend } from '../../styles/footer';
import { HTMLTable, HTMLRow, HTMLCell } from '../../styles/table';
import { HTMLButtonTrue, HTMLInput } from '../../styles/form';
import { isAutoSumma, autoCalculator, normalizeRows } from './utils';
import { TrackingRow } from './tracking.row';

export type TrackingData = {
  number?: string;
  measurementCode?: string;
  measurementTitle?: string;
  additionalIndicator?: string;
  measurementValueChange?: {
    increase: number | string;
    decrease: number | string;
    before?: number | string;
    after?: number | string;
  };
};

export interface TrackingProps {
  data: TrackingData[];
  onSubmit?: (data: TrackingData[]) => void;
}

export const Tracking: FC<TrackingProps> = ({ onSubmit, data = [] }) => {
  const [formData, setFormData] = useState(autoCalculator(data));

  const handleOnSubmit = () => {
    const rows = normalizeRows(formData.rows);
    onSubmit?.(rows);
  };

  const inputOnChange = (index: number, name: string, value: unknown) => {
    set(formData.rows[index], name, value);
    setFormData({ ...formData });
  };

  const inputOnBluer = (name: string) => {
    if (isAutoSumma(name)) {
      const newFormData = autoCalculator(formData.rows);
      setFormData(newFormData);
    }
  };

  const onAppend = () => {
    const newFormData = { ...formData };
    newFormData.rows.push({});
    setFormData(newFormData);
  };

  const onRemove = (index: number) => {
    let newFormData = { ...formData };
    delete newFormData.rows[index];

    newFormData.rows = newFormData.rows.filter(Boolean);
    setFormData(newFormData);
  };

  const { rows, total } = formData;
  return (
    <HTMLContainer>
      <HTMLTitle>Сведения о товаре, подлежащем прослеживаемости</HTMLTitle>
      <HTMLTable>
        <colgroup>
          <col width="10" />
          <col width="15" />
          <col width="15" />
          <col width="35" />
          <col width="10" />
          <col width="10" />
        </colgroup>
        <HTMLHeader>
          <HTMLRow>
            <HTMLHeaderCell colSpan={2}>
              <HTMLText>Регистрационный номер партии товаров</HTMLText>
            </HTMLHeaderCell>
            <HTMLHeaderCell>
              <HTMLText>Единица измерения</HTMLText>
            </HTMLHeaderCell>
            <HTMLHeaderCell>
              <HTMLText>Дополнительная информация</HTMLText>
            </HTMLHeaderCell>
            <HTMLHeaderCell>
              <HTMLText>Кол-во</HTMLText>
            </HTMLHeaderCell>
            <HTMLHeaderCell></HTMLHeaderCell>
          </HTMLRow>
        </HTMLHeader>
        <HTMLBody>
          {rows.map((row, i) => (
            <TrackingRow
              key={`${i}-${row.additionalIndicator}`}
              index={i}
              row={row}
              onChange={inputOnChange}
              onRemove={onRemove}
              onBlur={inputOnBluer}
            />
          ))}
        </HTMLBody>
        <HTMLFooter>
          <HTMLRow>
            <HTMLCell colSpan={3} rowSpan={2} plain>
              <HTMLButtonAppend icon={<IconPlus />} onClick={onAppend}>
                Добавить запись
              </HTMLButtonAppend>
            </HTMLCell>
            <HTMLCell colSpan={1}>
              <HTMLText>Всего увеличение</HTMLText>
            </HTMLCell>
            <HTMLCell>
              <HTMLInput float={2} value={total.increase} disabled />
            </HTMLCell>
            <HTMLCell rowSpan={2} plain></HTMLCell>
          </HTMLRow>
          <HTMLRow>
            <HTMLCell colSpan={1}>
              <HTMLText>Всего уменьшение</HTMLText>
            </HTMLCell>
            <HTMLCell>
              <HTMLInput float={2} value={total.decrease} disabled />
            </HTMLCell>
          </HTMLRow>
        </HTMLFooter>
      </HTMLTable>
      <HTMLButtonTrue onClick={handleOnSubmit}>
        <IconCheck style={{ fill: 'currentcolor' }} />
        Сохранить
      </HTMLButtonTrue>
    </HTMLContainer>
  );
};
