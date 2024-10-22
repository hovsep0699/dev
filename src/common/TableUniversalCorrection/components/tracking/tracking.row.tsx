import React, { FC } from 'react';
import { IconDelete } from '@distate/components/dist/icons';
import Gateway from '@distate/core/dist/application/autocomplete/AutocompleteGateway';

import { TrackingData } from './tracking';
import { HTMLText } from '../../styles/body';
import { HTMLCell, HTMLRow } from '../../styles/table';
import { HTMLButton, HTMLInput, HTMLAutocomplete } from '../../styles/form';
import { dataToSelect } from './utils';

const gateway = new Gateway();

export interface TrackingRowProps {
  index: number;
  row: TrackingData;
  onBlur: (name: string) => void;
  onRemove: (index: number) => void;
  onChange: (index: number, name: string, value: unknown) => void;
}

export const TrackingRow: FC<TrackingRowProps> = ({ index, row, onBlur, onRemove, onChange }) => {
  const disabled = Boolean(row.measurementValueChange);

  // fetch
  // ------------------
  const measurementLoad = async (raw: string, callback: any) => {
    const { rows = [] } = await gateway.getMeasurementByTitle(raw);
    callback(dataToSelect(rows));
  };
  // the end: fetch

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(index, name, value);
  };

  const selectOnChange = ({ value, label }: Record<string, string>) => {
    onChange(index, 'measurementCode', value);
    onChange(index, 'measurementTitle', label);
  };

  const inputOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur(e.target.name);
  };

  const handleOnRemove = () => onRemove(index);

  const renderMeasurement = (name?: string) => {
    if (!disabled) {
      const defaultOption = { label: row?.measurementTitle, value: row?.measurementCode };
      return (
        <HTMLAutocomplete
          simple
          name={'measurementCode'}
          value={defaultOption}
          onChange={selectOnChange}
          loadOptions={measurementLoad}
        />
      );
    }

    return (
      <HTMLInput
        name="measurementTitle"
        value={row?.measurementTitle}
        disabled={disabled}
        onChange={inputOnChange}
        onBlur={inputOnBlur}
      />
    );
  };

  return (
    <>
      <HTMLRow>
        <HTMLCell rowSpan={4} plain>
          <HTMLInput
            name="additionalIndicator"
            value={row?.additionalIndicator}
            disabled={disabled}
            onChange={inputOnChange}
            onBlur={inputOnBlur}
          />
        </HTMLCell>
        <HTMLCell>
          <HTMLText>до изменения</HTMLText>
        </HTMLCell>
        <HTMLCell>{renderMeasurement()}</HTMLCell>
        <HTMLCell>
          <HTMLInput
            name="number"
            value={row?.number}
            disabled={disabled}
            onChange={inputOnChange}
            onBlur={inputOnBlur}
          />
        </HTMLCell>
        <HTMLCell>
          <HTMLInput
            float={2}
            name="measurementValueChange.before"
            value={row?.measurementValueChange?.before}
            disabled={disabled}
            onChange={inputOnChange}
            onBlur={inputOnBlur}
          />
        </HTMLCell>
        <HTMLCell>
          <HTMLButton solid onClick={handleOnRemove} icon={<IconDelete />} />
        </HTMLCell>
      </HTMLRow>

      <HTMLRow>
        <HTMLCell>
          <HTMLText>после изменения</HTMLText>
        </HTMLCell>
        <HTMLCell colSpan={2} rowSpan={3} plain></HTMLCell>
        <HTMLCell>
          <HTMLInput
            float={2}
            name="measurementValueChange.after"
            value={row?.measurementValueChange?.after}
            onChange={inputOnChange}
            onBlur={inputOnBlur}
          />
        </HTMLCell>
        <HTMLCell rowSpan={3} plain></HTMLCell>
      </HTMLRow>

      <HTMLRow>
        <HTMLCell>
          <HTMLText>увеличение</HTMLText>
        </HTMLCell>
        <HTMLCell>
          <HTMLInput
            float={2}
            name="measurementValueChange.increase"
            value={row?.measurementValueChange?.increase}
            onChange={inputOnChange}
            onBlur={inputOnBlur}
            disabled
          />
        </HTMLCell>
      </HTMLRow>

      <HTMLRow>
        <HTMLCell>
          <HTMLText>уменьшение</HTMLText>
        </HTMLCell>
        <HTMLCell>
          <HTMLInput
            float={2}
            name="measurementValueChange.decrease"
            value={row?.measurementValueChange?.decrease}
            onChange={inputOnChange}
            onBlur={inputOnBlur}
            disabled
          />
        </HTMLCell>
      </HTMLRow>
    </>
  );
};
