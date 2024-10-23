import React from 'react';
import AutocompleteGateway from '@distate/core/dist/application/autocomplete/AutocompleteGateway';
import { AutocompleteDownshift } from '../../../../common/autocomplete-downshift';
import { getExternalTypeToString } from '../../../../helpers/heplers';

type Props = {
  item?: {
    value: number;
    label: string;
  };
  setItem: Function;
  error?: boolean;
  errors?: [];
  /** query-параметры (кроме all) */
  qParams?: Object;
  placeholder?: string;
};

/** Автокомплит - Получатели */
export const AutocompleteRecipient = (props: Props) => {
  const { item, setItem, error, errors, qParams, placeholder } = props;

  /** преобразование ответа сервера в массив для опций селекта контрагента */
  const divisionDataToOptions = (data: any[]) => {
    return data.map(item => {
      const name = item?.companyName;
      const inn = item?.companyInn && `ИНН: ${item.companyInn}`;
      const ogrn = item?.companyOgrn && `ОГРН: ${item?.companyOgrn}`;
      const kpp = item?.companyKpp && `КПП: ${item?.companyKpp}`;
      const externalType = getExternalTypeToString(
        item?.companyExternalType,
        item?.companyExternalOperator,
        item?.companyNetwork
      );

      const label = [name, inn, ogrn, kpp, externalType].filter(Boolean).join(', ');
      return {
        value: item?.id,
        label
      };
    });
  };

  const autocompleteGateway = new AutocompleteGateway();
  /** загрузка подходящих получателей в автокомплите */
  const toDivisionLoad = async (str: string) => {
    const { rows = [] } = await autocompleteGateway.getRecipient({
      all: str,
      ...qParams
    });
    return rows;
  };

  return (
    <AutocompleteDownshift
      loadOptions={toDivisionLoad}
      onChange={setItem}
      mapData={divisionDataToOptions}
      initialInputValue={item?.label}
      error={error}
      errors={errors}
      placeholder={placeholder}
      hasArrow
    />
  );
};
