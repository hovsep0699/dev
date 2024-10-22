import React from 'react';
import { Modal, Button, Icons, ButtonKinds } from '@distate/components';

type Props = {
  hide: () => void;
  isVisible: boolean;
  handleCheck: Function;
};

export const ConfirmationModal = (props: Props) => {
  const { hide, isVisible, handleCheck } = props;

  return (
    <Modal hide={hide} isVisible={isVisible}>
      <Modal.Header title={'Вы действительно хотите выбрать данный сертификат для подписания?'} />
      <Modal.Footer>
        <Button
          icon={<Icons.IconCheck fill="currentColor" />}
          kind={ButtonKinds.Primary}
          onClick={() => handleCheck()}
        >
          Выбрать
        </Button>
        <Button icon={<Icons.IconClose fill="currentColor" />} onClick={hide}>
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
