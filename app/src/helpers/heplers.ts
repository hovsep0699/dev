import { DestinationType } from '../pages/contractors/helpers/contractors.typings';

/** возвращает название типа (без типа Локальный), либо undefined */
export const getExternalTypeTitle = (type?: string): string | undefined => {
  if (type === DestinationType.LoaclRoaming) return 'Локальный роуминг';
  if (type === DestinationType.Roaming) return 'Роуминг';
  if (type === DestinationType.Connector) return 'Коннектор';
  if (type === DestinationType.Hub1c) return '1С-ЭДО';

  return;
};

/** объединяет не пустые значения в строку */
export const joinNoEmptyValues = (args: any[], separator = ' '): string | undefined => {
  const noEmptyArr = args.filter(item => !!item && item !== null);
  const result = noEmptyArr.join(separator);
  if (noEmptyArr.length > 0) {
    return result;
  }
};

/** возвращает оформленную или пустую строку типа контрагента */
export const getExternalTypeToString = (
  type?: string,
  operator?: string,
  network?: string
): string => {
  const typeTitle = getExternalTypeTitle(type);
  const allParamsToString = joinNoEmptyValues([typeTitle, operator, network]);
  const resultStr = allParamsToString ? ` (${allParamsToString})` : '';

  return resultStr;
};
