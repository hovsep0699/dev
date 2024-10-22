import React from 'react';
import autobind from 'autobind-decorator';
import { NavLink, Redirect } from 'react-router-dom';
import CertFormBase from './CertFormBase';
import { Form } from 'informed';
import AgreementModal from '../modals/AgreementModal';

import { CertificateService } from '@distate/core/dist/application/certificate/CertificateService';
import Core from '@distate/core/dist/application/Core';
import UserAgreement from '@distate/core/dist/domain/register/UserAgreement';
import Flash from '../../../common/flash/Flash';
import classNames from 'classnames';
import { ddmmyyyy_hhmmss } from '../../../utils/DateUtil';
import DiError from '@distate/core/dist/application/error/Error';
import { AUTH_CERT, DOCUMENT, COMPANY } from '../../../common/Url';
import { GO_TO_LOGIN_FORM, REG, SERVER_500 } from '../../../common/Lbl';
import MessageSuccessRegistration from '../messages/MessageSuccessRegistration';

class RegisterByCertForm extends CertFormBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      agreement: null,
      redirectToReferrer: false,
      isFormSentSuccessfully: false
    };
  }
  componentDidMount() {
    this._isMounted = true;
    document.addEventListener('keydown', this.handleEnterKeyDown);
    this.updateCertificates();
  }
  @autobind
  handleEnterKeyDown(e) {
    if (e.key === 'Enter') {
      this.submit();
    }
  }
  @autobind
  updateCertificates() {
    if (!this.state.isLoading) {
      this.setState({ isLoading: true });
    }
    CertificateService.getRegisterCertificates()
      .then(this.handleCertsFromService)
      .catch(error => {
        this.handlePluginError(error);
      });
  }
  @autobind
  handleError(error) {
    if (error instanceof DiError) {
      this.setState({ isLoading: false });
      if (error.jsError && error.jsError.response) {
        const status = error.jsError.response.status;
        switch (status) {
          case 400:
            Flash.error(error);
            break;
          case 500:
            Flash.error(SERVER_500);
            break;
          default:
            throw new Error(`Не обрабатывается статус ${status}`);
        }
      } else {
        Flash.error(error);
      }
    }
    if (error.message) {
      this.setState({ errorMsg: error.message, isLoading: false });
    }
  }
  @autobind
  agreeCallback() {
    this.resetCertificates();

    const successAutoAuth = isNaturalCreated => loginResult => {
      if (loginResult.success) {
        return Core.init().then(() => {
          const redirectUrl = isNaturalCreated ? DOCUMENT : COMPANY;
          this.setState({ redirectToReferrer: true, redirectUrl });
        });
      }
    };

    const failAutoAuth = error => {
      Flash.error(error);
    };

    const isForceActivation = this.state.agreement.register_force_activation;

    return this.state.agreement
      .agree()
      .then(res => {
        if (isForceActivation) {
          Core.auth({ certificate: this.state.selectedCertificate })
            .then(successAutoAuth(res.isNaturalCreated))
            .catch(failAutoAuth);
        } else {
          this.setState({ isFormSentSuccessfully: true });
        }
      })
      .catch(this.handleError);
  }
  @autobind
  disagreeCallback() {
    this.state.agreement.disagree().catch(error => {
      console.log(error);
    });
  }
  @autobind
  submit() {
    const handleSuccess = registerResult => {
      if (registerResult instanceof UserAgreement) {
        this.setState({
          agreement: {
            ...registerResult.parameters,
            agree: registerResult.agree,
            disagree: registerResult.disagree,
            certificate: this.state.selectedCertificate
          }
        });
      }
    };
    Core.register({ certificate: this.state.selectedCertificate })
      .then(handleSuccess)
      .catch(this.handleError);
  }
  @autobind
  setFormApi(formApi) {
    this.formApi = formApi;
  }
  @autobind
  resolveEnterHandlersConflicts() {
    if (this.state.agreement === null) {
      document.addEventListener('keydown', this.handleEnterKeyDown);
    } else {
      document.removeEventListener('keydown', this.handleEnterKeyDown);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState === this.state) {
      return;
    }
    this.resolveEnterHandlersConflicts();
  }
  componentWillUnmount() {
    super.componentWillUnmount();
    document.removeEventListener('keydown', this.handleEnterKeyDown);
  }
  render() {
    if (this.state.redirectToReferrer) {
      return <Redirect to={this.state.redirectUrl} />;
    }

    const overriddenSubmitBtnClasses = classNames(
      { disabled: !this.state.certificates.length },
      this.submitBtnClasses
    );

    return this.state.isFormSentSuccessfully ? (
      <React.Fragment>
        <MessageSuccessRegistration />
        <footer>
          <div className="ds-button-block width-fluid-full">
            <NavLink className="ds-button height-large width-fluid-full" to={AUTH_CERT}>
              {GO_TO_LOGIN_FORM}
            </NavLink>
          </div>
        </footer>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <div className="tabcontent active" id="registerCertificate">
          <Form id="login-certificate-form" getApi={this.setFormApi} onSubmit={this.submit}>
            {this.renderCertificates()}

            <input name="signed_data" type="hidden" data-bind="value: signedData" value="" />
            <footer>
              <div className="ds-button-block width-fluid-full">
                <input
                  className={overriddenSubmitBtnClasses}
                  type="submit"
                  value={REG}
                  tabIndex={2}
                />
                <NavLink
                  className="ds-button height-large width-fluid-full"
                  to={AUTH_CERT}
                  tabIndex={3}
                >
                  {GO_TO_LOGIN_FORM}
                </NavLink>
              </div>
            </footer>
          </Form>
        </div>
        {this.state.agreement && (
          <AgreementModal
            agree={this.agreeCallback}
            disagree={this.disagreeCallback}
            hide={() => {
              this.setState({ agreement: null });
            }}
            certSerialNumber={this.state.agreement.certificate.serialNumber}
            certThumbprint={this.state.agreement.certificate.thumbprint}
            certValidFromDate={ddmmyyyy_hhmmss(this.state.agreement.certificate.validFrom)}
            certValidToDate={ddmmyyyy_hhmmss(this.state.agreement.certificate.validTo)}
            checkboxTxt={this.state.agreement.register_checkbox}
            title={this.state.agreement.register_title}
            txt={this.state.agreement.register_text}
          />
        )}
      </React.Fragment>
    );
  }
}

export default RegisterByCertForm;
