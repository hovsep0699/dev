import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonKinds, Modal, Icons } from '@distate/components';

import { selectEmployeeResponsible } from '../../store/selectors';
import { changeEmployeeResponsible, resetEmployeePassword } from '../../store/actions';

type Props = {
  id: number;
};

/** Кнопки управления в карточке сотрудника */
export const EmployeeCardToolButtons = (props: Props) => {
  const { id } = props;
  const responsible = useSelector(selectEmployeeResponsible);
  const dispatch = useDispatch();

  const [isVisibleAlert, setIsVisibleAlert] = useState(false);

  /** изменение ответственности */
  const onChangeResponsible = () => {
    dispatch(changeEmployeeResponsible({ employeeId: id, responsible }));
  };

  /** открытие модалки для подтверждения сброса пароля */
  const onOpenAlert = () => {
    setIsVisibleAlert(true);
  };

  /** сброс пароля */
  const onResetPassword = () => {
    dispatch(resetEmployeePassword({ employeeId: id }));
    setIsVisibleAlert(false);
  };

  return (
    <>
      <div style={{ marginTop: 15 }}>
        <Button kind={ButtonKinds.Danger} onClick={onOpenAlert}>
          Сбросить пароль
        </Button>{' '}
        <Button kind={ButtonKinds.Secondary} onClick={onChangeResponsible}>
          {responsible ? 'Снять ответственность' : 'Назначить ответственным'}
        </Button>
      </div>

      <Modal hide={() => setIsVisibleAlert(false)} isVisible={isVisibleAlert} zIndex={1001}>
        <Modal.Header title="Вы действительно хотите сбросить пароль?" />
        <Modal.Body>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              icon={<Icons.IconCheck fill="currentColor" />}
              kind={ButtonKinds.Orange}
              onClick={onResetPassword}
              style={{ marginRight: 15 }}
            >
              Сбросить
            </Button>
            <Button
              icon={<Icons.IconClose fill="currentColor" />}
              onClick={() => setIsVisibleAlert(false)}
            >
              Отмена
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
