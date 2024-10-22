import React, { Component, useEffect } from 'react';
import { text } from '@storybook/addon-knobs';
import Modal from './Modal';
import Button, { ButtonKinds } from '../Button';
import { Box } from 'grommet';
import { IconCheck, IconClose } from '../../assets/icons';


type ModalWrapperProps = {
  children: any;
};

type ModalWrapperState = {
  isModalOpen: boolean;
};

 class ModalWrapper extends Component<ModalWrapperProps, ModalWrapperState> {
  constructor(props: ModalWrapperProps) {
    super(props);
    this.state = { isModalOpen: false };
    this.toggle = this.toggle.bind(this);
    this.hide = this.hide.bind(this);
  }

  toggle() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  hide() {
    this.setState({ isModalOpen: false });
  }

  render() {
    const modal = React.cloneElement(this.props.children, {
      hide: this.hide,
      isVisible: this.state.isModalOpen
    });

    return (
      <>
        <Box align="center" margin="xlarge">
          <Button onClick={this.toggle}>Toggle Modal</Button>
          {this.state.isModalOpen && modal}
        </Box>
      </>
    );
  }
}

export default {
  title: 'Modal',
  component: Modal,
 
};

 const TestModal = () => {
  const title = text('Title', 'Заголовок модального окна');
  const content = text('Content', 'Содержимое модального окна');

  useEffect(() => {
    const modalPortalTarget = document.createElement('div');
    modalPortalTarget.setAttribute('id', 'modals');
    document.body.appendChild(modalPortalTarget);
  });

  return (
    <>
      <ModalWrapper>
        <Modal hide={() => void 0}>
          <Modal.Header title={title} />
          <Modal.Body>{content}</Modal.Body>
          <Modal.Footer>
            <Button icon={<IconCheck fill="currentColor" />} kind={ButtonKinds.Primary}>
              Подтвердить
            </Button>
            <Button icon={<IconClose fill="currentColor" />}>Отмена</Button>
          </Modal.Footer>
        </Modal>
      </ModalWrapper>
    </>
  );
};
