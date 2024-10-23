import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '@distate/components';
import { Button, Icons, ButtonKinds } from '@distate/components';
import { deleteRole } from '../../../store/actions';

type Props = {
  hide: () => void;
  isVisible: boolean;
  id: number;
  roleCardHide: Function;
};

/** Подтверждение удаления роли */
export const DeletionConfirmation = (props: Props) => {
  const { isVisible, hide, id, roleCardHide } = props;

  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteRole({ groupId: id }));
    hide();
    roleCardHide();
  };

  return (
    <Modal hide={() => hide()} isVisible={isVisible} zIndex={1001}>
      <Modal.Header title="Вы действительно хотите удалить роль?" />

      <Modal.Body>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            icon={<Icons.IconCheck fill="currentColor" />}
            kind={ButtonKinds.Orange}
            onClick={onDelete}
            style={{ marginRight: 10 }}
          >
            Удалить
          </Button>
          <Button icon={<Icons.IconClose fill="currentColor" />} onClick={hide}>
            Отмена
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
