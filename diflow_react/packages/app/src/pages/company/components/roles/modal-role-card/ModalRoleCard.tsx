import React from 'react';
import { Modal } from '@distate/components';
import { StaffRole } from './StaffRole';
import { DocumentFlow } from './DocumentFlow';

type Props = {
  hide: () => void;
  isVisible: boolean;
  currentRole: {
    title: string;
    id: number;
  };
};

/** модалка карточки роли */
export const ModalRoleCard = (props: Props) => {
  const { isVisible, hide, currentRole } = props;
  const { title, id } = currentRole;

  return (
    <Modal hide={() => hide()} isVisible={isVisible}>
      <Modal.Header title={'Роль ' + title} />

      <Modal.Body>
        <StaffRole id={id} />
        <DocumentFlow id={id} roleCardHide={hide} />
      </Modal.Body>
    </Modal>
  );
};
