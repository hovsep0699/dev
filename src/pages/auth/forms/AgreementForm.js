import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class AgreementForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAgree: false
    };
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.agree = this.agree.bind(this);
    this.close = this.close.bind(this);
  }
  agree() {
    if (!this.state.isAgree) return;
    this.props.agree();
  }
  close() {
    console.log('close');
  }
  handleCheckbox() {
    this.setState({ isAgree: !this.state.isAgree });
  }
  render() {
    const submitBtnClasses = classNames({
      'button-accept': true,
      'ds-button': true,
      'color-primary': true,
      'icon-accept': true,
      disabled: !this.state.isAgree
    });
    return (
      <React.Fragment>
        <form>
          <ul>
            <br />
            <li>
              <h2>{this.props.title}</h2>
            </li>
            <br />
            <li>
              <span>{this.props.txt}</span>
            </li>
            <br />
            <li>
              <span>Серийный номер сертификата: </span>
              <span>{this.props.certSerialNumber}</span>
            </li>
            <li>
              <span>Отпечаток сертификата: </span>
              <span>{this.props.certThumbprint}</span>
            </li>
            <li>
              <span>Действителен с </span>
              <span>{this.props.certValidFromDate}</span>
              <span> по </span>
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

        <footer className="text-center">
          <button type="button" className={submitBtnClasses} onClick={this.agree}>
            Подписать
          </button>
          <button type="button" className="button-cancel ds-button icon-close" onClick={this.close}>
            Отмена
          </button>
        </footer>
      </React.Fragment>
    );
  }
}

AgreementForm.propTypes = {
  title: PropTypes.string.isRequired,
  txt: PropTypes.string.isRequired,
  certSerialNumber: PropTypes.string.isRequired,
  certThumbprint: PropTypes.string.isRequired,
  certValidFromDate: PropTypes.string.isRequired,
  certValidToDate: PropTypes.string.isRequired,
  checkboxTxt: PropTypes.string.isRequired,
  agree: PropTypes.func.isRequired
};

export default AgreementForm;
