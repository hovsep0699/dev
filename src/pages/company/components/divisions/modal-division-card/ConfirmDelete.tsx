import React from 'react';
import { Modal } from '@distate/components';
import { Button, ButtonKinds, Icons } from '@distate/components';

type Props = {
  hide: () => void;
  isVisible: boolean;
  onDelete: () => void;
};

/** подтверждение удаления*/
export const ConfirmDelete = (props: Props) => {
  const { isVisible, hide, onDelete } = props;

  return (
    <Modal hide={hide} isVisible={isVisible}>
      <Modal.Header title="Вы действительно хотите удалить подразделение?" />
      <Modal.Body>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            kind={ButtonKinds.Danger}
            onClick={onDelete}
            icon={<Icons.IconCheck fill="currentColor" />}
          >
            Удалить
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            onClick={hide}
            icon={<Icons.IconClose fill="currentColor" />}
          >
            Отмена
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
