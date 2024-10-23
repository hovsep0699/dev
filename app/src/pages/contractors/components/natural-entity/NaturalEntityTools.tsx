import React, { useState } from 'react';
import { Button, ButtonKinds, Icons, Dropdown, Input, Select } from '@distate/components';
import { RelationStatus } from '../../helpers/contractors.typings';
import { useDispatch } from 'react-redux';
import { getNaturalEntityContractors } from '../../store/actions';

export const NaturalEntityTools = () => {
  const [name, setName] = useState<string | undefined>();
  const [surname, setSurname] = useState<string | undefined>();
  const [patronymic, setPatronymic] = useState<string | undefined>();
  const [socialNumber, setSocialNumber] = useState<string | undefined>();
  const [status, setStatus] = useState<HTMLSelectElement>();

  const dispatch = useDispatch();

  const onClearForm = () => {
    setName(undefined);
    setSurname(undefined);
    setPatronymic(undefined);
    setSocialNumber(undefined);
    setStatus(undefined);
  };

  const onFilter = () => {
    const filterParams = {
      name,
      surname,
      patronymic,
      socialNumber,
      status: status?.value
    };
    dispatch(getNaturalEntityContractors(filterParams));
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
              label="Имя"
              name="name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              value={name}
            />
            <Input
              label="Фамилия"
              name="surname"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSurname(e.target.value)}
              value={surname}
            />
            <Input
              label="Отчество"
              name="patronymic"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPatronymic(e.target.value)}
              value={patronymic}
            />
            <Input
              label="СНИЛС"
              name="socialNumber"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSocialNumber(e.target.value)}
              value={socialNumber}
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
