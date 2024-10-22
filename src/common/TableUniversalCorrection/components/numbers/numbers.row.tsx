import React, { FC, ChangeEvent } from 'react';
import { IconDelete } from '@distate/components/dist/icons';
import get from 'lodash.get';

import { NumberData } from './numbers';
import { HTMLText } from '../../styles/body';
import { HTMLRow, HTMLCell } from '../../styles/table';
import { HTMLButton, HTMLSelect, HTMLInput, HTMLTextArea } from '../../styles/form';

const SELECT_VALUES = [
  { label: 'Контрольный идентификационный знак', value: 1 },
  {
    label:
      'Уникальный идентификатор вторичной (потребительской)/третичной (заводской, транспортной) упаковки',
    value: 2
  }
];

export interface NumbersRowProsp {
  index: number;
  onChange?: (index: number, name: string, value: unknown) => void;
  onRemove?: (index: number) => void;
  data: NumberData;
}

export const NumbersRow: FC<NumbersRowProsp> = ({ index, data, onChange, onRemove }) => {
  const { type, packageIdentifier, packNumbers, idetificationNumbers } = data;

  const disabled = false;
  const keyName = packNumbers ? 'packNumbers' : 'idetificationNumbers';
  const values = packNumbers || idetificationNumbers;

  const valueBefore: string[] = get(values, 'before', []);
  const valueAfter: string[] = get(values, 'after', []);

  const textValueBefore = valueBefore.join('\n');
  const textValueAfter = valueAfter.join('\n');

  const textOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange?.(index, name, value.split('\n'));
  };

  const selectOnChange = (value: any, { name }: any) => {
    onChange?.(index, name, value);
  };

  const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange?.(index, name, value);
  };

  const handleOnRemove = () => onRemove?.(index);

  return (
    <>
      <HTMLRow>
        <HTMLCell verticalAlign="top">
          <HTMLText>до изменения</HTMLText>
        </HTMLCell>
        <HTMLCell verticalAlign="top">
          <HTMLInput
            name="packageIdentifier.before"
            value={packageIdentifier?.before}
            onChange={inputOnChange}
            disabled={disabled}
          />
        </HTMLCell>
        <HTMLCell verticalAlign="top">
          <HTMLSelect
            name="type.before"
            onChange={selectOnChange}
            options={SELECT_VALUES}
            value={type?.before}
            disabled={disabled}
          />
        </HTMLCell>
        <HTMLCell verticalAlign="top">
          <HTMLTextArea
            name={`${keyName}.before`}
            onChange={textOnChange}
            value={textValueBefore}
            disabled={disabled}
          />
        </HTMLCell>
        <HTMLCell rowSpan={2} plain verticalAlign="top">
          <HTMLButton solid onClick={handleOnRemove} icon={<IconDelete />} />
        </HTMLCell>
      </HTMLRow>

      <HTMLRow>
        <HTMLCell verticalAlign="top">
          <HTMLText>после изменения</HTMLText>
        </HTMLCell>
        <HTMLCell verticalAlign="top">
          <HTMLInput
            name="packageIdentifier.after"
            onChange={inputOnChange}
            value={packageIdentifier?.after}
          />
        </HTMLCell>
        <HTMLCell verticalAlign="top">
          <HTMLSelect
            name="type.after"
            onChange={selectOnChange}
            options={SELECT_VALUES}
            value={type?.after}
          />
        </HTMLCell>
        <HTMLCell verticalAlign="top">
          <HTMLTextArea name={`${keyName}.after`} onChange={textOnChange} value={textValueAfter} />
        </HTMLCell>
      </HTMLRow>
    </>
  );
};
