import React, { useState, useMemo, memo } from 'react';
import { ThemeProvider } from 'styled-components';
import Modal from '@distate/components/dist/Modal';
import { FormSchema } from '@distate/components/dist/FormSchema';

import { TableBody } from './body';
import { TableHeader } from './header';
import { TableFooter } from './footer';
import { TableContext } from './context';

import { ITableUniversalInvoice, ModalType } from './types';
import { schema as schemaPencel, uiSchema as uiSchemaPencel } from './schemas/information';
import { schema as schemaFields, uiSchema as uiSchemaFields } from './schemas/infoFields';
import { schema as schemaProduct, uiSchema as uiSchemaProduct } from './schemas/product';
import { HTMLTable } from './styles/table';
import get from 'lodash.get';

const theme = {
  bg: '#f3f3f3',
  text: '#212122',
  border: '#d7d7d7'
};

export const defaultGood: any = {
  title: '',
  measurementCode: null,
  count: null,
  price: null,
  costBeforeTax: null,
  taxRate: '-1',
  costAfterTax: null,
  excise: null,
  amountOfTax: null,
  infoFields: [],
  declaration: {
    countryCode: null,
    number: null
  },
  information: {
    kind: null,
    additionalMark: null,
    measurementTitle: null,
    countryShortTitle: null,
    orderedCount: null,
    description: null,
    sort: null,
    article: null,
    code: null,
    catalogCode: null,
    kindCode: null,
    tracking: [],
    identificationNumbers: []
  }
};

export const defaultData = {
  goods: [{ ...defaultGood }],
  total: {
    totalCostBeforeTax: '0.00',
    totalCostAfterTax: '0.00',
    totalAmountOfTax: '0.00',
    totalNetto: '0.00'
  }
};

export const defaultModal = {
  type: ModalType.close,
  index: 0
};

export type StateModal = { type: ModalType; index: number };

export const TableUniversalInvoice: React.FC<ITableUniversalInvoice> = memo(
  ({ values = defaultData, errors = {}, onChange }) => {
    let [stateModal, setStateModal] = useState<StateModal>(defaultModal);

    const onAppend = () => {
      const goods = get(values, 'goods', []);
      onChange?.({ ...values, goods: [...goods, { ...defaultGood }] });
    };

    const onCloseModal = () => setStateModal({ type: ModalType.close, index: 0 });

    const changeModal = (data: any) => {
      onChange?.(data);
      setStateModal({ type: ModalType.close, index: 0 });
    };

    const onChangeInformation = (formData: any) => {
      const { index } = stateModal;
      const data = { ...values };

      if (typeof index === 'undefined' || !values.goods || !values.goods[index as number]) {
        throw new Error(`Не найдем индекс в стате`);
      }

      // @ts-ignore
      data.goods[index].information = { ...formData };
      changeModal(data);
    };

    const onChangeInfoFields = (formData: any) => {
      const { index } = stateModal;
      const data = { ...values };

      if (typeof index === 'undefined' || !data.goods || !data.goods[index as number]) {
        throw new Error(`Не найдем индекс в стате`);
      }

      // @ts-ignore
      data.goods[index].infoFields = { ...formData };
      changeModal(data);
    };

    const onChangeProduct = (formData: any) => {
      const { index } = stateModal;
      const data = { ...values };

      if (typeof index === 'undefined' || !data.goods || !data.goods[index as number]) {
        throw new Error(`Не найдем индекс в стате`);
      }

      changeModal(data);
    };

    const renderContentModal = () => {
      if (stateModal.type === ModalType.information) {
        // @ts-ignore
        const formData = { ...values.goods[stateModal.index].information };

        return (
          <FormSchema
            isCenterFooter
            formData={formData}
            schema={schemaPencel}
            uiSchema={uiSchemaPencel}
            onSubmit={onChangeInformation}
          />
        );
      }

      if (stateModal.type === ModalType.infofields) {
        // @ts-ignore
        const formData = { ...values.goods[stateModal.index].infoFields };
        return (
          <FormSchema
            isCenterFooter
            formData={formData}
            schema={schemaFields}
            uiSchema={uiSchemaFields}
            onSubmit={onChangeInfoFields}
          />
        );
      }

      if (stateModal.type === ModalType.stamp) {
        return (
          <FormSchema
            isCenterFooter
            schema={schemaProduct}
            uiSchema={uiSchemaProduct}
            onSubmit={onChangeProduct}
          />
        );
      }

      return null;
    };

    const isErrorTable = Boolean(errors.errors);
    const rowsErrors = useMemo(() => get(errors, 'goods'), [errors]);

    return (
      <ThemeProvider theme={theme}>
        <TableContext.Provider
          value={{
            values,
            rowsErrors,
            setValues: onChange,
            onAppend,
            setStateModal,
            defaultGood
          }}
        >
          <HTMLTable $error={isErrorTable}>
            <colgroup>
              <col />
              <col width="300" />
              <col width="140" />
              <col width="60" />
              <col />
              <col />
              <col width="60" />
              <col width="100" />
              <col />
              <col />
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
