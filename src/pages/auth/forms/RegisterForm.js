import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Text } from 'informed';
import Core from '@distate/core/dist/application/Core';
import { capitalize } from '../../../utils/StringUtil';
import classNames from 'classnames';
import {
  validateOGRN,
  validateEmail,
  validateNewPassword,
  validateMatchPasswords,
  validatePosition,
  validateCaptcha,
  validateSurname,
  validateName
} from '../../../utils/ValidateUtil';
import Flash from '../../../common/flash/Flash';
import MessageSuccessRegistration from '../messages/MessageSuccessRegistration';
import styles from './RegisterForm.module.css';
import { AUTH_LOGIN, UPDATE_PNG } from '../../../common/Url';
import {
  GO_TO_LOGIN_FORM,
  REG,
  UPDATE_IMG,
  OGRN_OGRNIP,
  FIO,
  SURNAME,
  NAME,
  PATRONYMIC,
  EMAIL,
  PASSWORD,
  WORK_POSITION,
  IMG_CODE,
  ENTER_PASSWORD,
  REPEAT_PASSWORD,
  ENTER_OGRN,
  ENTER_EMAIL_FOR_NOTIFICATIONS,
  ENTER_WORK_POSITION,
  ENTER_IMG_CODE,
  SERVER_500
} from '../../../common/Lbl';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      captchaUrl: '',
      isOGRNInvalid: false,
      isEmailInvalid: false,
      isFIOInvalid: false,
      isPositionInvalid: false,
      isPasswordInvalid: false,
      isConfirmPasswordInvalid: false,
      isCaptchaInvalid: false,
      isInvalid: false,
      isComplete: false,
      isFormSentSuccessfully: false
    };
    this.refreshCaptcha = this.refreshCaptcha.bind(this);
    this.submit = this.submit.bind(this);
    this.setFormApi = this.setFormApi.bind(this);
    this.checkCompleteness = this.checkCompleteness.bind(this);
  }
  checkCompleteness() {
    const formState = this.formApi.getState();
    let formValues = { ...formState.values };
    const isComplete =
      formValues.ogrn &&
      formValues.email &&
      formValues.surname &&
      formValues.position &&
      formValues.password &&
      formValues.captcha;
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
    if (data.company) {
      invalidState.isOGRNInvalid = true;
      this.formApi.setError('ogrn', capitalize(data.company[0]));
    }
    if (data.email) {
      invalidState.isEmailInvalid = true;
      this.formApi.setError('email', capitalize(data.email[0]));
    }
    if (data.password) {
      invalidState.isPasswordInvalid = true;
      this.formApi.setError('password', capitalize(data.password[0]));
    }
    if (data.person) {
      invalidState.isFIOInvalid = true;
      if (data.person.surname) {
        this.formApi.setError('surname', capitalize(data.person.surname[0]));
      }
      if (data.person.name) {
        this.formApi.setError('name', capitalize(data.person.name[0]));
      }
      if (data.person.patronymic) {
        this.formApi.setError('patronymic', capitalize(data.person.patronymic[0]));
      }
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
      this.setState({ isFormSentSuccessfully: true });
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
    Core.register({
      ogrn: formState.values.ogrn,
      email: formState.values.email,
      surname: formState.values.surname,
      name: formState.values.name,
      patronymic: formState.values.patronymic,
      password: formState.values.password,
      position: formState.values.position,
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

    const inputOGRNClasses = classNames({
      'ds-input': true,
      error: this.state.isOGRNInvalid
    });

    const maskOGRN = value => {
      return value && value.replace(/\D/g, '').slice(0, 15);
    };

    const inputEmailClasses = classNames({
      'ds-input': true,
      error: this.state.isEmailInvalid
    });

    const inputFIOClasses = classNames({
      'ds-input-block-vertical': true,
      [styles.inputBlockError]: this.state.isFIOInvalid
    });

    const inputPositionClasses = classNames({
      'ds-input': true,
      error: this.state.isPositionInvalid
    });

    const inputPasswordClasses = classNames({
      'ds-input': true,
      error: this.state.isPasswordInvalid
    });

    const inputConfirmPasswordClasses = classNames({
      'ds-input': true,
      error: this.state.isConfirmPasswordInvalid
    });

    const inputCaptchaClasses = classNames({
      'ds-input': true,
      error: this.state.isCaptchaInvalid
    });

    return this.state.isFormSentSuccessfully ? (
      <React.Fragment>
        <MessageSuccessRegistration />
        <footer>
          <div className="ds-button-block width-fluid-full">
            <NavLink className="ds-button height-large width-fluid-full" to={AUTH_LOGIN}>
              {GO_TO_LOGIN_FORM}
            </NavLink>
          </div>
        </footer>
      </React.Fragment>
    ) : (
      <Form
        getApi={this.setFormApi}
        onChange={formState => {
          this.setState({
            isInvalid: formState.invalid,
            isOGRNInvalid: formState.errors.ogrn,
            isEmailInvalid: formState.errors.email,
            isFIOInvalid: formState.errors.surname || formState.errors.name,
            isPositionInvalid: formState.errors.position,
            isPasswordInvalid: formState.errors.password,
            isConfirmPasswordInvalid: formState.errors.confirmPassword,
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
                  <label htmlFor="registration_company" className="ds-field-name top">
                    <span>{OGRN_OGRNIP}</span>
                    <span className="right error">{formState.errors.ogrn}</span>
                  </label>
                  <Text
                    id="registration_company"
                    field="ogrn"
                    validate={validateOGRN}
                    validateOnChange
                    validateOnBlur
                    className={inputOGRNClasses}
                    type="text"
                    placeholder={ENTER_OGRN}
                    maintainCursor
                    mask={maskOGRN}
                    pattern="^([0-9]{13}|[0-9]{15})$"
                  />
                  <label htmlFor="registration_company" className="ds-field-name top error" />
                </div>
              </li>
              <li>
                <div className="group block">
                  <label htmlFor="registration_email" className="ds-field-name top">
                    <span>{EMAIL}</span>
                    <span className="right error">{formState.errors.email}</span>
                  </label>
                  <Text
                    id="registration_email"
                    field="email"
                    validate={validateEmail}
                    validateOnChange
                    validateOnBlur
                    className={inputEmailClasses}
                    type="email"
                    autoComplete="username email"
                    placeholder={ENTER_EMAIL_FOR_NOTIFICATIONS}
                  />
                  <label htmlFor="registration_email" className="ds-field-name top error" />
                </div>
              </li>
              <li>
                <div className="group block">
                  <label htmlFor="registration_surname" className="ds-field-name top">
                    <span>{FIO}</span>
                    <span className="right error">
                      {formState.errors.surname ||
                        formState.errors.name ||
                        formState.errors.patronymic}
                    </span>
                  </label>
                  <div className={inputFIOClasses}>
                    <Text
                      field="surname"
                      validate={validateSurname}
                      validateOnChange
                      validateOnBlur
                      notify={['name']}
                      className="ds-input"
                      type="text"
                      placeholder={SURNAME}
                    />
                    <Text
                      field="name"
                      validate={validateName}
                      validateOnChange
                      validateOnBlur
                      notify={['surname']}
                      className="ds-input"
                      type="text"
                      placeholder={NAME}
                    />
                    <Text
                      field="patronymic"
                      validateOnChange
                      validateOnBlur
                      notify={['surname']}
                      className="ds-input"
                      type="text"
                      placeholder={PATRONYMIC}
                    />
                  </div>
                  <label htmlFor="registration-surname" className="ds-field-name top error" />
                  <label htmlFor="registration-name" className="ds-field-name top error" />
                </div>
              </li>
              <li>
                <div className="group block">
                  <label htmlFor="registration_position" className="ds-field-name top">
                    <span>{WORK_POSITION}</span>
                    <span className="right error">{formState.errors.position}</span>
                  </label>
                  <Text
                    id="registration_position"
                    field="position"
                    validate={validatePosition}
                    validateOnChange
                    validateOnBlur
                    className={inputPositionClasses}
                    type="text"
                    placeholder={ENTER_WORK_POSITION}
                  />
                  <label htmlFor="registration_position" className="ds-field-name top error" />
                </div>
              </li>
              <li>
                <div className="group block">
                  <label htmlFor="registration_password" className="ds-field-name top">
                    <span>{PASSWORD}</span>
                    <span className="right error">{formState.errors.password}</span>
                  </label>
                  <Text
                    id="registration_password"
                    field="password"
                    validate={validateNewPassword}
                    validateOnChange
                    validateOnBlur
                    notify={['confirmPassword']}
                    className={inputPasswordClasses}
                    type="password"
                    placeholder={ENTER_PASSWORD}
                    autoComplete="new-password"
                  />
                  <label htmlFor="registration_position" className="ds-field-name top error" />
                </div>
              </li>
              <li>
                <div className="group block">
                  <label htmlFor="registration_password_repeat" className="ds-field-name top">
                    <span>{REPEAT_PASSWORD}</span>
                    <span className="right error">{formState.errors.confirmPassword}</span>
                  </label>
                  <Text
                    id="registration_password_repeat"
                    field="confirmPassword"
                    validate={validateMatchPasswords}
                    validateOnChange
                    validateOnBlur
                    notify={['password']}
                    className={inputConfirmPasswordClasses}
                    type="password"
                    autoComplete="new-password"
                    placeholder={REPEAT_PASSWORD}
                  />
                </div>
              </li>
              <li>
                <div className="group block">
                  <label htmlFor="captcha" className="ds-field-name top">
                    <span>{IMG_CODE}</span>
                    <span className="right error">{formState.errors.captcha}</span>
                  </label>
                  <Text
                    id="captcha"
                    field="captcha"
                    validate={validateCaptcha}
                    validateOnChange
                    validateOnBlur
                    className={inputCaptchaClasses}
                    type="text"
                    placeholder={ENTER_IMG_CODE}
                  />
                  <label htmlFor="registration_company" className="ds-field-name top error" />
                </div>
                <div className="captcha">
                  <img
                    id="registrationCatpcha"
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
              <div className="ds-button-block width-fluid-full">
                <button type="submit" className={submitBtnClasses} onClick={this.submit}>
                  {REG}
                </button>
                <NavLink className="ds-button height-large width-fluid-full" to={AUTH_LOGIN}>
                  {GO_TO_LOGIN_FORM}
                </NavLink>
              </div>
            </footer>
          </React.Fragment>
        )}
      </Form>
    );
  }
}

export default RegisterForm;
