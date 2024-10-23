import React, { Component } from 'react';
import { Form, Text } from 'informed';
import classNames from 'classnames';
import Core from '@distate/core/dist/application/Core';
import { validateEmail, validateCaptcha } from '../../../utils/ValidateUtil';
import { capitalize } from '../../../utils/StringUtil';
import Flash from '../../../common/flash/Flash';
import { UPDATE_PNG } from '../../../common/Url';
import {
  UPDATE_IMG,
  ENTER_EMAIL_FOR_PASSWORD_RECOVERY,
  ENTER_IMG_CODE,
  SEND,
  IMG_CODE,
  SERVER_500,
  SUCCESS_RECOVER_PASSWORD
} from '../../../common/Lbl';

class RemindPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      captchaUrl: '',
      isEmailInvalid: false,
      isCaptchaInvalid: false,
      isInvalid: false,
      isComplete: false
    };
    this.refreshCaptcha = this.refreshCaptcha.bind(this);
    this.submit = this.submit.bind(this);
    this.setFormApi = this.setFormApi.bind(this);
    this.checkCompleteness = this.checkCompleteness.bind(this);
  }
  checkCompleteness() {
    const formState = this.formApi.getState();
    let formValues = { ...formState.values };
    const isComplete = formValues.email && formValues.captcha;
    this.setState({ isComplete: !!isComplete });
  }
  refreshCaptcha() {
    const captchaUrl = `/front/captcha?${new Date().getTime()}`;
    this.setState({ captchaUrl });
    return captchaUrl;
  }
  showServerErrorsInForm(data) {
    if (data[0]) {
      Flash.error(data[0]);
    }
    const invalidState = {};
    if (data.email) {
      invalidState.isEmailInvalid = true;
      this.formApi.setError('email', capitalize(data.email[0]));
    }
    if (data.captcha) {
      invalidState.isCaptchaInvalid = true;
      this.formApi.setError('captcha', capitalize(data.captcha[0]));
    }
    this.setState({ ...invalidState });
  }
  submit() {
    const formState = this.formApi.getState();
    this.checkCompleteness();
    if (formState.invalid || !this.state.isComplete) return;

    const handleSuccess = () => {
      Flash.success(SUCCESS_RECOVER_PASSWORD);
    };
    const handleError = error => {
      if (error.jsError && error.jsError.response) {
        const status = error.jsError.response.status;
        switch (status) {
          case 400:
            this.showServerErrorsInForm(error.jsError.response.data);
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
    };
    Core.recover({
      email: formState.values.email,
      captcha: formState.values.captcha
    })
      .then(handleSuccess)
      .catch(handleError);
  }
  setFormApi(formApi) {
    this.formApi = formApi;
  }
  componentDidMount() {
    this.refreshCaptcha();
  }
  render() {
    const submitBtnClasses = classNames({
      'ds-button': true,
      'height-large': true,
      'color-primary': true,
      'width-fluid-full': true
    });

    const inputEmailClasses = classNames({
      'ds-input': true,
      error: this.state.isEmailInvalid
    });

    const inputCaptchaClasses = classNames({
      'ds-input': true,
      error: this.state.isCaptchaInvalid
    });

    return (
      <Form
        getApi={this.setFormApi}
        onChange={formState => {
          this.setState({
            isInvalid: formState.invalid,
            isEmailInvalid: formState.errors.email,
            isCaptchaInvalid: formState.errors.captcha
          });
          this.checkCompleteness();
        }}
      >
        {({ formState }) => (
          <React.Fragment>
            <ul className="form text-center">
              <li>
                <div className="group block">
                  <label htmlFor="passwordRemind_email" className="ds-field-name top">
                    <span>Email</span>
                    <span className="right error">{formState.errors.email}</span>
                  </label>
                  <Text
                    id="passwordRemind_email"
                    field="email"
                    validate={validateEmail}
                    validateOnChange
                    validateOnBlur
                    className={inputEmailClasses}
                    type="email"
                    placeholder={ENTER_EMAIL_FOR_PASSWORD_RECOVERY}
                  />
                  <label htmlFor="passwordRemind_email" className="ds-field-name top error" />
                </div>
              </li>
              <li>
                <div className="group block">
                  <label htmlFor="remindPasswordCaptcha" className="ds-field-name top">
                    <span>{IMG_CODE}</span>
                    <span className="right error">{formState.errors.captcha}</span>
                  </label>
                  <Text
                    id="remindPasswordCaptcha"
                    field="captcha"
                    validate={validateCaptcha}
                    validateOnChange
                    validateOnBlur
                    className={inputCaptchaClasses}
                    type="text"
                    placeholder={ENTER_IMG_CODE}
                  />
                  <label htmlFor="remindPasswordCaptcha" className="ds-field-name top error" />
                </div>
                <div className="captcha">
                  <img
                    id="remindPasswordCatpcha"
                    className="pointer"
                    src={this.state.captchaUrl}
                    alt=""
                    onClick={this.refreshCaptcha}
                  />
                  <img
                    className="refresh"
                    src={UPDATE_PNG}
                    alt={UPDATE_IMG}
                    onClick={this.refreshCaptcha}
                  />
                </div>
              </li>
            </ul>
            <footer>
              <button type="submit" className={submitBtnClasses} onClick={this.submit}>
                {SEND}
              </button>
            </footer>
          </React.Fragment>
        )}
      </Form>
    );
  }
}

export default RemindPasswordForm;
