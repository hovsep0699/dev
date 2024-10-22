import React, { FC, useContext, useCallback } from 'react';
import { IconInfoAlt, IconStamp, IconDelete } from '@distate/components/dist/icons';
import Gateway from '@distate/core/dist/application/autocomplete/AutocompleteGateway';
import { FormSchema } from '@distate/components/dist/FormSchema';
import get from 'lodash.get';

import { HTMLText } from './styles/body';
import { HTMLCell, HTMLRow } from './styles/table';
import { HTMLButton, HTMLInput, HTMLAutocomplete } from './styles/form';
import { ModalType } from './table-universal-correction';
import { TableContext } from './context';

const gateway = new Gateway();

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

const dataToSelect = (data: any[]) => {
  return data.reduce((prev, { code, title }) => {
    prev.push({ value: code, label: title });
    return prev;
  }, []);
};

const getBeforeValue = (value: any, def?: any) => get(value, 'before', def);
const getAfterValue = (value: any, def?: any) => get(value, 'after', def);

type ChangeInput = React.ChangeEvent<HTMLInputElement>;

export interface BodyRowProps {
  index: number;
  data?: Record<string, any>;
  error?: Record<string, any>;
  onRemove: (index: number) => void;
  onChange: (index: number, name: string, value: unknown) => void;
  onBlur: (index: number, name: string, value: unknown) => void;
}

export const BodyRow: FC<BodyRowProps> = ({
  index,
  data = {},
  error,
  onRemove,
  onChange,
  onBlur
}) => {
  const { setStateModal, authCalculated } = useContext(TableContext);
  const { rowType, infoFields } = data;

  const isBeforeDisabled = Boolean(rowType !== 'edit');
  const isDisabled = authCalculated && Boolean(rowType !== 'edit');

  // fetch
  // ------------------
  const measurementLoad = async (raw: string, callback: any) => {
    const { rows = [] } = await gateway.getMeasurementByTitle(raw);
    callback(dataToSelect(rows));
  };
  // the end: fetch

  // on change
  // ------------------
  const inputOnBlur = useCallback(
    ({ target }: ChangeInput) => onBlur(index, target.name, target.value),
    [index, onBlur]
  );

  const inputOnChange = useCallback(
    ({ target }: ChangeInput) => onChange(index, target.name, target.value),
    [index, onChange]
  );

  const selectOnChange = useCallback((value: any, name: any) => onChange(index, name, value), [
    index,
    onChange
  ]);

  const selectOnChangeTaxRate = useCallback(({ value }, name) => onChange(index, name, value), [
    index,
    onChange
  ]);

  const schemaOnChange = ({ infoFields }: any) => {
    onChange(index, 'infoFields', infoFields);
  };

  const isError = (path: string) => Boolean(get(error, path, []).length);

  // the end: on change

  const handleOnRemove = () => onRemove(index);
  const handleOnOpenStamp = () => {
    if (Array.isArray(data.trackings) && data.trackings.length) {
      setStateModal({ type: ModalType.tracking, index });
    } else if (Array.isArray(data.identificationNumbers)) {
      setStateModal({ type: ModalType.numbers, index });
    } else {
      setStateModal({ type: ModalType.empty, index });
    }
  };
  const handleOnOpenInfo = () => setStateModal({ type: ModalType.information, index });

  let beforeTaxRateValue = optionsTax.find(opt => getBeforeValue(data.taxRate) === opt.value);
  let afterTaxRateValue = optionsTax.find(opt => getAfterValue(data.taxRate) === opt.value);

  if (!beforeTaxRateValue) {
    beforeTaxRateValue = optionsTax[0];
  }

  if (!afterTaxRateValue) {
    afterTaxRateValue = optionsTax[0];
  }

  return (
    <>
      <HTMLRow>
        <HTMLCell>
          <HTMLInput name="title" value={data.title} onChange={inputOnChange} />
        </HTMLCell>
        <HTMLCell>
          <HTMLText>до изменения</HTMLText>
        </HTMLCell>
        <HTMLCell error={isError('measurement.before.errors')}>
          <HTMLAutocomplete
            simple
            name="measurement.before"
            value={data?.measurement.before}
            disabled={isBeforeDisabled}
            onChange={selectOnChange}
            loadOptions={measurementLoad}
          />
        </HTMLCell>
        <HTMLCell error={isError('count.before.errors')}>
          <HTMLInput
            type="number"
            name="count.before"
            disabled={isBeforeDisabled}
            value={getBeforeValue(data.count, 0)}
            onChange={inputOnChange}
            onBlur={inputOnBlur}
          />
        </HTMLCell>
        <HTMLCell error={isError('price.before.errors')}>
          <HTMLInput
            float={2}
            name="price.before"
            disabled={isBeforeDisabled}
            value={getBeforeValue(data.price)}
            onChange={inputOnChange}
            onBlur={inputOnBlur}
          />
        </HTMLCell>
        <HTMLCell error={isError('costBeforeTax.before.errors')}>
          <HTMLInput
            float={2}
            name="costBeforeTax.before"
            value={getBeforeValue(data.costBeforeTax)}
            onChange={inputOnChange}
            onBlur={inputOnBlur}
            disabled={isBeforeDisabled || authCalculated}
          />
        </HTMLCell>
        <HTMLCell error={isError('excise.before.errors')}>
          <HTMLInput
            float={2}
            placeHolder="без акциза"
            name="excise.before"
            value={getBeforeValue(data.excise)}
            onChange={inputOnChange}
            onBlur={inputOnBlur}
            disabled={isBeforeDisabled}
          />
        </HTMLCell>
        <HTMLCell error={isError('taxRate.before.errors')}>
          <HTMLAutocomplete
            simple
            name="taxRate.before"
            value={beforeTaxRateValue}
            onChange={selectOnChangeTaxRate}
            defaultOptions={optionsTax}
            disabled={isBeforeDisabled}
          />
        </HTMLCell>
        <HTMLCell error={isError('amountOfTax.before.errors')}>
          <HTMLInput
            float={2}
            value={getBeforeValue(data.amountOfTax)}
            disabled={isBeforeDisabled || authCalculated}
          />
        </HTMLCell>
        <HTMLCell error={isError('costAfterTax.before.errors')}>
          <HTMLInput
            float={2}
            value={getBeforeValue(data.costAfterTax)}
            disabled={isBeforeDisabled || authCalculated}
          />
        </HTMLCell>
        <HTMLCell>
          <HTMLButton solid onClick={handleOnOpenInfo} icon={<IconInfoAlt />} />
        </HTMLCell>
        <HTMLCell>
          <HTMLButton solid onClick={handleOnOpenStamp} icon={<IconStamp />} />
        </HTMLCell>
        <HTMLCell>
          <HTMLButton solid onClick={handleOnRemove} icon={<IconDelete />} />
        </HTMLCell>
      </HTMLRow>

      <HTMLRow>
        <HTMLCell rowSpan={3} plain></HTMLCell>
        <HTMLCell>
          <HTMLText>после изменения</HTMLText>
        </HTMLCell>
        <HTMLCell error={isError('measurement.after.errors')}>
          <HTMLAutocomplete
            simple
            name="measurement.after"
            onChange={selectOnChange}
            value={data?.measurement.after}
            loadOptions={measurementLoad}
          />
        </HTMLCell>
        <HTMLCell error={isError('count.after.errors')}>
          <HTMLInput
            name="count.after"
            type="number"
            value={getAfterValue(data.count, 0)}
            onChange={inputOnChange}
            onBlur={inputOnBlur}
          />
        </HTMLCell>
        <HTMLCell error={isError('price.after.errors')}>
          <HTMLInput
            float={2}
            name="price.after"
            value={getAfterValue(data.price)}
            onChange={inputOnChange}
            onBlur={inputOnBlur}
          />
        </HTMLCell>
        <HTMLCell error={isError('costBeforeTax.after.errors')}>
          <HTMLInput
            float={2}
            name="costBeforeTax.after"
            value={getAfterValue(data.costBeforeTax)}
            onChange={inputOnChange}
            onBlur={inputOnBlur}
            disabled={isDisabled || authCalculated}
          />
        </HTMLCell>
        <HTMLCell error={isError('excise.after.errors')}>
          <HTMLInput
            float={2}
            placeHolder="без акциза"
            name="excise.after"
            value={getAfterValue(data.excise)}
            onChange={inputOnChange}
            onBlur={inputOnBlur}
          />
        </HTMLCell>
        <HTMLCell error={isError('taxRate.after.errors')}>
          <HTMLAutocomplete
            simple
            name="taxRate.after"
            value={afterTaxRateValue}
            onChange={selectOnChangeTaxRate}
            defaultOptions={optionsTax}
          />
        </HTMLCell>
        <HTMLCell error={isError('amountOfTax.after.errors')}>
          <HTMLInput
            float={2}
            name="amountOfTax.after"
            value={getAfterValue(data.amountOfTax)}
            onChange={inputOnChange}
            onBlur={inputOnBlur}
            disabled={authCalculated}
          />
        </HTMLCell>
        <HTMLCell error={isError('costAfterTax.after.errors')}>
          <HTMLInput
            float={2}
            name="costAfterTax.after"
            value={getAfterValue(data.costAfterTax)}
            onChange={inputOnChange}
            onBlur={inputOnBlur}
            disabled={authCalculated}
          />
        </HTMLCell>
        <HTMLCell rowSpan={3} colSpan={3} plain></HTMLCell>
      </HTMLRow>

      <HTMLRow>
        <HTMLCell>
          <HTMLText>увеличение</HTMLText>
        </HTMLCell>
        <HTMLCell rowSpan={2} colSpan={3} plain></HTMLCell>
        <HTMLCell>
          <HTMLInput
            float={2}
            name="costBeforeTax.increase"
            value={get(data, 'costBeforeTax.increase')}
            onChange={inputOnChange}
            onBlur={inputOnBlur}
            disabled={authCalculated}
          />
        </HTMLCell>
        <HTMLCell>
          <HTMLInput
            float={2}
            name="excise.increase"
            value={get(data, 'excise.increase')}
            onChange={inputOnChange}
            disabled={authCalculated}
          />
        </HTMLCell>
        <HTMLCell rowSpan={2} plain></HTMLCell>
        <HTMLCell>
          <HTMLInput
            float={2}
            name="amountOfTax.increase"
            value={get(data, 'amountOfTax.increase')}
            onChange={inputOnChange}
            disabled={authCalculated}
          />
        </HTMLCell>
        <HTMLCell>
          <HTMLInput
            float={2}
            name="costAfterTax.increase"
            value={get(data, 'costAfterTax.increase')}
            onChange={inputOnChange}
            disabled={authCalculated}
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
            name="costBeforeTax.decrease"
            value={get(data, 'costBeforeTax.decrease')}
            onChange={inputOnChange}
            disabled={authCalculated}
          />
        </HTMLCell>
        <HTMLCell>
          <HTMLInput
            float={2}
            name="excise.decrease"
            value={get(data, 'excise.decrease')}
            onChange={inputOnChange}
            disabled={authCalculated}
          />
        </HTMLCell>
        <HTMLCell>
          <HTMLInput
            float={2}
            name="amountOfTax.decrease"
            value={get(data, 'amountOfTax.decrease')}
            onChange={inputOnChange}
            disabled={authCalculated}
          />
        </HTMLCell>
        <HTMLCell>
          <HTMLInput
            float={2}
            name="costAfterTax.decrease"
            value={get(data, 'costAfterTax.decrease')}
            onChange={inputOnChange}
            disabled={authCalculated}
          />
        </HTMLCell>
      </HTMLRow>

      <HTMLRow>
        <HTMLCell colSpan={13}>
          <HTMLText>
            <FormSchema
              formData={{ infoFields }}
              onChange={schemaOnChange}
              children={null}
              schema={{
                type: 'object',
                properties: {
                  infoFields: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        attribute: { type: 'string' },
                        value: { type: 'string' }
                      }
                    }
                  }
                }
              }}
              uiSchema={{
                'ui:label': {
                  infoFields: 'Доп. сведения'
                }
              }}
            />
          </HTMLText>
        </HTMLCell>
      </HTMLRow>
    </>
  );
};
