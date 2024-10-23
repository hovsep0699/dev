import React, { useState } from 'react';
import { Button, ButtonKinds, Icons, Dropdown, Input, Select } from '@distate/components';
import { RelationStatus, DestinationType } from '../../helpers/contractors.typings';
import { useDispatch, useSelector } from 'react-redux';
import { getLegalEntityContractors, getExternalOperators } from '../../store/actions';
import { externalOperators } from '../../store/selectors';

export const LegalEntityTools = () => {
  const [inn, setInn] = useState<string | undefined>();
  const [operator, setOperator] = useState<HTMLSelectElement>();
  const [externalType, setExternalType] = useState<HTMLSelectElement>();
  const [status, setStatus] = useState<HTMLSelectElement>();

  const dispatch = useDispatch();

  const onClearForm = () => {
    setInn(undefined);
    setOperator(undefined);
    setExternalType(undefined);
    setStatus(undefined);
  };

  React.useEffect(() => {
    dispatch(getExternalOperators());
  }, [dispatch]);

  const operators = useSelector(externalOperators)?.rows || [];

  const onFilter = () => {
    const filterParams = {
      inn,
      externalOperator: operator?.value,
      externalType: externalType?.value && [externalType?.value],
      status: status?.value
    };
    dispatch(getLegalEntityContractors(filterParams));
  };

  return (
    <div className="contractor-tools">
      <Dropdown
        widthRestrict
        trigger={<Button icon={<Icons.IconSearch fill="currentColor" />}>Фильтрация</Button>}
      >
        <div className="contractor-dropdown-wrapper">
          <div className="dropdown-header">
            <span>Фильтрация контрагента</span>
          </div>
          <div>
            <Input
              label="ИНН"
              name="inn"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInn(e.target.value)}
              value={inn}
            />
            <Select
              label="Оператор"
              name="operator"
              options={operators.map(item => ({ value: item.code, label: item.name }))}
              onChange={(e: HTMLSelectElement) => setOperator(e)}
              value={operator}
            />
            <Select
              label="Тип"
              name="externalExternalType"
              options={[
                {
                  value: DestinationType.Local,
                  label: 'Локальный'
                },
                {
                  value: DestinationType.Roaming,
                  label: 'Роуминг'
                },
                {
                  value: DestinationType.LoaclRoaming,
                  label: 'Локальный Роуминг'
                },
                {
                  value: DestinationType.Hub1c,
                  label: '1С-ЭДО'
                }
              ]}
              onChange={(e: HTMLSelectElement) => setExternalType(e)}
              value={externalType}
            />
            <Select
              label="Статус"
              name="status"
              options={[
                {
                  value: RelationStatus.Active,
                  label: 'Активен'
                },
                {
                  value: RelationStatus.Blocked,
                  label: 'Заблокирован'
                }
              ]}
              onChange={(e: HTMLSelectElement) => setStatus(e)}
              value={status}
            />
          </div>
          <div className="contractor-dropdown-buttons">
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
