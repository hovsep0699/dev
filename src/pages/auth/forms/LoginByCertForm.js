import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import CertFormBase from './CertFormBase';
import { Form } from 'informed';
import Core from '@distate/core/dist/application/Core';
import { CertificateService as CertService } from '@distate/core/dist/application/certificate/CertificateService';
import classNames from 'classnames';
import Flash from '../../../common/flash/Flash';
import { COMPANY, DOCUMENT, REG_CERT } from '../../../common/Url';
import { ENTER, GO_TO_REG_FORM } from '../../../common/Lbl';
import NoRegisteredCert from '../components/certificate/NoRegisteredCert';
import autobind from 'autobind-decorator';

class LoginByCertForm extends CertFormBase {
  constructor(props) {
    super(props);
    this.state = { ...this.state, redirectToReferrer: false };
    this.submit = this.submit.bind(this);
    this.setFormApi = this.setFormApi.bind(this);
    this.handleEnterKeyDown = this.handleEnterKeyDown.bind(this);
  }
  componentDidMount() {
    this._isMounted = true;
    document.addEventListener('keydown', this.handleEnterKeyDown);

    CertService.getLoginCertificates()
      .then(this.handleCertsFromService)
      .catch(error => {
        this.handlePluginError(error);
      });
  }
  handleEnterKeyDown(e) {
    if (e.key === 'Enter') {
      this.submit();
    }
  }
  @autobind
  renderNoCert() {
    return <NoRegisteredCert />;
  }
  submit() {
    if (!this.state.certificates.length) return;

    const handleSuccess = loginResult => {
      if (loginResult.success) {
        this.setState({ redirectToReferrer: true });
      }
    };
    const handleError = error => {
      Flash.error(error);
    };
    Core.auth({ certificate: this.state.selectedCertificate })
      .then(handleSuccess)
      .catch(handleError);
  }
  setFormApi(formApi) {
    this.formApi = formApi;
  }
  componentWillUnmount() {
    super.componentWillUnmount();
    document.removeEventListener('keydown', this.handleEnterKeyDown);
  }
  render() {
    if (this.state.redirectToReferrer) {
      const isPhysic = !Core.company;
      if (isPhysic || Core.company.isComplete) {
        return <Redirect to={DOCUMENT} />;
      } else {
        return <Redirect to={COMPANY} />;
      }
    }

    const overriddenSubmitBtnClasses = classNames(
      { disabled: !this.state.certificates.length },
      this.submitBtnClasses
    );
    return (
      <div className="tabcontent active" id="loginCertificate">
        <Form id="login-certificate-form" getApi={this.setFormApi} onSubmit={this.submit}>
          {this.renderCertificates()}

          <input name="signed_data" type="hidden" data-bind="value: signedData" value="" />
          <footer>
            <div className="ds-button-block width-fluid-full">
              <input
                className={overriddenSubmitBtnClasses}
                type="submit"
                value={ENTER}
                tabIndex={2}
              />
              <NavLink
                className="ds-button height-large width-fluid-full"
                to={REG_CERT}
                tabIndex={3}
              >
                {GO_TO_REG_FORM}
              </NavLink>
            </div>
          </footer>
        </Form>
      </div>
    );
  }
}

export default LoginByCertForm;
