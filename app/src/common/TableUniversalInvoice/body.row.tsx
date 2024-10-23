import React, { useMemo } from 'react';
import Gateway from '@distate/core/dist/application/autocomplete/AutocompleteGateway';
import {
  IconPencilAlt,
  IconInfoAlt,
  IconStamp,
  IconFiles,
  IconDelete
} from '@distate/components/dist/icons';

import { HTMLInput, HTMLAutocomplete, HTMLButton } from './styles/form';
import { HTMLCell, HTMLRow, HTMLCellBg } from './styles/table';
import { HTMLText } from './styles/body';
import { ModalType } from './types';

const gateway = new Gateway();

const dataToSelect = (data: any[]) => {
  return data.reduce((prev, { id, title }) => {
    prev.push({ value: id, label: title });
    return prev;
  }, []);
};

const optionsTax = [
  { value: '-1', label: 'Без НДС' },
  { value: '0', label: '0%' },
  { value: '10', label: '10%' },
  { value: '18', label: '18%' },
  { value: '20', label: '20%' },
  { value: '110', label: '10/110' },
  { value: '118', label: '18/118' },
  { value: '120', label: '20/120' }
];

export interface BodyRowProps {
  index: number;
  data?: Record<string, any>;
  error?: Record<string, any>;
  onBlur: (index: number) => void;
  onCopy: (index: number) => void;
  onChange: (index: number, name: string, value: unknown) => void;
  onRemove: (index: number) => void;
  onOpenModal: (state: ModalType, index: number) => void;
}

export const BodyRow: React.FC<BodyRowProps> = ({
  index,
  onBlur,
  onCopy,
  onRemove,
  onChange,
  onOpenModal,
  data = {},
  error = {}
}) => {
  const {
    title,
    count,
    price,
    excise,
    taxRate,
    amountOfTax,
    costAfterTax,
    costBeforeTax,
    measurementCode,
    measurementTitle
  } = data;

  const taxRateValue = useMemo(() => optionsTax.find(opt => opt.value === taxRate), [taxRate]);
  const measurementValue = useMemo(
    () => ({
      label: measurementTitle,
      value: measurementCode
    }),
    [measurementCode, measurementTitle]
  );

  // fetch
  const measurementLoad = async (raw: string, callback: any) => {
    const { rows = [] } = await gateway.getMeasurementByTitle(raw);
    const options = dataToSelect(rows);
    callback(options);
  };
  // TheEnd fetch

  const selectOnChange = ({ value }: any, name: string) => onChange(index, name, value);
  const selectOnChangeMeasurement = ({ value, label }: any) => {
    onChange(index, 'measurementCode', value);
    onChange(index, 'measurementTitle', label);
  };

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(index, name, value);
  };

  const handleOnOpenPencel = () => onOpenModal(ModalType.information, index);
  const handleOnOpenStamp = () => onOpenModal(ModalType.stamp, index);
  const handleOnOpenInfo = () => onOpenModal(ModalType.infofields, index);
  const handleOnRemove = () => onRemove(index);
  const handleOnCopy = () => onCopy(index);
  const handleOnBlur = () => onBlur(index);

  return (
    <HTMLRow>
      <HTMLCell align="center">
        <HTMLText>{index + 1}</HTMLText>
      </HTMLCell>
      <HTMLCell>
        <HTMLInput
          name="title"
          value={title}
          error={Boolean(error?.title)}
          onChange={inputOnChange}
        />
      </HTMLCell>
      <HTMLCell>
        <HTMLAutocomplete
          simple
          name="measurementCode"
          value={measurementValue}
          error={Boolean(error.measurementCode)}
          onChange={selectOnChangeMeasurement}
          loadOptions={measurementLoad}
        />
      </HTMLCell>
      <HTMLCell>
        <HTMLInput
          type="number"
          name="count"
          value={count}
          error={Boolean(error.count)}
          onChange={inputOnChange}
          onBlur={handleOnBlur}
        />
      </HTMLCell>
      <HTMLCell>
        <HTMLInput
          type="number"
          name="price"
          value={price}
          error={Boolean(error.price)}
          onChange={inputOnChange}
          onBlur={handleOnBlur}
        />
      </HTMLCell>
      <HTMLCell>
        <HTMLInput
          name="costBeforeTax"
          value={costBeforeTax}
          error={Boolean(error.costBeforeTax)}
          onBlur={handleOnBlur}
          onChange={inputOnChange}
        />
      </HTMLCell>
      <HTMLCell>
        <HTMLInput
          name="excise"
          value={excise}
          error={Boolean(error.excise)}
          onChange={inputOnChange}
          onBlur={handleOnBlur}
        />
      </HTMLCell>
      <HTMLCell>
        <HTMLAutocomplete
          simple
          name="taxRate"
          value={taxRateValue}
          error={Boolean(error?.taxRate)}
          onChange={selectOnChange}
          defaultOptions={optionsTax}
        />
      </HTMLCell>
      <HTMLCell>
        <HTMLInput
          name="amountOfTax"
          value={amountOfTax}
          error={Boolean(error?.amountOfTax)}
          onChange={inputOnChange}
          onBlur={handleOnBlur}
        />
      </HTMLCell>
      <HTMLCell>
        <HTMLInput
          name="costAfterTax"
          value={costAfterTax}
          error={Boolean(error?.costAfterTax)}
          onChange={inputOnChange}
          onBlur={handleOnBlur}
        />
      </HTMLCell>
      <HTMLCellBg>
        <HTMLButton solid onClick={handleOnOpenPencel} icon={<IconPencilAlt />} />
      </HTMLCellBg>
      <HTMLCellBg>
        <HTMLButton solid onClick={handleOnOpenInfo} icon={<IconInfoAlt />} />
      </HTMLCellBg>
      <HTMLCellBg>
        <HTMLButton solid onClick={handleOnOpenStamp} icon={<IconStamp />} />
      </HTMLCellBg>
      <HTMLCellBg>
        <HTMLButton solid onClick={handleOnCopy} icon={<IconFiles />} />
      </HTMLCellBg>
      <HTMLCellBg>
        <HTMLButton solid onClick={handleOnRemove} icon={<IconDelete />} />
      </HTMLCellBg>
    </HTMLRow>
  );
};
