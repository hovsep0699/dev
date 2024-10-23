import React from 'react';
import { Modal, Button, Icons } from '@distate/components';

import { ButtonCheck } from './check';
import { ButtonCancel } from './cancel';
import { SIGN_AND_SEND } from '../../../../common/Lbl';

export interface ISignDocumentProps {
  loading: boolean;
  onClick: () => void;
}

const ButtonSignDocument: React.FC<ISignDocumentProps> = ({ loading, onClick }) => {
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
        {SIGN_AND_SEND}
      </Button>

      <Modal hide={handleOnCancel} isVisible={visible}>
        <Modal.Header title={'Вы действительно хотите подписать и отправить документы?'} />
        <Modal.Footer>
          <ButtonCheck onClick={handleOnCheck} />
          <ButtonCancel onClick={handleOnCancel} />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { ButtonSignDocument };
