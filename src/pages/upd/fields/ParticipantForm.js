import React, { Component } from 'react';
import Button, { PRIMARY } from '../../../common/Button';
import { ICON } from '@distate/components';
import Modal from '../../../common/modal/Modal';
import autobind from 'autobind-decorator';
import { CLEAR, SAVE, CHANGE } from '../../../common/Lbl';
import classNames from 'classnames';
import style from '../../../common/form/documents/DocumentFormBuilder.module.css';
import ParticipantAC from './ParticipantAutocomplete';
import get from 'get-value';
import ParticipantType from '@distate/core/dist/domain/documents/upd/standard_element/participant/ParticipantType';
import Type from '@distate/core/dist/domain/documents/upd/standard_element/participant/Type';
import Name from '@distate/core/dist/domain/documents/upd/standard_element/participant/UL/Name';
import OKPOIP from '@distate/core/dist/domain/documents/upd/standard_element/participant/IP/OKPO';
import INNIP from '@distate/core/dist/domain/documents/upd/standard_element/participant/IP/INN';
import OGRNIP from '@distate/core/dist/domain/documents/upd/standard_element/participant/IP/OGRNIP';
import OKPOUL from '@distate/core/dist/domain/documents/upd/standard_element/participant/UL/OKPO';
import INNUL from '@distate/core/dist/domain/documents/upd/standard_element/participant/UL/INN';
import KPP from '@distate/core/dist/domain/documents/upd/standard_element/participant/UL/KPP';
import Division from '@distate/core/dist/domain/documents/upd/standard_element/participant/Division';
import InformationForParticipant from '@distate/core/dist/domain/documents/upd/standard_element/participant/InformationForParticipant';
import AddressRussianType from '@distate/core/dist/domain/documents/upd/standard_element/address/AddressRussianType';
import PostalCode from '@distate/core/dist/domain/documents/upd/standard_element/address/russian_type/PostalCode';
import RegionCode from '@distate/core/dist/domain/documents/upd/standard_element/address/russian_type/RegionCode';
import District from '@distate/core/dist/domain/documents/upd/standard_element/address/russian_type/District';
import City from '@distate/core/dist/domain/documents/upd/standard_element/address/russian_type/City';
import Settlement from '@distate/core/dist/domain/documents/upd/standard_element/address/russian_type/Settlement';
import Street from '@distate/core/dist/domain/documents/upd/standard_element/address/russian_type/Street';
import House from '@distate/core/dist/domain/documents/upd/standard_element/address/russian_type/House';
import Building from '@distate/core/dist/domain/documents/upd/standard_element/address/russian_type/Building';
import Room from '@distate/core/dist/domain/documents/upd/standard_element/address/russian_type/Room';
import BankAccountNumber from '@distate/core/dist/domain/documents/upd/standard_element/participant/BankAccountNumber';
import BIK from '@distate/core/dist/domain/documents/upd/standard_element/bank_details/BIK';
import CorrespondentAccount from '@distate/core/dist/domain/documents/upd/standard_element/bank_details/CorrespondentAccount';
import BankName from '@distate/core/dist/domain/documents/upd/standard_element/bank_details/Name';
import Phone from '@distate/core/dist/domain/documents/upd/standard_element/contact/Phone';
import Email from '@distate/core/dist/domain/documents/upd/standard_element/contact/Email';
import Text from '../../../common/form/components/Text';
import set from 'set-value';
import FieldsBlockSeparator from '../../../common/form/components/FieldsBlockSeparator';
import RadioGroup from '../../../common/form/components/radio/RadioGroup';
import EmptyOption from '@distate/core/dist/domain/common/options/EmptyOption';
import { TOP } from '../../../common/Placement';
import Select from '../../../common/form/components/select/Select';
import IsSameOption from '@distate/core/dist/domain/common/options/IsSameOption';
import UserInputOption from '@distate/core/dist/domain/common/options/UserInputOption';
import { clone, combineMerge } from '../../../utils/ObjectUtil';
import ULType from '@distate/core/dist/domain/documents/upd/standard_element/participant/ULType';
import deepmerge from 'deepmerge';
import FIO from '@distate/core/dist/domain/documents/upd/standard_element/fio/FIO';
import FIOName from '@distate/core/dist/domain/documents/upd/standard_element/fio/Name';
import Surname from '@distate/core/dist/domain/documents/upd/standard_element/fio/Surname';
import Patronymic from '@distate/core/dist/domain/documents/upd/standard_element/fio/Patronymic';
import IPType from '@distate/core/dist/domain/documents/upd/standard_element/participant/IPType';
import { Loading } from '@distate/components';
import { getExternalTypeToString } from '../../../helpers/heplers';
import { TruncateText } from '../../../common/truncate-text';

class ParticipantForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      isShowForm: false,
      isBusy: false,
      fieldsValues: {},
      radioValue: EmptyOption.value,
      typeSelectValue: ULType.value,
      chosenData: '',
      requiredFields: []
    };
    this.formScope = props.scope || props.DomainVO.field;
    this.ULRequiredFields = [`${this.formScope}.${Name.field}`];
    this.IPRequiredFields = [
      `${this.formScope}.${FIO.field}.${FIOName.field}`,
      `${this.formScope}.${FIO.field}.${Surname.field}`
    ];
    this.errors = this.props.errors || {};
    this.IPCustomFields = [
      `${FIO.field}.${FIOName.field}`,
      `${FIO.field}.${Surname.field}`,
      `${FIO.field}.${Patronymic.field}`,
      OKPOIP.field,
      INNIP.field,
      OGRNIP.field
    ];
    this.ULCustomFields = [Name.field, OKPOUL.field, INNUL.field, KPP.field];
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
    if (
      prevState.fieldsValues[this.formScope]?.type !== this.state.fieldsValues[this.formScope]?.type
    ) {
      if (this.state.fieldsValues[this.formScope]?.type !== this.state.typeSelectValue) {
        this.setState({ typeSelectValue: this.state.fieldsValues[this.formScope]?.type });
      }
    }
  }
  updateServerErrors() {
    let serverErrors = get(this.props, `errors.${this.formScope}`);
    const companyTypeValue =
      get(this.state, `fieldsValues.${this.formScope}.type`) || this.state.typeSelectValue;
    if (get(serverErrors, 'name.errors')) serverErrors[Name.field] = serverErrors.name;
    if (get(serverErrors, 'okpo.errors')) {
      if (companyTypeValue === ULType.value) {
        serverErrors[OKPOUL.field] = serverErrors.okpo;
      }
      if (companyTypeValue === IPType.value) {
        serverErrors[OKPOIP.field] = serverErrors.okpo;
      }
      delete serverErrors.okpo;
    }
    if (get(serverErrors, 'inn.errors')) {
      if (companyTypeValue === ULType.value) {
        serverErrors[INNUL.field] = serverErrors.inn;
      }
      if (companyTypeValue === IPType.value) {
        serverErrors[INNIP.field] = serverErrors.inn;
      }
      delete serverErrors.inn;
    }
    this.errors = deepmerge(
      this.errors,
      { [this.formScope]: serverErrors },
      {
        arrayMerge: combineMerge
      }
    );
    if (get(serverErrors, 'inn.errors')) this.props.clearFieldError(`${this.formScope}.inn`);
    if (get(serverErrors, 'okpo.errors')) this.props.clearFieldError(`${this.formScope}.okpo`);
  }
  setInitialValues() {
    this.setState({
      requiredFields: [`${this.formScope}.${AddressRussianType.field}.${RegionCode.field}`]
    });
    
    const initialValues = this.props.initialValues;
    let chosenData = '';
    if (!initialValues || (!initialValues[this.formScope] && !initialValues.isSame)) return;
    if (initialValues.isSame) {
      this.setState(
        {
          radioValue: IsSameOption.value,
          chosenData: IsSameOption.title
        },
        this.setIsSame
      );
      return;
    }

    const checkedRadio = this.props.DomainVO.options.find(option =>
      UserInputOption.check(option.value)
    );
    const checkedSelect = initialValues[this.formScope].type || ULType.value;

    if (checkedSelect === ULType.value) {
      const companyNameVal = initialValues[this.formScope].name;
      const okpoVal = initialValues[this.formScope].okpo;
      const innVal = initialValues[this.formScope].inn;
      const kppVal = initialValues[this.formScope].kpp;
      if (companyNameVal) {
        initialValues[this.formScope][Name.field] = companyNameVal;
        chosenData = companyNameVal;
      }
      if (okpoVal) {
        initialValues[this.formScope][OKPOUL.field] = okpoVal;
      }
      if (innVal) {
        initialValues[this.formScope][INNUL.field] = innVal;
      }
      if (kppVal) {
        initialValues[this.formScope][KPP.field] = kppVal;
      }
    }
    if (checkedSelect === IPType.value) {
      const nameVal = get(initialValues, `${this.formScope}.fio.name`);
      const surnameVal = get(initialValues, `${this.formScope}.fio.surname`);
      const patronymicVal = get(initialValues, `${this.formScope}.fio.patronymic`);
      const okpoVal = initialValues[this.formScope].okpo;
      const innVal = initialValues[this.formScope].inn;
      const ogrnVal = initialValues[this.formScope].ogrn;
      if (nameVal) {
        set(initialValues, `${this.formScope}.${FIO.field}.${FIOName.field}`, nameVal);
      }
      if (surnameVal) {
        set(initialValues, `${this.formScope}.${FIO.field}.${Surname.field}`, surnameVal);
      }
      if (patronymicVal) {
        set(initialValues, `${this.formScope}.${FIO.field}.${Patronymic.field}`, patronymicVal);
      }
      if (nameVal && surnameVal) {
        chosenData = `${surnameVal} ${nameVal}`;
      }
      if (okpoVal) {
        initialValues[this.formScope][OKPOIP.field] = okpoVal;
      }
      if (innVal) {
        initialValues[this.formScope][INNIP.field] = innVal;
      }
      if (ogrnVal) {
        initialValues[this.formScope][OGRNIP.field] = ogrnVal;
      }
    }
    this.setState(
      {
        fieldsValues: initialValues,
        radioValue: checkedRadio.value,
        typeSelectValue: checkedSelect,
        isShowForm: true
      },
      () => {
        this.saveData();
        if (this.hasAllRequiredFields()) {
          this.setState({ chosenData });
        }
      }
    );
  }
  handleRequiredFieldsForAddress() {
    // const addressValues = get(
    //   this.state.fieldsValues,
    //   `${this.formScope}.${AddressRussianType.field}`
    // );
    // const hasAnyValue = addressValues && Object.values(addressValues).some(val => val);
    // if (hasAnyValue) {
    //   this.setState({
    //     requiredFields: [`${this.formScope}.${AddressRussianType.field}.${RegionCode.field}`]
    //   });
    // } else {
    //   this.setState({ requiredFields: [] });
    // }
  }
  isVisibleField(domain, scope) {
    const fieldName = `${scope}.${domain.field}`;

    if (this.state.typeSelectValue === IPType.value) {
      const isCustomULField = this.ULCustomFields.some(
        field => fieldName === `${this.formScope}.${field}`
      );
      return !isCustomULField;
    }
    if (this.state.typeSelectValue === ULType.value) {
      const isCustomIPField = this.IPCustomFields.some(
        field => fieldName === `${this.formScope}.${field}`
      );
      return !isCustomIPField;
    }
  }
  getFormattedFieldsData() {
    const fieldsValues = clone(this.state.fieldsValues);
    const scopedFieldsValues = fieldsValues[this.formScope];
    if (!scopedFieldsValues || Object.keys(scopedFieldsValues).length === 0) {
      return fieldsValues;
    }
    if (!scopedFieldsValues.address || Object.keys(scopedFieldsValues.address).length === 0) {
      delete scopedFieldsValues.address;
    } else {
      scopedFieldsValues.address.type = 'russian';
    }
    if (!scopedFieldsValues[Type.field]) {
      scopedFieldsValues[Type.field] = ULType.value;
    }
    const checkedSelect = this.state.typeSelectValue || ULType.value;

    let okpoVal = '';
    let innVal = '';
    const ogrnVal = scopedFieldsValues[OGRNIP.field];
    const nameVal = get(scopedFieldsValues, `fio.name`);
    const surnameVal = get(scopedFieldsValues, `fio.surname`);
    const patronymicVal = get(scopedFieldsValues, `fio.patronymic`);
    const companyNameVal = scopedFieldsValues[Name.field];
    const kpp = scopedFieldsValues[KPP.field];
    if (checkedSelect === ULType.value) {
      okpoVal = scopedFieldsValues[OKPOUL.field];
      innVal = scopedFieldsValues[INNUL.field];
      if (companyNameVal) {
        scopedFieldsValues.name = companyNameVal;
        delete scopedFieldsValues[Name.field];
      }
      if (nameVal) {
        delete scopedFieldsValues.fio.name;
      }
      if (surnameVal) {
        delete scopedFieldsValues.fio.surname;
      }
      if (patronymicVal) {
        delete scopedFieldsValues.fio.patronymic;
      }
      if (ogrnVal) {
        delete scopedFieldsValues.ogrn;
      }
    }
    if (checkedSelect === IPType.value) {
      okpoVal = scopedFieldsValues[OKPOIP.field];
      innVal = scopedFieldsValues[INNIP.field];
      if (ogrnVal) {
        scopedFieldsValues.ogrn = ogrnVal;
      }
      if (companyNameVal) {
        delete scopedFieldsValues[Name.field];
      }
      if (scopedFieldsValues.name) {
        delete scopedFieldsValues.name;
      }
      if (kpp) {
        delete scopedFieldsValues.kpp;
      }
    }
    if (okpoVal) {
      scopedFieldsValues.okpo = okpoVal;
      delete scopedFieldsValues[OKPOUL.field];
      delete scopedFieldsValues[OKPOIP.field];
    }
    if (innVal) {
      scopedFieldsValues.inn = innVal;
      delete scopedFieldsValues[INNUL.field];
      delete scopedFieldsValues[INNIP.field];
    }

    fieldsValues[this.formScope] = scopedFieldsValues;
    return fieldsValues;
  }
  @autobind
  showModal() {
    this.setState({ isShowModal: true });
  }
  @autobind
  hideModal() {
    this.setState({ isShowModal: false });
  }
  @autobind
  showForm() {
    this.setState({ isShowForm: true });
  }
  @autobind
  hideForm() {
    this.setState({ isShowForm: false });
  }
  @autobind
  handleRadioChange(value) {
    this.setState({ radioValue: value });
    if (UserInputOption.check(value)) {
      this.showForm();
    } else {
      this.hideForm();
    }
  }
  @autobind
  handleACSelectedItem(selectedItem) {
    this.setState({
      acSelectedItem: selectedItem
    });
  }
  @autobind
  handleCompanyInfo(companyInfo) {
    this.setState({
      companyInfo,
      isBusy: false
    });
    this.update(companyInfo, this.formScope, this.dataMap);
  }
  handleSelectValue = (Domain, scope) => value => {
    this.handleFieldValue(Domain, scope)(value);
  };
  handleFieldValue = (Domain, scope) => value => {
    const fieldsValues = clone(this.state.fieldsValues);
    const path = scope ? `${scope}.${Domain.field}` : Domain.field;
    const oldValue = get(fieldsValues, path);
    set(fieldsValues, path, value);
    if (oldValue !== value) {
      this.validateField(Domain, scope, value);
    }
    this.setState({ fieldsValues }, this.handleRequiredFieldsForAddress);
  };
  validateField = (Domain, scope, value) => {
    const fieldErrorPath = `${scope}.${Domain.field}`;
    const newFieldError = [];
    const errorMsg = Domain.validate(value);
    if (errorMsg) {
      newFieldError.push(errorMsg);
    } else {
      this.props.clearFieldError(fieldErrorPath);
    }
    set(this.errors, `${fieldErrorPath}.errors`, newFieldError);
  };
  getFieldErrorMsg = (Domain, scope) => {
    const path = scope ? `${scope}.${Domain.field}` : Domain.field;
    const error = get(this.errors, `${path}.errors`);
    if (Array.isArray(error) && error.length) return error[0];
  };
  @autobind
  hasErrors() {
    const errors = get(this.errors, this.formScope);
    const hasErrors = errors && Object.entries(errors).length;
    if (!hasErrors) return false;
    const customFieldsToIgnore =
      this.state.typeSelectValue === IPType.value ? this.ULCustomFields : this.IPCustomFields;
    const hasOnlyIgnoringErrors = (errorsObj, scope) =>
      Object.entries(errorsObj).every(errorItem => {
        const fieldName = scope ? `${scope}.${errorItem[0]}` : errorItem[0];
        const hasErrors = errorItem[1].errors;
        const errorsIsEmpty = hasErrors && !errorItem[1].errors.length;
        if (errorsIsEmpty) return true;
        if (!hasErrors && Object.entries(errorItem[1]).length) {
          return hasOnlyIgnoringErrors(errorItem[1], fieldName);
        }
        return customFieldsToIgnore.includes(fieldName);
      });
    return !hasOnlyIgnoringErrors(errors);
  }
  isSameOptionExist() {
    return this.props.DomainVO.options.includes(IsSameOption);
  }
  saveData() {
    if (this.isSameOptionExist()) {
      this.removeData();
    }
    const fieldsValues = this.getFormattedFieldsData();
    this.props.setDataToFormState(fieldsValues);
  }
  removeData() {
    const dataToRemove = {
      [this.formScope]: null
    };
    if (this.isSameOptionExist()) {
      dataToRemove.isSame = null;
    }
    this.props.setDataToFormState(dataToRemove);
  }
  setIsSame() {
    this.removeData();
    this.props.setDataToFormState({ isSame: true });
  }
  @autobind
  isFieldRequired(Domain, scope) {
    const fieldName = scope ? `${scope}.${Domain.field}` : `${this.formScope}.${Domain.field}`;
    const customRequiredFields =
      this.state.typeSelectValue === IPType.value ? this.IPRequiredFields : this.ULRequiredFields;
    return (
      this.state.requiredFields.includes(fieldName) || customRequiredFields.includes(fieldName)
    );
  }
  hasAllRequiredFields() {
    const customRequiredFields =
      this.state.typeSelectValue === IPType.value ? this.IPRequiredFields : this.ULRequiredFields;
    const hasAllCommonRequiredFields = this.state.requiredFields.every(field => {
      return get(this.state.fieldsValues, field);
    });
    const hasAllCustomRequiredFields = customRequiredFields.every(field => {
      return get(this.state.fieldsValues, field);
    });
    return hasAllCommonRequiredFields && hasAllCustomRequiredFields;
  }
  @autobind
  handleSaveBtnClick() {
    const radioValue = this.state.radioValue;
    let chosenData = '';
    if (this.state.typeSelectValue === IPType.value) {
      const name = get(this.state.fieldsValues, `${this.formScope}.${FIO.field}.${FIOName.field}`);
      const surname = get(
        this.state.fieldsValues,
        `${this.formScope}.${FIO.field}.${Surname.field}`
      );
      if (name && surname) chosenData = `${surname} ${name}`;
    }
    if (this.state.typeSelectValue === ULType.value) {
      chosenData = get(this.state.fieldsValues, `${this.formScope}.${Name.field}`);
    }
    if (radioValue === EmptyOption.value) {
      this.removeData();
      this.setState({ chosenData: '' });
    } else if (radioValue === IsSameOption.value) {
      this.setIsSame();
      this.setState({ chosenData: IsSameOption.title });
    } else if (UserInputOption.check(radioValue)) {
      this.saveData();
      if (this.hasAllRequiredFields()) {
        this.setState({ chosenData });
      } else {
        this.setState({ chosenData: '' });
      }
    }
    this.hideModal();
  }
  @autobind
  handleClearBtnClick() {
    if (this.state.isShowForm) {
      this.clearForm();
    } else {
      this.clearRadioBtns();
    }
  }
  @autobind
  clearForm() {
    this.errors = {};
    this.setState({
      fieldsValues: {},
      acSelectedItem: '',
      companyInfo: {},
      typeSelectValue: ULType.value
    });
  }
  @autobind
  clearRadioBtns() {
    this.setState({
      radioValue: EmptyOption.value
    });
  }
  @autobind
  update(res, scope, dataMap) {
    const newValuesMap = new Map();
    const newValues = {};
    const updateField = (Domain, scope) => {
      const field = Domain.field;
      const scopedField = scope ? `${scope}.${field}` : field;
      const newValue = get(res, dataMap[Domain]);
      if (this.state.fieldsValues[scopedField] !== newValue) {
        newValuesMap.set(scopedField, newValue);
        this.validateField(Domain, scope, newValue);
      }
    };
    const updateFields = (GroupDomainVOs, scope) => {
      GroupDomainVOs.forEach(Domain => {
        if (!Domain.VOs) {
          updateField(Domain, scope);
        } else {
          updateFields(Domain.VOs, `${scope}.${Domain.field}`);
        }
      });
    };
    updateFields(ParticipantType.VOs, scope);
    newValuesMap.forEach((value, key) => {
      set(newValues, key, value);
    });
    this.setState({ fieldsValues: newValues });
  }
  dataMap = {
    [Type]: 'type.systemName',
    [Name]: 'name',
    [FIOName]: 'fio.name',
    [Surname]: 'fio.surname',
    [Patronymic]: 'fio.patronymic',
    [OKPOIP]: 'division.classificationNumber',
    [OKPOUL]: 'division.classificationNumber',
    [OGRNIP]: 'ogrn',
    [INNIP]: 'inn',
    [INNUL]: 'inn',
    [KPP]: 'division.kpp',
    [Division]: 'name', // TODO поменять на division.title, когда бек будет готов
    [InformationForParticipant]: 'informationForParticipant',
    [PostalCode]: 'division.address.postalCode',
    [RegionCode]: 'division.address.region.code',
    [District]: 'division.address.district',
    [City]: 'division.address.city',
    [Settlement]: 'division.address.settlement',
    [Street]: 'division.address.street',
    [House]: 'division.address.house',
    [Building]: 'division.address.building',
    [Room]: 'division.address.room',
    [BankAccountNumber]: 'accountNumber',
    [BIK]: 'bik',
    [CorrespondentAccount]: 'correspondentAccount',
    [BankName]: 'bankName',
    [Phone]: 'division.contact.phone',
    [Email]: 'division.contact.email'
  };
  getFieldValue(Domain, scope) {
    const path = scope ? `${scope}.${Domain.field}` : Domain.field;
    const fieldValue = get(this.state.fieldsValues, path);
    return fieldValue;
  }
  renderInputField = (DomainVO, scope) => {
    const customClasses = !this.isVisibleField(DomainVO, scope) ? style.hiddenAndZeroHeight : '';
    return (
      <div className={customClasses}>
        <Text
          DomainVO={DomainVO}
          initialValue={this.getFieldValue(DomainVO, scope)}
          onValueChange={this.handleFieldValue(DomainVO, scope)}
          labelAlign={TOP}
          isRequired={this.isFieldRequired(DomainVO, scope)}
          errorMsg={this.getFieldErrorMsg(DomainVO, scope)}
        />
      </div>
    );
  };
  renderSelectField = (DomainVO, scope) => {
    const customClasses = !this.isVisibleField(DomainVO, scope) ? style.hiddenAndZeroHeight : '';
    return (
      <div className={customClasses}>
        <Select
          DomainVO={DomainVO}
          initialValue={this.getFieldValue(DomainVO, scope)}
          onValueChange={this.handleSelectValue(DomainVO, scope)}
          labelAlign={TOP}
          errorMsg={this.getFieldErrorMsg(DomainVO, scope)}
        />
      </div>
    );
  };
  renderFormFields(groupDomainVO, scope) {
    const fields = groupDomainVO.VOs.map(DomainVO => {
      if (DomainVO.VOs) {
        return this.renderFormFields(DomainVO, `${scope}.${DomainVO.field}`);
      } else {
        return DomainVO.options
          ? this.renderSelectField(DomainVO, scope)
          : this.renderInputField(DomainVO, scope);
      }
    });
    return groupDomainVO.VOs && groupDomainVO.field !== FIO.field ? (
      <React.Fragment>
        <FieldsBlockSeparator title={groupDomainVO.name} />
        {fields}
      </React.Fragment>
    ) : (
      fields
    );
  }

  renderForm() {
    const { isBusy } = this.state;
    return (
      <React.Fragment>
        <div style={{ position: 'relative' }}>
          <ParticipantAC
            handleACSelectedItem={this.handleACSelectedItem}
            handleCompanyInfo={this.handleCompanyInfo}
            selectedItem={this.state.acSelectedItem}
            handleLoader={val => this.setState({ isBusy: val })}
          />
        </div>
        <div style={{ position: 'relative' }}>
          {isBusy && <Loading isRelative={false} />}
          {this.renderFormFields(ParticipantType, this.formScope)}
        </div>
      </React.Fragment>
    );
  }

  render() {
    const { DomainVO } = this.props;
    const formClasses = classNames('form', style.modalForm, style.center, style.hideFirstHr);
    const buttonClasses = classNames({
      [style.btnError]: this.hasErrors()
    });
    const isShowInput = this.state.chosenData;

    const contractorTypeStr = getExternalTypeToString(
      this.state?.companyInfo?.companyExternalType,
      this.state?.companyInfo?.companyExternalOperator,
      this.state?.companyInfo?.companyNetwork
    );

    return (
      <React.Fragment>
        <li className={this.props.customClasses}>
          <label className="ds-field-name leftside">{DomainVO.name}</label>
          <div className="group">
            <div className="ds-input-group">
              {isShowInput && (
                <p className="ds-field-value predefined" style={{ width: '472px' }}>
                  <span><TruncateText text={this.state.chosenData + contractorTypeStr } width='440px' /></span>
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
          key={`${this.formScope}_participantModal`}
        >
          <Modal.Header title={DomainVO.name} className={style.center} />
          <Modal.Body>
            <div className={formClasses}>
              <div>
                <RadioGroup
                  DomainVO={DomainVO}
                  onChange={this.handleRadioChange}
                  initialValue={this.state.radioValue}
                />
              </div>
              {this.state.isShowForm && this.renderForm()}
            </div>
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

export default ParticipantForm;
