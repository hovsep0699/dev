import React, { useState } from 'react';
import { Button, ButtonKinds, Icons, Dropdown, Input } from '@distate/components';
import { useDispatch } from 'react-redux';
import { getWaitingAnswerContractor } from '../../store/actions';

export const WaitingAnswerTools = () => {
  const [name, setName] = useState<string | undefined>();
  const [surname, setSurname] = useState<string | undefined>();
  const [patronymic, setPatronymic] = useState<string | undefined>();
  const [inn, setInn] = useState<string | undefined>();

  const dispatch = useDispatch();

  const onClearForm = () => {
    setName(undefined);
    setSurname(undefined);
    setPatronymic(undefined);
    setInn(undefined);
  };

  const onFilter = () => {
    const filterParams = {
      name,
      surname,
      patronymic,
      inn,
      offset: 0
    };
    dispatch(getWaitingAnswerContractor(filterParams));
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
              label="ИНН"
              name="inn"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInn(e.target.value)}
              value={inn}
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
