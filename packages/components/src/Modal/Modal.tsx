import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import { Overlay, Content } from './Modal.styles';

const ModalPropTypes = {
  hide: PropTypes.func.isRequired,
  isVisible: PropTypes.bool,
  width: PropTypes.string,
  zIndex: PropTypes.number
};

export type ModalProps = PropTypes.InferProps<typeof ModalPropTypes> & {
  children?: React.ReactNode;
};

type ModalState = {
  count: number;
};

class Modal extends Component<ModalProps, ModalState> {
  static Header = ModalHeader;
  static Body = ModalBody;
  static Footer = ModalFooter;
  static propTypes = ModalPropTypes;

  constructor(props: ModalProps) {
    super(props);

    this.triggerHide = this.triggerHide.bind(this);
    this.handleEscKeyDown = this.handleEscKeyDown.bind(this);
    this.handleDimmerClick = this.handleDimmerClick.bind(this);
  }

  triggerHide() {
    this.props.hide();
  }

  handleEscKeyDown(e: any) {
    if (e.key === 'Escape') {
      this.triggerHide();
    }
  }

  handleDimmerClick() {
    this.triggerHide();
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleEscKeyDown);
  }

  componentDidUpdate() {
    const { isVisible } = this.props;
    const body: HTMLBodyElement = document.querySelector('body');

    if (isVisible) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscKeyDown);
  }

  withProps(elements: any) {
    return React.Children.map(elements, modalChild => {
      if (modalChild.type === Modal.Header) {
        return <modalChild.type {...modalChild.props} onClickCloseBtn={this.triggerHide} />;
      }
      return modalChild;
    });
  }

  render() {
    const { width, isVisible, zIndex = 1000 } = this.props;

    const modal = (
      <Overlay onClick={this.handleDimmerClick} isVisible={isVisible} style={{ zIndex }}>
        <Content onClick={e => e.stopPropagation()} width={width}>
          {this.withProps(this.props.children)}
        </Content>
      </Overlay>
    );

    return ReactDOM.createPortal(modal, document.getElementById('modals') || document.body);
  }
}

export default Modal;
