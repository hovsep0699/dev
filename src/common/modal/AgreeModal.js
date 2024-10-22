import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import Modal from './Modal';
import classNames from 'classnames';

class AgreeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAgree: false
    };
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleEnterKeyDown);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEnterKeyDown);
  }
  @autobind
  handleEnterKeyDown(e) {
    if (e.key === 'Enter') {
      this.agreeCallback();
    }
  }
  @autobind
  agreeCallback() {
    if (this.state.isAgree) {
      this.props.agree();
      this.props.hide();
    }
  }
  @autobind
  disagreeCallback() {
    this.props.disagree();
    this.props.hide();
  }
  @autobind
  handleCheckbox() {
    this.setState({ isAgree: !this.state.isAgree });
  }
  createModalFooter(agreeBtnLbl, disagreeBtnLbl) {
    const submitBtnClasses = classNames({
      'button-accept': true,
      'ds-button': true,
      'color-primary': true,
      'icon-accept': true,
      disabled: !this.state.isAgree
    });
    return (
      <Modal.Footer>
        <button type="button" className={submitBtnClasses} onClick={this.agreeCallback}>
          {agreeBtnLbl}
        </button>
        <button
          type="button"
          className="button-cancel ds-button icon-close"
          onClick={this.disagreeCallback}
        >
          {disagreeBtnLbl}
        </button>
      </Modal.Footer>
    );
  }
}

AgreeModal.propTypes = {
  agree: PropTypes.func.isRequired,
  disagree: PropTypes.func.isRequired,
  hide: PropTypes.func.isRequired
};

export default AgreeModal;
