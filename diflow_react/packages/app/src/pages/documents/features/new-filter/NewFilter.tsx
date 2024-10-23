import React, { useState, useEffect } from 'react';
import {
  Button,
  ButtonKinds,
  Icons,
  Dropdown,
  Input,
  Select,
  Group,
  DatePicker
} from '@distate/components';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import { Autocomplete } from '@distate/components/dist/Autocomplete';
import AutocompleteGateway from '@distate/core/dist/application/autocomplete/AutocompleteGateway';
import DictionaryGateway from '@distate/core/dist/application/dictionary/common/DictionaryGateway';
import { dateFormat } from '@distate/components/dist/FormSchema';

import { selectMode } from '../../store/selects';
import { docTypeOptions, contractorTypeOptions, getDocStatusOptions } from './filterData';
import {
  getContractorType,
  getNoEmptyString,
  getExtTypeName
} from '../../helpers/documnets.helpers';

import { DestinationType } from '../../../contractors/helpers/contractors.typings';
import { actionSearchSubmit } from '../../../../container/filter/store/actions';

const autocompleteGateway = new AutocompleteGateway();
const dictionaryGateway = new DictionaryGateway();

export const NewFilter = () => {
  /** тип документов (входящие\исходящие\архив\черновики) */
  const mode = useSelector(selectMode) || '';

  const [externalType, setExternalType] = useState<HTMLSelectElement>();
  /** контрагент, для отображения в селекте */
  const [contractorValue, setContractorValue] = useState<HTMLSelectElement>();
  /** дополнительная информация о выбранном контрагенте */
  const [contractor, setContractor] = useState<HTMLSelectElement>();
  const [documentType, setDocumentType] = useState<HTMLSelectElement>();
  const [status, setStatus] = useState<HTMLSelectElement>();

  /** для ввода даты "создано с" */
  const [createFrom, setCreateFrom] = React.useState<any>(null);
  /** для ввода даты "создано по" */
  const [createTo, setCreateTo] = React.useState<any>(null);
  /** Номер документа */
  const [documentNumber, setDocumentNumber] = useState<string | undefined>();
  /** для ввода даты "дата в документе с" */
  const [documentDateFrom, setDocumentDateFrom] = React.useState<any>(null);
  /** для ввода даты "дата в документе по" */
  const [documentDateTo, setDocumentDateTo] = React.useState<any>(null);

  const [operator, setOperator] = useState<HTMLSelectElement>();
  const [network, setNetwork] = useState<HTMLSelectElement>();

  const [operatorOptions, setOperatorOptions] = useState<any[]>([]);
  const [networkOptions, setNetworkOptions] = useState<any[]>([]);

  /** флаг отображения селекта выбора оператора */
  const [isVisibleOperator, setIsVisibleOperator] = useState(false);
  /** флаг отображения селекта выбора сети */
  const [isVisibleNetwork, setIsVisibleNetwork] = useState(false);

  /** для сохранения значения текущего типа пользователя ЮЛ\ФЛ */
  const [contractorRows, setContractorRows] = useState<any[]>([]);

  type ServerDataRow = {
    code: string;
    name: string;
  };
  /** преобразует массив справочника из сервера в option селекта */
  const serverDataToOptions = (rows: ServerDataRow[]) =>
    rows.map(item => ({ value: item.code, label: item.name }));

  /** получение справочников */
  useEffect(() => {
    const operatorLoad = async () => {
      const { rows: operatorRows } = await dictionaryGateway.getExternalOperators();
      const operatorOptionList = serverDataToOptions(operatorRows);
      setOperatorOptions(operatorOptionList);

      const { rows: networkRows } = await dictionaryGateway.getNetworks();
      const networkOptionList = serverDataToOptions(networkRows);
      setNetworkOptions(networkOptionList);
    };
    operatorLoad();
  }, []);

  /** изменение отображения селектов при смене типа контрагента */
  useEffect(() => {
    switch (externalType?.value) {
      case DestinationType.Roaming:
        setIsVisibleOperator(true);
        setIsVisibleNetwork(false);
        return;
      case DestinationType.LoaclRoaming:
        setIsVisibleOperator(false);
        setIsVisibleNetwork(true);
        return;
      case DestinationType.Connector:
        setIsVisibleOperator(true);
        setIsVisibleNetwork(false);
        return;
      case DestinationType.Hub1c:
        setIsVisibleOperator(true);
        setIsVisibleNetwork(false);
        return;
      default:
        setIsVisibleOperator(false);
        setIsVisibleNetwork(false);
    }
  }, [externalType]);

  const dispatch = useDispatch();

  /** очистка формы */
  const onClearForm = () => {
    setExternalType(undefined);
    setOperator(undefined);
    setContractor(undefined);
    setContractorValue(undefined);
    setDocumentType(undefined);
    setStatus(undefined);
    setCreateFrom(undefined);
    setCreateTo(undefined);
    setDocumentDateFrom(undefined);
    setDocumentDateTo(undefined);
    setDocumentNumber(undefined);
  };

  /** преобразование ответа сервера в массив для опций селекта контрагента */
  const contractorDataToOptions = (data: any[]) => {
    setContractorRows(data);

    return data.map(item => {
      /** получение типа контрагента */
      const extTypeName = getExtTypeName(item?.externalType);
      const contractorType = getContractorType([extTypeName, item.externalOperator, item.network]);

      /** если это компания */
      if (item.type === 'division') {
        return { value: item.id, label: item.company + contractorType };
      }
      /** если это ФЛ */
      const fio = getNoEmptyString([
        item?.person?.surname,
        item?.person?.name,
        item?.person?.patronymic
      ]);

      return {
        value: item.id,
        label: `${fio}${contractorType}`
      };
    });
  };

  /** загрузка подходящих контрагентов в автокомплите */
  const contractorLoad = async (raw: string, callback: any) => {
    const { rows = [] } = await autocompleteGateway.getContractor({ recipient: raw });
    callback(contractorDataToOptions(rows));
  };

  const onContractorChange = (e: HTMLSelectElement) => {
    setContractorValue(e);
    /** получение информации о выбранном контрагенте */
    const currentPersonInfo = contractorRows.find(item => item.id === e?.value);
    setContractor(currentPersonInfo);
  };

  /** обработка нажания на кнопку Фильтровать */
  const onFilter = async () => {
    const filterParams = {
      externalType,
      contractor,
      documentType,
      packageStatus: status,
      createdFrom: dateFormat(createFrom, 'dd.MM.yyyy'),
      createdTo: dateFormat(createTo, 'dd.MM.yyyy'),
      documentDateFrom: dateFormat(documentDateFrom, 'dd.MM.yyyy'),
      documentDateTo: dateFormat(documentDateTo, 'dd.MM.yyyy'),
      documentNumber,
      network,
      externalOperator: operator?.value
    };

    function clean(obj: any) {
      for (const propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
          delete obj[propName];
        }
      }
    }
    clean(filterParams);
    dispatch(actionSearchSubmit({ formData: filterParams }));
  };

  const onChangeExternalType = (e: HTMLSelectElement) => {
    /** очистка полей, которые скрываются при смене типа контрагента */
    setOperator(undefined);
    setNetwork(undefined);

    setExternalType(e);
  };

  return (
    <div className="dropdown-menu group">
      <Dropdown
        width="300px"
        widthRestrict
        trigger={<Button icon={<Icons.IconSearch fill="currentColor" />}>Поиск</Button>}
      >
        <div className="document-dropdown-wrapper">
          <div className="dropdown-header">
            <span>Поиск по документам</span>
          </div>
          <div>
            <Select
              value={externalType}
              label="Тип контрагента"
              name="externalType"
              options={contractorTypeOptions}
              onChange={onChangeExternalType}
              placeholder=""
            />

            {isVisibleOperator && (
              <Select
                value={operator}
                label="Оператор"
                name="operator"
                options={operatorOptions}
                onChange={(e: HTMLSelectElement) => setOperator(e)}
                placeholder=""
              />
            )}

            {isVisibleNetwork && (
              <Select
                value={network}
                label="Сеть"
                name="network"
                options={networkOptions}
                onChange={(e: HTMLSelectElement) => setNetwork(e)}
                placeholder=""
              />
            )}

            <Autocomplete
              value={contractorValue}
              loadOptions={contractorLoad}
              onChange={(e: HTMLSelectElement) => onContractorChange(e)}
              label="Контрагент"
              placeholder=""
            />

            <Select
              value={documentType}
              label="Тип документа"
              name="documentType"
              options={docTypeOptions}
              onChange={(e: HTMLSelectElement) => setDocumentType(e)}
              placeholder=""
            />

            <Select
              value={status}
              label="Статус"
              name="status"
              options={getDocStatusOptions(mode)}
              onChange={(e: HTMLSelectElement) => setStatus(e)}
              placeholder=""
            />

            <Group>
              <DatePicker
                selectsStart
                name="from"
                label="Создано с"
                value={createFrom}
                startDate={createFrom}
                endDate={createTo}
                placeholderText="Формат: ДД.ММ.ГГГГ"
                onChange={e => setCreateFrom(e)}
              />
              <DatePicker
                selectsEnd
                name="to"
                label="по"
                value={createTo}
                startDate={createFrom}
                endDate={createTo}
                minDate={createFrom}
                placeholderText="Формат: ДД.ММ.ГГГГ"
                onChange={e => setCreateTo(e)}
              />
            </Group>

            <Input
              label="Номер документа"
              name="documentNumber"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDocumentNumber(e.target.value)
              }
              value={documentNumber}
            />

            <Group>
              <DatePicker
                selectsStart
                name="from"
                label="Дата в документе c"
                value={documentDateFrom}
                startDate={documentDateFrom}
                endDate={documentDateTo}
                placeholderText="Формат: ДД.ММ.ГГГГ"
                onChange={e => setDocumentDateFrom(e)}
              />
              <DatePicker
                selectsEnd
                name="to"
                label="по"
                value={documentDateTo}
                startDate={documentDateFrom}
                endDate={documentDateTo}
                minDate={documentDateFrom}
                placeholderText="Формат: ДД.ММ.ГГГГ"
                onChange={e => setDocumentDateTo(e)}
              />
            </Group>
          </div>
          <div className="document-dropdown-buttons">
            <Button icon={<Icons.IconClose fill="currentColor" />} fullWidth onClick={onClearForm}>
              Очистить
            </Button>
            <Button
              icon={<Icons.IconSearch fill="currentColor" />}
              kind={ButtonKinds.Secondary}
              fullWidth
              onClick={onFilter}
            >
              Фильтровать
            </Button>
          </div>
        </div>
      </Dropdown>
    </div>
  );
};
