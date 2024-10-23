import { routeEdit } from './documents.routes';
import { DocumentType, DefaultState } from './documents.typings';

export const switchCheckDocuments = (
  check: boolean,
  items: DocumentType[],
  values: Pick<DefaultState, 'selected'>['selected']
) => {
  return items.map(
    (item: DocumentType): DocumentType => {
      if (values.includes(item.packageId)) {
        item.checked = check;
      }

      return item;
    }
  );
};

export const parseValue = (value: any): any => {
  if (Array.isArray(value)) {
    return value.map(val => parseValue(val));
  }

  if (typeof value === 'object' && value.hasOwnProperty('value')) {
    return value.value;
  }

  return value;
};

export const getEditUrl = (id: string, flowType: string, flowGroup: string): string | undefined => {
  let type: string = flowGroup;

  if (flowType === 'invoice_utd' || flowType === 'invoice_correction_ucd') {
    type = flowType;
  }

  if (!routeEdit.hasOwnProperty(type)) {
    return;
  }

  return routeEdit[type].replace(':id', id);
};

export const isArchivable = (status: string) => {
  return [
    'complete',
    'iaktprm_has_been_declined',
    'receiving_has_not_been_confirmed',
    'sending_has_not_been_confirmed',
    'annulled',
    'declined',
    'receiving_notification_has_not_been_confirmed',
    'dp_tovtorgpr_has_been_declined',
    'otorg12_has_been_declined'
  ].includes(status);
};

/** принимает массив, возвращает одну строку из не пустых значений массива в скобках.
 * если все значения undefined, то вернется пусая строка
 */
export const getContractorType = (args: any[]) => {
  const noEmptyArr = args.filter(item => item !== undefined);
  const str = noEmptyArr.join(' ');
  if (str.trim().length < 1) {
    return '';
  }
  return ` (${str})`;
};

/** возвращает строку из не пустых значений*/
export const getNoEmptyString = (args: any[]) => {
  const noEmptyArr = args.filter(item => item !== undefined);
  const str = noEmptyArr.join(' ');
  if (str.length < 1) {
    return '';
  }
  return `${str}`;
};

/** Возвращает имя типа контрагента по его коду */
export const getExtTypeName = (code?: string) => {
  if (code === 'roaming') {
    return 'Роуминг';
  }
  if (code === 'LoaclRoaming') {
    return 'Внутренний роуминг';
  }
  if (code === 'taxcom') {
    return '1С-ЭДО';
  }
  if (code === 'connector') {
    return 'Коннектор';
  }

  return 'Локальный';
};
