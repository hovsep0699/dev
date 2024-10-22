import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, ButtonKinds, Icons, Dropdown, Input, Placement } from '@distate/components';
import { getLegalEntityGroup } from '../../../../store/actions';

interface Props {
  id: number;
}

/** Фильтр для ЮЛ (еще не добавленных) */
export const LegalEntityFilter = (props: Props) => {
  const { id } = props;
  const dispatch = useDispatch();

  const [name, setName] = React.useState<string | undefined>();
  const [inn, setInn] = React.useState<string | undefined>();

  const onClearForm = () => {
    setName(undefined);
    setInn(undefined);
  };

  const onFilter = () => {
    const filterParams = {
      name,
      inn
    };
    dispatch(getLegalEntityGroup({ ...filterParams, id }));
  };

  return (
    <Dropdown
      widthRestrict
      placement={Placement.TOP}
      trigger={<Button icon={<Icons.IconSearch fill="currentColor" />}>Фильтрация</Button>}
    >
      <div className="contractor-dropdown-wrapper">
        <div className="dropdown-header">
          <span>Юридические лица</span>
        </div>
        <div>
          <Input
            label="Название"
            name="name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            value={name}
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
  );
};
