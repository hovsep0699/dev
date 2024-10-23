import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import DiError from '@distate/core/dist/application/error/Error';
import UPDService from '@distate/core/dist/application/documents/upd/UPDService';

import { DOCUMENT_VIEW } from '../../../common/Url';
import Flesh from '../../../common/flash/Flash';
import { ItemData } from '../../../common/TableUniversalInvoice';
import { removeEmpty } from '../../../utils/ObjectUtil';
import { isObject } from '@distate/components/dist/FormSchema/utils';

type CreateDocument = {
  formData: Record<string, any>;
  tableData: ItemData;
};

const hasError = (val: unknown): boolean => isObject(val) && val.hasOwnProperty('errors');

export const useCreateDocument = () => {
  const history = useHistory();
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [errors, setErrors] = useState<Record<string, any>>({});

  const createDocument = async ({ formData, tableData }: CreateDocument) => {
    setIsLoadingCreate(true);
    const {
      date,
      basis,
      force,
      number,
      factory,
      cargoFrom,
      basisName,
      consignee,
      updatedDate,
      updatedNumber,
      paymentDocuments,
      informationField,
      economicSubjectName,
      currencyExchangeRate,
      from = {},
      purpose = {},
      recipient = {},
      currencyCode = {},
      shipmentDocuments
    } = formData;

    const { label: currencyName, value: currencyValue } = currencyCode;
    const { type: toType, value: toValue } = recipient;

    const to: Record<string, number> = {};
    if (toType && toValue) {
      to[toType] = Number(toValue);
    }

    const requestData = removeEmpty({
      to,
      force,
      from: {
        division: from?.division?.value,
        person: from?.person?.value || null
      },
      purpose: purpose?.value,
      document: {
        basisName,
        economicSubjectName,
        invoice: {
          date,
          number,
          cargoFrom,
          consignee,
          paymentDocuments,
          currencyCode: currencyValue,
          correction: {
            date: updatedDate,
            number: updatedNumber
          },
          information: {
            factor: factory,
            basis,
            currencyName,
            currencyExchangeRate
          },
          shipmentDocuments,
          informationField: {
            fileGuid: undefined,
            attributeValues: informationField
          }
        },
        table: tableData
      }
    });

    try {
      const { data } = await UPDService.create(requestData);
      if (data && data.success) {
        const redirectUrl = DOCUMENT_VIEW.replace(':id', data.id);
        history.push(redirectUrl);
      } else {
        Flesh.error('Возникла ошбика');
      }
    } catch (rawError) {
      if (rawError instanceof DiError) {
        const rawErrors = rawError?.jsError?.response?.data?.messages || {};
        const { to, document } = rawErrors;
        const errors: Record<string, any> = {};

        if (hasError(to)) {
          errors.recipient = to;
        }

        if (document && isObject(document)) {
          const { invoice = {}, table } = document;
          const { currencyCode, number, date } = invoice;

          if (hasError(date)) errors.date = date;
          if (hasError(number)) errors.number = number;
          if (hasError(currencyCode)) errors.currencyCode = currencyCode;

          if (hasError(table)) errors.table = table;
          else if (isObject(table)) {
            errors.table = {};

            if (hasError(table?.total)) errors.table.total = table.total;
            if (Array.isArray(table?.goods)) errors.table.goods = table.goods;
          }
        }

        setErrors(errors);
        Flesh.error(rawError.msgForUser);
      } else {
        Flesh.error('Возникла ошбика');
      }
    } finally {
      setIsLoadingCreate(false);
    }
  };
  return { errors, isLoadingCreate, createDocument };
};
