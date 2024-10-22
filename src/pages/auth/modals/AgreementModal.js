import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../common/modal/Modal';
import {
  CERT_SERIAL_NUM,
  CERT_THUMBPRINT,
  VALID_FROM,
  TO,
  TO_SIGN,
  CANCEL
} from '../../../common/Lbl';
import AgreeModal from '../../../common/modal/AgreeModal';

class AgreementModal extends AgreeModal {
  render() {
    return (
      <Modal hide={this.disagreeCallback}>
        <Modal.Header title={this.props.title} />
        <Modal.Body>
          <form>
            <ul>
              <br />
              <li>
                <span>{this.props.txt}</span>
              </li>
              <br />
              <li>
                <span>{CERT_SERIAL_NUM}: </span>
                <span>{this.props.certSerialNumber}</span>
              </li>
              <li>
                <span>{CERT_THUMBPRINT}: </span>
                <span>{this.props.certThumbprint}</span>
              </li>
              <li>
                <span>{VALID_FROM} </span>
                <span>{this.props.certValidFromDate}</span>
                <span> {TO} </span>
                <span>{this.props.certValidToDate}</span>
              </li>
              <br />
              <li>
                <label>
                  <span
                    className="ds-field-name width-square"
                    style={{ display: 'inline-block', width: '40px' }}
                  >
                    <label className="ds-checkbox">
                      <input
                        id="sendConfirmAgreement"
                        type="checkbox"
                        onClick={this.handleCheckbox}
                      />
                      <span />
                    </label>
                  </span>
                  <span
                    className="ds-field-value"
                    style={{
                      fontSize: '11px',
                      width: 'calc(100% - 62px)',
                      lineHeight: '15px',
                      display: 'inline-block',
                      padding: '6px 8px 10px 0'
                    }}
                  >
                    {this.props.checkboxTxt}
                  </span>
                </label>
              </li>
              <br />
            </ul>
          </form>
        </Modal.Body>
        {this.createModalFooter(TO_SIGN, CANCEL)}
      </Modal>
    );
  }
}

AgreementModal.propTypes = {
  title: PropTypes.string.isRequired,
  txt: PropTypes.string.isRequired,
  certSerialNumber: PropTypes.string.isRequired,
  certThumbprint: PropTypes.string.isRequired,
  certValidFromDate: PropTypes.string.isRequired,
  certValidToDate: PropTypes.string.isRequired,
  checkboxTxt: PropTypes.string.isRequired,
  agree: PropTypes.func.isRequired,
  disagree: PropTypes.func.isRequired,
  hide: PropTypes.func.isRequired
};

export default AgreementModal;
