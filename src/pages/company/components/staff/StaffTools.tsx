import React, { useState } from 'react';
import { Button, ButtonKinds, Icons, Dropdown, Input, Select } from '@distate/components';
import { useDispatch } from 'react-redux';
import { getStaff, getStaffWaiting, getStaffDeactivated } from '../../store/actions';

type Props = {
  id: number;
  limit: number;
  statusSystemName?: string;
  hasStatus?: boolean;
};
export const StaffTools = (props: Props) => {
  const { id, limit, statusSystemName, hasStatus } = props;

  const [surname, setSurname] = useState<string>();
  const [name, setName] = useState<string>();
  const [patronymic, setPatronymic] = useState<string>();
  const [position, setPosition] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [status, setStatus] = useState<HTMLSelectElement>();

  /** опции для селекта Статусов */
  const statusOptions = [
    { label: 'Активирован', value: 'active' },
    { label: 'Деактивирован', value: 'inactive' },
    { label: 'Ожидает активации', value: 'waiting_for_approval' }
  ];

  const dispatch = useDispatch();

  /** очистка формы */
  const onClearForm = () => {
    setSurname(undefined);
    setName(undefined);
    setPatronymic(undefined);
    setPosition(undefined);
    setEmail(undefined);
    setStatus(undefined);
  };

  /** обработка нажания на кнопку Фильтровать */
  const onFilter = async () => {
    const params = {
      surname,
      name,
      patronymic,
      position,
      email,
      statusSystemName: statusSystemName || status?.value,
      limit
    };

    /** диспатч в зависимости от того, кто вызывает поиск - пропс statusSystemName */
    switch (statusSystemName) {
      /** Отключенные */
      case 'inactive':
        dispatch(getStaffDeactivated({ id, params }));
        break;
      /** Заявки на активацию */
      case 'waiting_for_approval':
        dispatch(getStaffWaiting({ id, params }));
        break;
      /** Сотрудники */
      default:
        dispatch(getStaff({ id, params }));
    }
  };

  return (
    <div className="dropdown-menu group" style={{ marginBottom: 15 }}>
      <Dropdown
        width="300px"
        widthRestrict
        trigger={<Button icon={<Icons.IconSearch fill="currentColor" />}>Поиск сотрудника</Button>}
      >
        <div className="document-dropdown-wrapper">
          <div className="dropdown-header">
            <span>Поиск по сотрудникам</span>
          </div>
          <div>
            <Input
              label="Фамилия"
              name="surname"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSurname(e.target.value)}
              value={surname}
            />
            <Input
              label="Имя"
              name="name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              value={name}
            />
            <Input
              label="Отчество"
              name="patronymic"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPatronymic(e.target.value)}
              value={patronymic}
            />
            <Input
              label="Должность"
              name="position"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPosition(e.target.value)}
              value={position}
            />
            <Input
              label="E-mail"
              name="email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              value={email}
            />

            {hasStatus && (
              <Select
                value={status}
                label="Статус сотрудника"
                name="status"
                options={statusOptions}
                onChange={(e: HTMLSelectElement) => setStatus(e)}
                placeholder=""
              />
            )}
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
              Искать
            </Button>
          </div>
        </div>
      </Dropdown>
    </div>
  );
};
