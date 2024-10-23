import get from 'lodash.get';
import { DTOUCDError } from './types';

export const transformerDTOUCDError = (error: DTOUCDError): Record<string, any> => {
  if (!error) return {};

  const invoiceCorrectionNumber = get(error, 'invoiceCorrection.number');
  const invoiceCorrectionDate = get(error, 'invoiceCorrection.date');
  const operationInformation = get(error, 'factActivity3.operationInformation');
  const transferDocuments = get(error, 'factActivity3.transferDocuments');
  const basisDocuments = get(error, 'factActivity3.basisDocuments');
  const governmentContractId = get(error, 'invoiceCorrection.information.governmentContractId');
  const table = get(error, 'table');

  return {
    governmentContractId,
    invoiceCorrectionNumber,
    invoiceCorrectionDate,
    operationInformation,
    transferDocuments,
    basisDocuments,
    table
  };
};
