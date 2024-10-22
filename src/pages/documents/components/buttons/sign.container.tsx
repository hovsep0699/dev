import React from 'react';
import { Modal, Button, Icons } from '@distate/components';

import { ButtonCheck } from './check';
import { ButtonCancel } from './cancel';
import { SEND_AS_CONTAINER } from '../../../../common/Lbl';

export interface ISignContainerProps {
  loading: boolean;
  onClick: () => void;
}

const ButtonSignContainer: React.FC<ISignContainerProps> = ({ loading, onClick }) => {
  const [visible, setVisible] = React.useState(false);

  const handleOnClick = () => {
    setVisible(true);
  };

  const handleOnCheck = () => {
    onClick();
    setVisible(false);
  };

  const handleOnCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button onClick={handleOnClick} icon={<Icons.IconShare fill="currentColor" />} busy={loading}>
        {SEND_AS_CONTAINER}
      </Button>

      <Modal hide={handleOnCancel} isVisible={visible}>
        <Modal.Header title={'Вы действительно хотите подписать и отправить документы пакетом?'} />
        <Modal.Footer>
          <ButtonCheck onClick={handleOnCheck} />
          <ButtonCancel onClick={handleOnCancel} />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { ButtonSignContainer };
