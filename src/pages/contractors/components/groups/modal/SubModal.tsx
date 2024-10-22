import React from 'react';
import { Modal } from '@distate/components';

interface Props {
  isVisible: boolean;
  onHide: Function;
  render: any;
}

export const SubModal = (props: Props) => {
  const { isVisible, onHide, render } = props;
  return (
    <Modal hide={() => onHide()} isVisible={isVisible}>
      <Modal.Header title="Добавление элементов" />
      <Modal.Body>{render()}</Modal.Body>
    </Modal>
  );
};
