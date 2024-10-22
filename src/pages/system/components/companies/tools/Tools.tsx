import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Icons, Dropdown, Select, Input, ButtonKinds } from '@distate/components';
import { tariffsSeletor } from '../../../store/selects';
import { getCompanies, getTariffs } from '../../../store/actions';
import './style.css';

type SelectItem = { label: string; value: number };

/** Панель инструментов - Система, Юр лица */
export const Tools = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTariffs());
  }, [dispatch]);

  const [name, setName] = useState<string>();
  const [inn, setInn] = useState<string>();
  const [accountId, setAccountId] = useState<string>();
  const [status, setStatus] = useState<SelectItem>({
    label: 'Активирована',
    value: 1
  });
  const [tariff, setTariff] = useState<SelectItem>();

  const statusOptions = [
    {
      label: 'Активирована',
      value: 1
    },
    {
      label: 'Деактивирована',
      value: 0
    }
  ];

  const tariffs = useSelector(tariffsSeletor);

  const tariffOptions = tariffs?.map((item: any) => {
    const { id, title } = item;
    return {
      label: title,
      value: id
    };
  });

  const onClearForm = () => {
    setName(undefined);
    setInn(undefined);
    setAccountId(undefined);
    setStatus({
      label: 'Активирована',
      value: 1
    });
    setTariff(undefined);
  };

  const onSearch = () => {
    const params = {
      name,
      inn,
      accountId: accountId !== '' ? accountId : undefined,
      isActive: status?.value,
      tariff: tariff?.value,
      limit: 10
    };

    dispatch(getCompanies(params));
  };

  return (
    <div style={{ marginBottom: 15 }}>
      <Dropdown
        width="300px"
        widthRestrict
        trigger={<Button icon={<Icons.IconSearch fill="currentColor" />}>Поиск компании</Button>}
      >
        <div className="tools-dropdown_inner_wrapper">
          <div className="dropdown-header">
            <span>Поиск компании</span>
          </div>
          <div className="tools-dropdown_content">
            <Input label="Название" value={name} onChange={e => setName(e.target.value)} />
            <Input label="ИНН" value={inn} onChange={e => setInn(e.target.value)} />
            <Input
              label="Номер аккаунта"
              value={accountId}
              onChange={e => setAccountId(e.target.value)}
            />

            <Select
              value={status}
              label="Статус компании"
              options={statusOptions}
              onChange={(e: { label: string; value: number }) => setStatus(e)}
              placeholder=""
            />

            <Select
              value={tariff}
              label="Тариф"
              options={tariffOptions}
              onChange={(e: { label: string; value: number }) => setTariff(e)}
              placeholder=""
            />
          </div>
          <div className="tools-dropdown_buttons">
            <Button icon={<Icons.IconClose fill="currentColor" />} fullWidth onClick={onClearForm}>
              Очистить
            </Button>
            <Button
              icon={<Icons.IconSearch fill="currentColor" />}
              kind={ButtonKinds.Secondary}
              fullWidth
              onClick={onSearch}
            >
              Искать
            </Button>
          </div>
        </div>
      </Dropdown>
    </div>
  );
};
