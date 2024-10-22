import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, ButtonKinds, Icons, Dropdown, Input, Placement } from '@distate/components';
import { getAddedGroupEmployee } from '../../../../store/actions';

interface Props {
  id: number;
}

/** Фильтр для Сотрудников (добавленных) */
export const AddedEmployeeFilter = (props: Props) => {
  const { id } = props;
  const dispatch = useDispatch();

  const [name, setName] = React.useState<string | undefined>();
  const [surname, setSurname] = React.useState<string | undefined>();
  const [patronymic, setPatronymic] = React.useState<string | undefined>();
  const [position, setPosition] = React.useState<string | undefined>();

  const onClearForm = () => {
    setName(undefined);
    setSurname(undefined);
    setPatronymic(undefined);
    setPosition(undefined);
  };

  const onFilter = () => {
    const filterParams = {
      name,
      surname,
      patronymic,
      position
    };
    dispatch(getAddedGroupEmployee({ ...filterParams, id }));
  };

  return (
    <Dropdown
      widthRestrict
      placement={Placement.TOP}
      trigger={<Button icon={<Icons.IconSearch fill="currentColor" />}>Фильтрация</Button>}
    >
      <div className="contractor-dropdown-wrapper">
        <div className="dropdown-header">
          <span>Сотрудники</span>
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
            label="Должность"
            name="socialNumber"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPosition(e.target.value)}
            value={position}
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
  );
};