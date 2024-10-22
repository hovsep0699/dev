import React from 'react';
import autobind from 'autobind-decorator';
import Flash from '../../common/flash/Flash';
import DiError from '@distate/core/dist/application/error/Error';
import { assert } from 'chai';
import { SERVER_500, SERVER_404, SERVER_405, SUCCESS_SAVE_FORM } from '../Lbl';

class FormBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isComplete: false,
      isFormSentSuccessfully: false,
      isBusy: false
    };
  }
  createForm() {
    throw new Error('Переопределите метод в подклассе');
  }
  @autobind
  checkCompleteness(formState, requiredFields) {
    const { values } = formState;
    const isComplete = requiredFields.every(field => !!values[field]);
    this.setState({ isComplete });
  }
  @autobind
  fieldValueIsNotChosenFromDropdown(field) {
    return typeof field === 'string';
  }
  @autobind
  submit(formData, errorCb) {
    this.setState({ isBusy: true });
    this.processFormData(formData)
      .then(data => this.makeSubmitRequest(data))
      .then(this.handleSubmitSuccess)
      .then(this.showSuccessMsg)
      .catch(error => this.handleSubmitError(errorCb)(error));
  }
  async processFormData(data) {
    return data;
  }
  makeSubmitRequest() {
    throw new Error('Необходимо переопределить метод в подклассах');
  }
  @autobind
  handleSubmitSuccess() {
    this.setState({ isFormSentSuccessfully: true, isBusy: false });
  }
  showSuccessMsg() {
    Flash.success(SUCCESS_SAVE_FORM);
  }
  @autobind
  handleSubmitError(errorCb = null) {
    return error => {
      assert.instanceOf(error, DiError);
      this.setState({ isFormSentSuccessfully: false, isBusy: false });
      if (error.jsError && error.jsError.response) {
        const status = error.jsError.response.status;
        switch (status) {
          case 400:
            this.showServerErrorsInForm(error.jsError.response.data, errorCb);
            break;
          case 404:
            Flash.error(SERVER_404);
            break;
          case 405:
            Flash.error(SERVER_405);
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
  }
  @autobind
  showServerErrorsInForm(data, errorCb = null) {
    if (data[0]) {
      Flash.error(data[0]);
    }

    if (errorCb) {
      Object.entries(data).forEach(([key, value]) => {
        const errorMsg = Array.isArray(value) ? value[0] : value;
        errorCb(key, errorMsg);
      });
    }
  }

  render() {
    return this.createForm();
  }
}

export default FormBase;
