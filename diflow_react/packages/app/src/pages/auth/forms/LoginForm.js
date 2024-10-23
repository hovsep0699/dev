import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Text } from 'informed';
import Core from '@distate/core/dist/application/Core';
import classNames from 'classnames';
import { validateEmail, validatePassword } from '../../../utils/ValidateUtil';
import Flash from '../../../common/flash/Flash';
import { REG_LOGIN, REMIND_PASSWORD } from '../../../common/Url';
import {
  EMAIL,
  ENTER,
  ENTER_EMAIL,
  ENTER_PASSWORD,
  GO_TO_REG_FORM,
  PASSWORD,
  RESTORE_PASSWORD,
  SERVER_500
} from '../../../common/Lbl';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmailInvalid: false,
      isPasswordInvalid: false,
      isInvalid: false,
      isComplete: false,
      redirectToReferrer: false
    };
    this.submit = this.submit.bind(this);
    this.setFormApi = this.setFormApi.bind(this);
    this.checkCompleteness = this.checkCompleteness.bind(this);
  }
  checkCompleteness() {
    const formState = this.formApi.getState();
    let formValues = { ...formState.values };
    const isComplete = formValues.email && formValues.password;
    this.setState({ isComplete: !!isComplete });
  }

  showServerErrorsInForm(data) {
    if (data[0]) {
      Flash.error(data[0]);
    }
    const invalidState = {};
    if (data.messages && data.messages[0]) {
      invalidState.isEmailInvalid = true;
      Flash.error(data.messages[0]);
    }
    if (data.messages && data.messages.login) {
      invalidState.isEmailInvalid = true;
      Flash.error(data.messages.login[0]);
    }
    this.setState({ ...invalidState });
  }

  submit() {
    const formState = this.formApi.getState();
    this.checkCompleteness();
    if (formState.invalid || !this.state.isComplete) return;

    const handleSuccess = loginResult => {
      if (loginResult.success) {
        this.setState({ redirectToReferrer: true });
      }
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
    Core.auth({
      email: formState.values.email,
      password: formState.values.password
    })
      .then(handleSuccess)
      .catch(handleError);
  }
  setFormApi(formApi) {
    this.formApi = formApi;
  }
  render() {
    if (this.state.redirectToReferrer) {
      // return <Redirect to="/" />;
      // TODO выяснить, почему строка выше работает в distate версии, а в текторге вдруг перестала
      window.location = '/';
      return;
    }

    const submitBtnClasses = classNames({
      'ds-button': true,
      'color-primary': true,
      'height-large': true,
      'width-fluid-full': true
    });

    const inputEmailClasses = classNames({
      'ds-input': true,
      error: this.state.isEmailInvalid
    });

    const inputPasswordClasses = classNames({
      'ds-input': true,
      error: this.state.isPasswordInvalid
    });

    return (
      <Form
        getApi={this.setFormApi}
        onChange={formState => {
          this.setState({
            isEmailInvalid: formState.errors.email,
            isPasswordInvalid: formState.errors.password,
            isInvalid: formState.invalid
          });
          this.checkCompleteness();
        }}
      >
        {({ formState }) => (
          <React.Fragment>
            <ul className="form text-center">
              <li>
                <div className="group block">
                  <label htmlFor="login_email" className="ds-field-name top">
                    <span>{EMAIL}</span>
                    <span className="right error">{formState.errors.email}</span>
                  </label>
                  <Text
                    id="login_email"
                    field="email"
                    placeholder={ENTER_EMAIL}
                    validate={validateEmail}
                    validateOnChange
                    validateOnBlur
                    className={inputEmailClasses}
                    autoComplete="off"
                    title={ENTER_EMAIL}
                  />
                  <label className="ds-field-name top error" data-bind="text: errors.login" />
                </div>
              </li>
              <li>
                <div className="group block">
                  <label htmlFor="login_password" className="ds-field-name top">
                    <span>{PASSWORD}</span>
                    <span className="right error">{formState.errors.password}</span>
                  </label>
                  <Text
                    id="login_password"
                    field="password"
                    className={inputPasswordClasses}
                    type="password"
                    placeholder={ENTER_PASSWORD}
                    validate={validatePassword}
                    validateOnChange
                    validateOnBlur
                    autoComplete="off"
                  />
                </div>
              </li>
              <li>
                <div className="group width-fixed-full block text-center">
                  <NavLink className="link" to={REMIND_PASSWORD}>
                    {RESTORE_PASSWORD}
                  </NavLink>
                </div>
              </li>
            </ul>
            <footer>
              <div className="ds-button-block width-fluid-full">
                <button type="submit" className={submitBtnClasses} onClick={this.submit}>
                  {ENTER}
                </button>
                <NavLink className="ds-button height-large width-fluid-full" to={REG_LOGIN}>
                  {GO_TO_REG_FORM}
                </NavLink>
              </div>
            </footer>
          </React.Fragment>
        )}
      </Form>
    );
  }
}

export default LoginForm;
