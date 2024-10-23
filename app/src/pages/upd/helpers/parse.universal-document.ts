import { DocumentDTO } from '../types';
import Environment from '@distate/core/dist/application/Environment';
import AutocompleteService from '@distate/core/dist/application/autocomplete/AutocompleteService';

const getDivision = (val: Record<string, Nullable<number>> = {}) => val.division || val.person;
const makeSelectValue = (label: string, value: string) => ({ label, value });

export type ResponseDocumentDTO = {
  id: number;
  formData: DocumentDTO;
};

export const parseDTODocumentToDocument = async ({ formData: data }: ResponseDocumentDTO) => {
  const {
    to,
    from,
    purpose,
    document: {
      economicSubjectName,
      invoice: {
        date,
        number,
        cargoFrom,
        consignee,
        correction,
        currencyCode,
        paymentDocuments,
        information: { currencyName, factory }
      }
    }
  } = data;

  const divisionIdTo = getDivision(to);
  const divisionTo = await Environment.getCompanyGateway().getByDivisionId(divisionIdTo);
  const divisionToName = [
    divisionTo.name,
    `ИНН: ${divisionTo.inn}`,
    `ОГРН: ${divisionTo.ogrn}`
  ].join(', ');

  const divisionIdFrom = getDivision(to);
  const divisionFrom = await Environment.getCompanyGateway().getByDivisionId(getDivision(from));

  const formData = {
    date,
    number,
    purpose,
    updatedDate: correction?.date,
    currencyCode: makeSelectValue(currencyName, currencyCode),
    updatedNumber: correction?.number,
    paymentDocuments,
    economicSubjectName,
    recipient: { value: divisionIdTo, label: divisionToName },
    factory,
    cargoFrom,
    consignee
  };

  return formData;
};
