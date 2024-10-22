import get from 'lodash.get';
import React, { FC, memo, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import Modal from '@distate/components/dist/Modal';
import { IconCheck } from '@distate/components/dist/icons';
import { FormSchema } from '@distate/components/dist/FormSchema';
import { CheckBox } from '@distate/components/dist/CheckBox';

import { TableBody } from './body';
import { TableFooter } from './footer';
import { TableHeader } from './header';
import { TableContext } from './context';
import { HTMLTable } from './styles/table';
import { Numbers } from './components/numbers';
import { Tracking } from './components/tracking';
import {
  schema as schemaInformation,
  uiSchema as uiSchemaInformation
} from './schemas/information';
import { HTMLTitle } from './styles/body';
import { HTMLButtonAppend } from './styles/footer';

const theme = {
  bg: '#f3f3f3',
  text: '#212122',
  border: '#d7d7d7'
};

export const defaultGood = {
  count: { before: '0', after: '0' },
  price: { before: '0.00', after: '0.00' },
  excise: { before: 'без акциза', after: 'без акциза' },
  amountOfTax: { before: '0.00', after: '0.00' },
  costAfterTax: { before: '0.00', after: '0.00' },
  costBeforeTax: { before: '0.00', after: '0.00' },
  measurement: { before: '', after: '' },
  taxRate: {},
  rowType: 'edit',
  title: '',
  row: ''
};

export const defaultData = {
  goods: [{ ...defaultGood }],
  total: {}
};

export enum ModalType {
  information = 'information',
  tracking = 'trackings',
  numbers = 'numbers',
  empty = 'empty',
  stamp = 'stamp',
  close = 'close'
}

export const defaultModal = { type: ModalType.close, index: 0 };

export type StateModal = { type: ModalType; index: number };

export interface TableUniversalCorrectionProps {
  values?: any;
  defaultValue?: Record<string, unknown>;
  errors?: any;
  onChange?: (values: any) => void;
}

export const TableUniversalCorrection: FC<TableUniversalCorrectionProps> = memo(
  ({ values = defaultData, defaultValue, errors = {}, onChange }) => {
    const [authCalculated, setAutoCalculated] = useState(true);
    const [stateModal, setStateModal] = useState<StateModal>(defaultModal);
    const [removedGoods, setRemovedGoods] = useState<any[]>([]);

    // const errorTable = useMemo(() => {
    //   // получаем ошибки относящиеся только
    //   // к таблице
    //   const tables = errors.filter((error: Error) => {
    //     const pathNameFirst = error.paths.shift();
    //     return pathNameFirst === 'table';
    //   });

    //   return tables;
    // }, [errors]);

    const onCloseModal = () => setStateModal(state => ({ ...state, type: ModalType.close }));
    const onChangeAutoCalculated = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAutoCalculated(e.target.checked);
    };

    const tableOnChange = (data: any) => {
      onChange?.(data);
    };

    const tableOnChangeInformation = (information: Record<string, unknown>) => {
      const { index } = stateModal;
      const newValues = { ...values };
      newValues.goods[index].information = information;
      onChange?.(newValues);
      onCloseModal();
    };

    const tableOnChangeTracking = (tracking: Record<string, unknown>[]) => {
      const { index } = stateModal;
      const newValues = { ...values };
      newValues.goods[index].trackings = tracking;
      onChange?.(newValues);
      onCloseModal();
    };

    const tableOnChangeNumbers = (numbers: Record<string, unknown>[]) => {
      const { index } = stateModal;
      const newValues = { ...values };
      newValues.goods[index].identificationNumbers = numbers;
      onChange?.(newValues);
      onCloseModal();
    };

    const renderContentModal = () => {
      if (stateModal.type === ModalType.information) {
        const data = get(values, `goods[${stateModal.index}].information`, {});
        return (
          <FormSchema
            isCenterFooter
            formData={data}
            schema={schemaInformation}
            uiSchema={uiSchemaInformation}
            onSubmit={tableOnChangeInformation}
            children={
              <HTMLButtonAppend icon={<IconCheck />} onClick={onCloseModal}>
                Закрыть
              </HTMLButtonAppend>
            }
          />
        );
      }

      if (stateModal.type === ModalType.tracking) {
        const data = get(values, `goods[${stateModal.index}].trackings`, []);
        return <Tracking data={data} onSubmit={tableOnChangeTracking} />;
      }

      if (stateModal.type === ModalType.numbers) {
        const data = get(values, `goods[${stateModal.index}].identificationNumbers`, []);
        return <Numbers rows={data} onSubmit={tableOnChangeNumbers} />;
      }

      if (stateModal.type === ModalType.empty) {
        return <HTMLTitle>Товар не подлежит маркировке или прослеживаемости</HTMLTitle>;
      }

      return null;
    };

    return (
      <ThemeProvider theme={theme}>
        <TableContext.Provider
          value={{
            errors,
            values,
            defaultValue,
            authCalculated,
            removedGoods,
            setRemovedGoods,
            setStateModal,
            setValues: tableOnChange
          }}
        >
          <CheckBox
            label="Автоматический подсчет таблицы"
            onChange={onChangeAutoCalculated}
            checked={authCalculated}
          />
          <HTMLTable>
            <colgroup>
              <col width="150" />
              <col width="150" />
              <col width="150" />
              <col width="80" />
              <col width="80" />
              <col width="80" />
              <col width="80" />
              <col width="80" />
              <col width="80" />
              <col width="80" />
              <col width="30" />
              <col width="30" />
              <col width="30" />
            </colgroup>
            <TableHeader />
            <TableBody />
            <TableFooter />
          </HTMLTable>
          <Modal isVisible={stateModal.type !== ModalType.close} hide={onCloseModal}>
            {renderContentModal()}
          </Modal>
        </TableContext.Provider>
      </ThemeProvider>
    );
  }
);
