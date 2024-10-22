import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, ButtonKinds, Icons, Dropdown, Input, Placement } from '@distate/components';
import { getNaturalEntityGroup } from '../../../../store/actions';

interface Props {
  id: number;
}

/** Фильтр для ФЛ (еще не добавленных) */
export const NaturalEntityFilter = (props: Props) => {
  const { id } = props;
  const dispatch = useDispatch();

  const [name, setName] = React.useState<string | undefined>();
  const [surname, setSurname] = React.useState<string | undefined>();
  const [patronymic, setPatronymic] = React.useState<string | undefined>();
  const [socialNumber, setSocialNumber] = React.useState<string | undefined>();

  const onClearForm = () => {
    setName(undefined);
    setSurname(undefined);
    setPatronymic(undefined);
    setSocialNumber(undefined);
  };

  const onFilter = () => {
    const filterParams = {
      name,
      surname,
      patronymic,
      socialNumber
    };
    dispatch(getNaturalEntityGroup({ ...filterParams, id }));
  };

  return (
    <Dropdown
      widthRestrict
      placement={Placement.TOP}
      trigger={<Button icon={<Icons.IconSearch fill="currentColor" />}>Фильтрация</Button>}
    >
      <div className="contractor-dropdown-wrapper">
        <div className="dropdown-header">
          <span>Физические лица</span>
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
