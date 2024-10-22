import get from 'lodash.get';
import { DTOUCDDocument, UCDDocumentSchema } from './types';
import { dateFormat } from '@distate/components/dist/FormSchema';

const getArrayOrObject = (val: unknown) => {
  if (Array.isArray(val)) return val[0];
  return val;
};

export const transformerDTOUCDForm = (UCD: DTOUCDDocument): UCDDocumentSchema => {
  const {
    type: { systemName },
    formData
  } = UCD;

  if (systemName === 'on_schfdoppr') {
    throw new Error(`Тип "${systemName}" не поддерживается в текущей версии документооборота.`);
  }

  const isEditDocument = Boolean(formData);
  return isEditDocument ? parseUCDFormData(UCD) : parseUCDDocuemnt(UCD);
};

/** Парсим formData созданного документа */
const parseUCDFormData = ({
  package: { to, from },
  formData
}: DTOUCDDocument): UCDDocumentSchema => {
  if (!formData) {
    throw new Error('Данные "formData" не найдены');
  }

  const date = dateFormat(new Date(), 'dd.MM.yyyy');
  const invoiceDate = get(formData, 'document.invoiceCorrection.date');
  const invoiceNumber = get(formData, 'document.invoiceCorrection.number');
  const buyer = get(formData, 'document.invoiceCorrection.buyer');
  const seller = get(formData, 'document.invoiceCorrection.seller');
  const contractId = get(formData, 'document.invoiceCorrection.information.governmentContractId');
  const currencyCode = get(formData, 'document.invoiceCorrection.currencyCode');
  const currencyName = get(formData, 'document.invoiceCorrection.information.currencyName');
  const currencyString = `${currencyCode} — ${currencyName}`;
  const factActivity = `Документ № ${invoiceNumber} от ${invoiceDate}`;

  return {
    factActivity,
    currencyString,
    governmentContractId: contractId,
    invoiceCorrectionDate: get(formData, 'document.invoiceCorrection.date', date),
    invoiceCorrectionNumber: get(formData, 'document.invoiceCorrection.number', ''),
    purpose: getUCDPurpose(get(formData, 'purpose')),
    name: get(formData, 'document.name'),
    buyer: createFromPlace(to, buyer),
    seller: createFromPlace(from, seller),
    basisDocuments: get(formData, 'document.factActivity3.basisDocuments', [{ date }]),
    attributeValues: get(formData, 'document.invoiceCorrection.infoField.attributeValues', []),
    transferDocuments: get(formData, 'document.factActivity3.transferDocuments', [{ date }]),
    operationInformation: get(formData, 'document.factActivity3.operationInformation'),
    additionalInformation: get(formData, 'document.factActivity3.additionalInformation')
  };
};

/** Порсим данные для документа */
const parseUCDDocuemnt = ({
  package: { to, from },
  parameters
}: DTOUCDDocument): UCDDocumentSchema => {
  const {
    purpose,
    invoice: {
      date: invoiceDate,
      number,
      buyers,
      currencyCode,
      information: { currencyName }
    }
  } = parameters;

  const buyer = getArrayOrObject(buyers);
  const date = dateFormat(new Date(), 'dd.MM.yyyy') as string;
  const factActivity = `Документ № ${number} от ${invoiceDate}`;
  const currencyString = `${currencyCode} — ${currencyName}`;

  return {
    governmentContractId: '',
    invoiceCorrectionDate: date,
    invoiceCorrectionNumber: '',
    name: '',
    buyer: createFromPlace(to, buyer),
    seller: createFromPlace(from, buyer),
    purpose: getUCDPurpose(purpose),
    factActivity,
    currencyString,
    basisDocuments: [{ date }],
    attributeValues: [],
    transferDocuments: [{ date }],
    operationInformation: '',
    additionalInformation: ''
  };
};

const getUCDPurpose = (val: string) => {
  switch (val) {
    case 'ДОП':
    case 'ДИС':
      return { label: 'Документ об изменении стоимости', value: 'ДИС' };
    case 'СЧФ':
    case 'КСЧФ':
      return { label: 'Корр. счет-фактура', value: 'КСЧФ' };
    case 'СЧФДОП':
    case 'КСЧФДИС':
      return { label: 'Корр. счет-фактура и документ об изменении стоимости', value: 'КСЧФДИС' };
  }

  return null;
};

const createFromPlace = (place: Record<string, any>, { address }: Record<string, any>): any => {
  const computed = [];
  const {
    company: {
      type: participantType,
      accountNumber: participantAccountNumber,
      bik: participantBIK,
      name: participantName,
      inn: participantINN,
      authorizedPerson
    },
    division: {
      kpp: participantKPP,
      address: participantAddress,
      classificationNumber: participantOKPO
    }
  } = place;

  const result: Record<string, any> = {
    inn: participantINN,
    kpp: participantKPP,
    name: participantName,
    okpo: participantOKPO,
    type: participantType.systemName,
    innkpp: participantINN + ((participantKPP)?`/` + participantKPP : ''),
    address: null,
    accountNumber: participantAccountNumber,
    bank: {
      name: null,
      bik: participantBIK
    }
  };

  if (participantAddress) {
    result.address = {
      ...address,
      looselyTypedAddress: participantAddress.looselyTypedAddress,
      postalCode: participantAddress.postalCode,
      settlement: participantAddress.settlement,
      district: participantAddress.district,
      building: participantAddress.building,
      country: {
        code: participantAddress.country.code,
        title: participantAddress.country.title
      },
      street: participantAddress.street,
      region: {
        code: participantAddress.region && participantAddress.region.code,
        title: participantAddress.region && participantAddress.region.title
      },
      house: participantAddress.house,
      city: participantAddress.city,
      room: participantAddress.room
    };
  }

  if (authorizedPerson && participantType.systemName === 'IP') {
    result.companyName = participantName;
    result.fio = {
      name : authorizedPerson.person.name,
      surname : authorizedPerson.person.surname,
      patronymic : authorizedPerson.person.patronymic
    }

  } else {
    result.companyName = participantName;
  }

  if (
    result.address.region &&
    result.address.country &&
    result.address.region.code &&
    result.address.country.code
  ) {
    const requiredData = `${result.address.country.title} ${result.address.region.title}`;

    computed.push(requiredData);
    if (result.address.postalCode) computed.push(result.address.postalCode);
    if (result.address.city) computed.push(`г. ${result.address.city}`);
    if (result.address.district) computed.push(`р. ${result.address.district}`);
    if (result.address.settlement) computed.push(`пос. ${result.address.settlement}`);
    if (result.address.street) computed.push(`ул. ${result.address.street}`);
    if (result.address.house) computed.push(`д. ${result.address.house}`);
    if (result.address.building) computed.push(`стр. ${result.address.building}`);
    if (result.address.room) computed.push(`кв. ${result.address.room}`);
  } else if (result.address.looselyTypedAddress) {
    computed.push(result.address.looselyTypedAddress);
  }

  result.address.computed = computed.filter(Boolean).join(', ');

  return result;
};
