import React, { FC, useState } from 'react';
import { IconPlus, IconCheck } from '@distate/components/dist/icons';
import set from 'lodash.set';

import { HTMLContainer, HTMLBody, HTMLTitle } from '../../styles/body';
import { HTMLHeader, HTMLCell as HTMLHeaderCell } from '../../styles/header';
import { HTMLFooter, HTMLButtonAppend } from '../../styles/footer';
import { HTMLTable, HTMLRow, HTMLCell } from '../../styles/table';
import { HTMLButtonTrue } from '../../styles/form';
import { NumbersRow } from './numbers.row';

type SelectData = {
  value: string;
  label: string;
};

export type NumberData = {
  packageIdentifier?: { before: string; after: string };
  type?: { before: SelectData; after: SelectData };
  packNumbers?: { before: string[]; after: string[] };
  idetificationNumbers?: { before: string[]; after: string[] };
};

export interface NumbersProps {
  onSubmit: (data: any) => void;
  rows: NumberData[];
}

export const Numbers: FC<NumbersProps> = ({ rows = [], onSubmit }) => {
  const [formData, setFormData] = useState(rows);

  const onChange = (index: number, name: string, value: unknown) => {
    const data = formData[index];
    set(data, name, value);
    setFormData([...formData]);
  };

  const onRemove = (index: number) => {
    delete formData[index];
    const data = formData.filter(Boolean);
    setFormData(data);
  };

  const onAppend = () => {
    const newFormData = [...formData];
    newFormData.push({});
    setFormData(newFormData);
  };

  const handleOnSubmit = () => onSubmit(formData);

  return (
    <HTMLContainer>
      <HTMLTitle>Номер средств идентификации товаров</HTMLTitle>
      <HTMLTable>
        <colgroup>
          <col width="25%" />
          <col width="20%" />
          <col width="25%" />
          <col width="25%" />
          <col width="5%" />
        </colgroup>
        <HTMLHeader>
          <HTMLRow>
            <HTMLHeaderCell colSpan={2}>Уникальный идентификатор</HTMLHeaderCell>
            <HTMLHeaderCell>Тип идентификатора</HTMLHeaderCell>
            <HTMLHeaderCell>Значение</HTMLHeaderCell>
            <HTMLHeaderCell />
          </HTMLRow>
        </HTMLHeader>
        <HTMLBody>
          {formData.map((row, i) => (
            <NumbersRow key={i} index={i} data={row} onChange={onChange} onRemove={onRemove} />
          ))}
        </HTMLBody>
        <HTMLFooter>
          <HTMLRow>
            <HTMLCell colSpan={5} rowSpan={2} plain>
              <HTMLButtonAppend icon={<IconPlus />} onClick={onAppend}>
                Добавить запись
              </HTMLButtonAppend>
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
