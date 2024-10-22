import React from 'react';
import { Modal, Button, Icons } from '@distate/components';

import { ButtonCheck } from './check';
import { ButtonCancel } from './cancel';
import { TO_ARCHIVE } from '../../../../common/Lbl';

export interface IButtonArchiveProps {
  loading?: boolean;
  onClick: () => void;
}

const ButtonArchive: React.FC<IButtonArchiveProps> = ({ onClick }) => {
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
      <Button icon={<Icons.IconArchive />} onClick={handleOnClick}>
        {TO_ARCHIVE}
      </Button>

      <Modal hide={handleOnCancel} isVisible={visible}>
        <Modal.Header title={'Вы действительно хотите отправить документы в архив?'} />
        <Modal.Footer>
          <ButtonCheck onClick={handleOnCheck} />
          <ButtonCancel onClick={handleOnCancel} />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { ButtonArchive };
