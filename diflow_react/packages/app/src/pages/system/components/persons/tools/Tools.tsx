import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Icons, Dropdown, Select, Input, ButtonKinds } from '@distate/components';
import { getPersons } from '../../../store/actions';
import './style.css';

type SelectItem = { label: string; value: number };

/** Панель инструментов - Система, Юр лица */
export const Tools = () => {
  const dispatch = useDispatch();

  const [surname, setSurname] = useState<string>();
  const [name, setName] = useState<string>();
  const [patronymic, setPatronymic] = useState<string>();
  const [socialNumber, setSocialNumber] = useState<string>();
  const [status, setStatus] = useState<SelectItem>({
    label: 'Активирован',
    value: 1
  });

  const statusOptions = [
    {
      label: 'Активирован',
      value: 1
    },
    {
      label: 'Ожидает активации',
      value: 0
    }
  ];

  const onClearForm = () => {
    setSurname(undefined);
    setName(undefined);
    setPatronymic(undefined);
    setSocialNumber(undefined);
    setStatus({
      label: 'Активирована',
      value: 1
    });
  };

  const onSearch = () => {
    const params = {
      surname,
      name,
      patronymic,
      socialNumber,
      active: status?.value,
      limit: 10
    };

    dispatch(getPersons(params));
  };

  return (
    <div style={{ marginBottom: 15 }}>
      <Dropdown
        width="300px"
        widthRestrict
        trigger={
          <Button icon={<Icons.IconSearch fill="currentColor" />}>Поиск физического лица</Button>
        }
      >
        <div className="tools-dropdown_inner_wrapper">
          <div className="dropdown-header">
            <span>Поиск физического лица</span>
          </div>
          <div className="tools-dropdown_content">
            <Input label="Фамилия" value={surname} onChange={e => setSurname(e.target.value)} />
            <Input label="Имя" value={name} onChange={e => setName(e.target.value)} />
            <Input
              label="Отчество"
              value={patronymic}
              onChange={e => setPatronymic(e.target.value)}
            />
            <Input
              label="СНИЛС"
              value={socialNumber}
              onChange={e => setSocialNumber(e.target.value)}
            />

            <Select
              value={status}
              label="Статус физического лица"
              options={statusOptions}
              onChange={(e: { label: string; value: number }) => setStatus(e)}
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
