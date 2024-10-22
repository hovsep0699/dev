import React from 'react';
import { Modal } from '@distate/components';
import { createCompanyDivision } from '../../../store/actions';
import { DivisionForm } from '../DivisionForm';

type Props = {
  hide: () => void;
  isVisible: boolean;
};

/** модалка карточки создания подразделения */
export const ModalCreateDivision = (props: Props) => {
  const { isVisible, hide } = props;

  return (
    <Modal hide={() => hide()} isVisible={isVisible}>
      <Modal.Header title="Новое подразделение" />
      <Modal.Body>
        <DivisionForm onAction={createCompanyDivision} hide={hide} />
      </Modal.Body>
    </Modal>
  );
};
