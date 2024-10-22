import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Header from './ModalHeader';
import Body from './ModalBody';
import Footer from './ModalFooter';
import styles from './Modal.module.css';
import autobind from 'autobind-decorator';

class Modal extends Component {
  static Header = Header;
  static Body = Body;
  static Footer = Footer;

  @autobind
  triggerHide() {
    this.props.hide();
  }

  @autobind
  handleEscKeyDown(e) {
    if (e.key === 'Escape') {
      this.triggerHide();
    }
  }

  @autobind
  handleDimmerClick() {
    this.triggerHide();
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleEscKeyDown);
  }

  componentDidUpdate() {
    const body = document.querySelector('body');
    if (this.props.isVisible) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscKeyDown);
  }

  withProps(elements) {
    return React.Children.map(elements, modalSubElement => {
      if (modalSubElement.type === Modal.Header) {
        return (
          <modalSubElement.type {...modalSubElement.props} onClickCloseBtn={this.triggerHide} />
        );
      }
      return modalSubElement;
    });
  }

  render() {
    const modalWrapperClasses = classNames({
      popups: true,
      [styles.wrapper]: true,
      [styles.hidden]: !this.props.isVisible
    });
    const modalClasses = classNames(
      {
        popup: true,
        active: true,
        [styles.hidden]: !this.props.isVisible
      },
      this.props.className
    );
    const modalWidth = this.props.width ? { width: this.props.width } : {};
    const modalStyle = {
      ...modalWidth
    };
    const modal = (
      <div className={modalWrapperClasses} onClick={this.handleDimmerClick}>
        <div className={modalClasses} onClick={e => e.stopPropagation()} style={modalStyle}>
          {this.withProps(this.props.children)}
        </div>
      </div>
    );

    return ReactDOM.createPortal(modal, document.getElementById('modals'));
  }
}

Modal.defaultProps = {
  isVisible: true
};

Modal.propTypes = {
  hide: PropTypes.func.isRequired,
  isVisible: PropTypes.bool,
  width: PropTypes.string
};

export default Modal;
