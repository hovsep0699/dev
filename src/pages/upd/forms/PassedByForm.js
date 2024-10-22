import React, { Component } from 'react';
import Button, { PRIMARY } from '../../../common/Button';
import { ICON } from '@distate/components';
import Modal from '../../../common/modal/Modal';
import autobind from 'autobind-decorator';
import { CLEAR, SAVE, CHANGE } from '../../../common/Lbl';
import classNames from 'classnames';
import style from '../../../common/form/documents/DocumentFormBuilder.module.css';
import get from 'get-value';
import set from 'set-value';
import deepmerge from 'deepmerge';
import Text from '../../../common/form/components/Text';
import RadioField from '../../../common/form/components/radio/RadioField';
import Employee from '@distate/core/dist/domain/documents/upd/vo/transfer/passedBy/type/Employee';
import Assignee from '@distate/core/dist/domain/documents/upd/vo/transfer/passedBy/type/Assignee';
import FL from '@distate/core/dist/domain/documents/upd/vo/transfer/passedBy/type/FL';
import { TOP } from '../../../common/Placement';
import PassedBy from '@distate/core/dist/domain/documents/upd/vo/transfer/passedBy/PassedBy';
import FIO from '@distate/core/dist/domain/documents/upd/standard_element/fio/FIO';
import Surname from '@distate/core/dist/domain/documents/upd/standard_element/fio/Surname';
import Name from '@distate/core/dist/domain/documents/upd/standard_element/fio/Name';
import Position from '@distate/core/dist/domain/documents/upd/vo/transfer/passedBy/Position';
import CompanyName from '@distate/core/dist/domain/documents/upd/vo/transfer/passedBy/CompanyName';
import Information from '@distate/core/dist/domain/documents/upd/vo/transfer/passedBy/Information';
import ShipmentBasis from '@distate/core/dist/domain/documents/upd/vo/transfer/passedBy/ShipmentBasis';
import AssigneeBasis from '@distate/core/dist/domain/documents/upd/vo/transfer/passedBy/AssigneeBasis';
import Type from '@distate/core/dist/domain/documents/upd/vo/transfer/passedBy/Type';
import Patronymic from '@distate/core/dist/domain/documents/upd/standard_element/fio/Patronymic';
import { combineMerge } from '../../../utils/ObjectUtil';

class PassedByForm extends Component {
  constructor(props) {
    super(props);
    this.formScope = PassedBy.field;
    this.initialFieldsValues = {
      [AssigneeBasis.field]: 'Должностные обязанности'
    };
    this.state = {
      isShowModal: false,
      fieldsValues: { ...this.initialFieldsValues },
      radioValue: Employee.value,
      chosenData: ''
    };
    this.errors = this.props.errors || {};
    this.requiredFields = [
      `${FIO.field}.${Surname.field}`,
      `${FIO.field}.${Name.field}`,
      Position.field,
      CompanyName.field
    ];
    this.assigneeShowFields = [
      `${FIO.field}.${Surname.field}`,
      `${FIO.field}.${Name.field}`,
      `${FIO.field}.${Patronymic.field}`,
      Position.field,
      Information.field,
      CompanyName.field,
      ShipmentBasis.field,
      AssigneeBasis.field
    ];
    this.employeeShowFields = [
      `${FIO.field}.${Surname.field}`,
      `${FIO.field}.${Name.field}`,
      `${FIO.field}.${Patronymic.field}`,
      Position.field,
      Information.field,
      AssigneeBasis.field
    ];
    this.FLShowFields = [
      `${FIO.field}.${Surname.field}`,
      `${FIO.field}.${Name.field}`,
      `${FIO.field}.${Patronymic.field}`,
      Information.field,
      ShipmentBasis.field
    ];
  }
  componentDidMount() {
    this.setInitialValues();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      get(prevProps, `errors.${this.formScope}`) !== get(this.props, `errors.${this.formScope}`)
    ) {
      this.updateServerErrors();
    }
  }
  updateServerErrors() {
    let serverErrors = get(this.props, 'errors');
    this.errors = deepmerge(this.errors, serverErrors, {
      arrayMerge: combineMerge
    });
  }
  setInitialValues() {
    const initialValues = get(this.props, `initialValues.${this.formScope}`);
    if (!initialValues) return;
    this.setState(
      {
        fieldsValues: deepmerge(this.initialFieldsValues, initialValues),
        radioValue: initialValues[Type.field]
      },
      () => {
        const surname = get(this.state.fieldsValues, `${FIO.field}.${Surname.field}`);
        const name = get(this.state.fieldsValues, `${FIO.field}.${Name.field}`);
        const chosenData = `${surname} ${name}`;
        this.saveData();
        if (this.hasAllRequiredFields()) {
          this.setState({ chosenData });
        }
      }
    );
  }
  getFormattedFieldsData() {
    const fieldsValues = { ...this.state.fieldsValues };
    const formattedFields = {};
    formattedFields[Type.field] = this.state.radioValue;
    const fieldsList = this.getFieldsList();
    fieldsList.forEach(fieldName => {
      const value = get(fieldsValues, fieldName);
      set(formattedFields, fieldName, value);
    });
    return { [this.formScope]: formattedFields };
  }
  @autobind
  showModal() {
    this.setState({ isShowModal: true });
  }
  @autobind
  hideModal() {
    this.setState({ isShowModal: false });
  }
  getFieldsList() {
    const radioValue = this.state.radioValue;
    if (radioValue === Assignee.value) {
      return this.assigneeShowFields;
    }
    if (radioValue === Employee.value) {
      return this.employeeShowFields;
    }
    if (radioValue === FL.value) {
      return this.FLShowFields;
    }
    return [];
  }
  @autobind
  isShowField(DomainVO, scope) {
    const fieldsList = this.getFieldsList();
    const fieldName = scope ? `${scope}.${DomainVO.field}` : DomainVO.field;
    return fieldsList.includes(fieldName);
  }
  @autobind
  handleRadioChange(value) {
    this.setState({ radioValue: value });
  }
  handleFieldValue = (Domain, scope) => value => {
    const fieldsValues = this.state.fieldsValues;
    const path = scope ? `${scope}.${Domain.field}` : Domain.field;
    const oldValue = get(fieldsValues, path);
    set(fieldsValues, path, value);
    if (oldValue !== value) {
      this.validateField(Domain, scope, value);
    }
    this.setState({ fieldsValues });
  };
  validateField = (Domain, scope, value) => {
    const fieldErrorPath = scope ? `${scope}.${Domain.field}` : Domain.field;
    const newFieldError = [];
    const errorMsg = Domain.validate(value);
    if (errorMsg) {
      newFieldError.push(errorMsg);
    } else {
      this.props.clearFieldError(fieldErrorPath);
    }
    set(this.errors, `${this.formScope}.${fieldErrorPath}.errors`, newFieldError);
  };
  getFieldErrorMsg = (Domain, scope) => {
    const path = scope ? `${scope}.${Domain.field}` : Domain.field;
    const error = get(this.errors, `${this.formScope}.${path}.errors`);
    if (Array.isArray(error) && error.length) return error[0];
  };
  @autobind
  hasErrors() {
    const errors = get(this.errors, this.formScope);
    const hasAnyErrors = errors && Object.entries(errors).length;
    if (!hasAnyErrors) return false;
    const fieldsList = this.getFieldsList();
    const hasCurrentFieldsErrors = (errorsObj, scope) =>
      Object.entries(errorsObj).some(errorItem => {
        const fieldName = scope ? `${scope}.${errorItem[0]}` : errorItem[0];
        const hasError = errorItem[1].errors && errorItem[1].errors.length;
        if (!hasError) {
          if (!errorItem[1].errors && Object.keys(errorItem[1]).length) {
            return hasCurrentFieldsErrors(errorItem[1], fieldName);
          }
          return false;
        }
        return fieldsList.includes(fieldName);
      });
    return hasCurrentFieldsErrors(errors);
  }
  saveData() {
    const fieldsValues = this.getFormattedFieldsData();
    this.props.setDataToFormState(fieldsValues);
  }
  removeData() {
    const dataToRemove = {
      [this.formScope]: null
    };
    this.props.setDataToFormState(dataToRemove);
  }
  @autobind
  isFieldRequired(Domain, scope) {
    const fieldName = scope ? `${scope}.${Domain.field}` : Domain.field;
    return this.requiredFields.includes(fieldName);
  }
  hasAllRequiredFields() {
    const fieldsList = this.getFieldsList();
    const actualRequiredFields = this.requiredFields.filter(requiredField =>
      fieldsList.find(field => requiredField.includes(field))
    );
    return actualRequiredFields.every(field => get(this.state.fieldsValues, field));
  }
  @autobind
  handleSaveBtnClick() {
    const surname = get(this.state.fieldsValues, `${FIO.field}.${Surname.field}`);
    const name = get(this.state.fieldsValues, `${FIO.field}.${Name.field}`);
    const chosenData = `${surname} ${name}`;
    if (this.hasAllRequiredFields()) {
      this.setState({ chosenData });
    } else {
      this.setState({ chosenData: '' });
    }
    this.saveData();
    this.hideModal();
  }
  @autobind
  handleClearBtnClick() {
    this.clearForm();
  }
  @autobind
  clearForm() {
    this.setState({
      fieldsValues: { ...this.initialFieldsValues },
      radioValue: Employee.value
    });
  }
  @autobind
  getFieldValue(Domain, scope) {
    const path = scope ? `${scope}.${Domain.field}` : `${Domain.field}`;
    return get(this.state.fieldsValues, path);
  }
  renderInputField = (DomainVO, scope) => {
    if (!this.isShowField(DomainVO, scope)) return null;
    return (
      <li>
        <Text
          DomainVO={DomainVO}
          initialValue={this.getFieldValue(DomainVO, scope)}
          onValueChange={this.handleFieldValue(DomainVO, scope)}
          labelAlign={TOP}
          isRequired={this.isFieldRequired(DomainVO, scope)}
          errorMsg={this.getFieldErrorMsg(DomainVO, scope)}
        />
      </li>
    );
  };

  renderForm() {
    return (
      <React.Fragment>
        <li>
          <RadioField
            DomainVO={Type}
            onChange={this.handleRadioChange}
            initialValue={this.state.radioValue}
            noCaption
          />
        </li>
        {this.renderInputField(Surname, FIO.field)}
        {this.renderInputField(Name, FIO.field)}
        {this.renderInputField(Patronymic, FIO.field)}
        {this.renderInputField(Position)}
        {this.renderInputField(CompanyName)}
        {this.renderInputField(ShipmentBasis)}
        {this.renderInputField(AssigneeBasis)}
        {this.renderInputField(Information)}
      </React.Fragment>
    );
  }
  render() {
    const formClasses = classNames('form', style.modalForm, style.center, style.hideFirstHr);
    const buttonClasses = classNames({
      [style.btnError]: this.hasErrors()
    });
    const isShowInput = this.state.chosenData;
    return (
      <React.Fragment>
        <li className={this.props.customClasses}>
          <label className="ds-field-name leftside">{PassedBy.name}</label>
          <div className="group">
            <div className="ds-input-group">
              {isShowInput && (
                <p className="ds-field-value predefined" style={{ width: '472px' }}>
                  <span>{this.state.chosenData}</span>
                </p>
              )}
              <Button
                type="button"
                iconClass={ICON.edit}
                className={buttonClasses}
                onClick={this.showModal}
              >
                {CHANGE}
              </Button>
            </div>
          </div>
        </li>

        <Modal
          hide={this.hideModal}
          width="472"
          isVisible={this.state.isShowModal}
          key={`${this.formScope}_passedByForm`}
        >
          <Modal.Header title={PassedBy.name} className={style.center} />
          <Modal.Body>
            <ul className={formClasses}>{this.renderForm()}</ul>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              className="center"
              iconClass={ICON.accept}
              colorClass={PRIMARY}
              onClick={this.handleSaveBtnClick}
            >
              {SAVE}
            </Button>
            <Button
              type="button"
              className="center"
              iconClass={ICON.cancel}
              onClick={this.handleClearBtnClick}
            >
              {CLEAR}
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default PassedByForm;
