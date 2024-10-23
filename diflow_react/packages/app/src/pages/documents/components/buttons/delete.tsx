import React from 'react';
import { Modal, Button, Icons, ButtonKinds } from '@distate/components';

import { ButtonCheck } from './check';
import { ButtonCancel } from './cancel';
import { DELETE } from '../../../../common/Lbl';

export interface IButtonDeleteProps {
  loading?: boolean;
  onClick: () => void;
}

const ButtonDelete: React.FC<IButtonDeleteProps> = ({ onClick }) => {
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
      <Button
        icon={<Icons.IconTrash fill="currentColor" />}
        kind={ButtonKinds.Danger}
        onClick={handleOnClick}
      >
        {DELETE}
      </Button>

      <Modal hide={handleOnCancel} isVisible={visible}>
        <Modal.Header title={'Вы действительно хотите удалить документы?'} />
        <Modal.Footer>
          <ButtonCheck onClick={handleOnCheck}>{DELETE}</ButtonCheck>
          <ButtonCancel onClick={handleOnCancel} />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { ButtonDelete };
