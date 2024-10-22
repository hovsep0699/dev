import React from 'react';
import { Option, Select, Text, Scope } from 'informed';
import FormBuilder from '../FormBuilder';

import { TOP, LEFT } from '../../Placement';
import { ICON } from '@distate/components';

import Button, { PRIMARY } from '../../Button';
import DateInput from '../components/DateInput';

import formBuilderStyles from '../FormBuilder.module.css';
import documentBuilderStyles from './DocumentFormBuilder.module.css';

import DocumentTable from '../components/DocumentTable';
import DocumentGroup from '../components/DocumentGroup';

import SaveDocumentModal from '../../../pages/documents/modals/SaveDocumentModal';

import Appearance from '../parameters/Appearance';
import Behavior from '../parameters/Behavior';
import Defaults from '../parameters/Defaults';

import get from 'get-value';
import setObject from 'object-path';
import { set as setImmutable } from 'object-path-immutable';
import deepmerge from 'deepmerge';
import classNames from 'classnames';

import AutocompleteService from '@distate/core/dist/application/autocomplete/AutocompleteService';
import Autocomplete from '../../autocomplete/Autocomplete';
import { combineMerge } from '../../../utils/ObjectUtil';
import { getExternalTypeToString, joinNoEmptyValues } from '../../../helpers/heplers';

const styles = { ...formBuilderStyles, ...documentBuilderStyles };

class DocumentFormBuilder extends FormBuilder {
  static createInputClasses(formApi = null, field = '', customClasses = ['ds-input']) {
    if (!formApi) return classNames(customClasses);
    const { getError, getTouched, getValue } = formApi;
    const res = {};
    if (field) {
      res.error = getError(field);
      res.success = !getError(field) && getTouched(field) && getValue(field);
    }
    return classNames(res, customClasses);
  }
  constructor(component, defaultBehavior = new Behavior(), defaultAppearance = new Appearance()) {
    super(component);
    this._initialValues = {};

    this._docGroup = new DocumentGroup(this, DocumentFormBuilder, styles);

    this._defaults = new Defaults(defaultBehavior, defaultAppearance);
    this.handleBehavior = this._defaults.handleBehavior;
    this.handleAppearance = this._defaults.handleAppearance;
  }
  getLabel(fieldName, behaviorOrIsRequired, appearanceOrAlign) {
    let behavior = behaviorOrIsRequired;
    if (typeof behaviorOrIsRequired === 'boolean') {
      behavior = new Behavior({ isRequired: behaviorOrIsRequired });
    }
    let appearance = appearanceOrAlign;
    if (typeof appearanceOrAlign === 'string') {
      appearance = new Appearance({ align: appearanceOrAlign });
    }
    const { isRequired } = this.handleBehavior(behavior);
    const { align, withRequiredView } = this.handleAppearance(appearance);
    const labelClasses = classNames({
      'ds-field-name': true,
      leftside: align === LEFT,
      top: align === TOP,
      required: withRequiredView || isRequired
    });
    return <label className={labelClasses}>{fieldName}</label>;
  }
  getErrorMsg(fieldName) {
    const serverErrorMsg = get(this._component, `state.errors.${fieldName}`);
    const formStateErrorMsg = get(this._formState, `errors.${fieldName}`);
    return (
      (typeof serverErrorMsg === 'string' && serverErrorMsg) ||
      (typeof formStateErrorMsg === 'string' && formStateErrorMsg)
    );
  }
  getInitialFieldSettings(DomainVO, behavior) {
    const { initialFieldDomain, isRequired, scope, errorPath } = this.handleBehavior(behavior);
    const fieldName = scope ? `${scope}.${DomainVO.field}` : DomainVO.field;
    const fieldErrorPath = errorPath ? `${errorPath}.${fieldName}` : fieldName;
    const formattedFieldErrorPath = fieldErrorPath.replace(/\[/g, '.').replace(/]/g, '');
    const errorMsg = this.getErrorMsg(formattedFieldErrorPath);
    if (isRequired) {
      this._requiredFields.push(fieldName);
    }
    return {
      fieldName,
      errorMsg,
      initialValue: initialFieldDomain.value
    };
  }
  setDataToFormState = path => data => {
    const valuePath = path ? `values.${path}` : 'values';
    const objToMerge = get(this.formState, valuePath);
    const mergedData = deepmerge(objToMerge, data, { arrayMerge: combineMerge });
    setObject(this.formState, valuePath, mergedData);
  };
  setStateSynchronous = stateUpdate => {
    return new Promise(resolve => {
      this._component.setState(stateUpdate, () => resolve());
    });
  };
  setDataToComponentState = async (data, valuePath, merge = true) => {
    const objToMerge = this._component.state;
    let newData;
    if (merge) {
      newData = deepmerge(objToMerge, data, { arrayMerge: combineMerge });
    } else {
      newData = setImmutable(objToMerge, valuePath, get(data, valuePath));
    }
    await this.setStateSynchronous(newData);
  };

  buildInfo(DomainVO, behavior, appearance, isHidden) {
    const { initialFieldDomain, isRequired } = this.handleBehavior(behavior);
    const { width } = this.handleAppearance(appearance);
    const { errorMsg } = this.getInitialFieldSettings(DomainVO, behavior);
    this._content.push(() => (
      <li style={{ display: isHidden ? 'none' : 'block' }}>
        {this.getLabel(DomainVO.name, isRequired)}
        <div className="group" style={{ width }}>
          <Text
            className={'ds-field-name leftside'}
            field={DomainVO.field}
            title={DomainVO.hint}
            initialValue={initialFieldDomain.value}
            style={{ width, border: 'none' }}
            placeholder={DomainVO.placeholder}
            mask={DomainVO.mask}
            readOnly
          />
          <span className="ds-field-name bottom error">{errorMsg}</span>
        </div>
      </li>
    ));
  }
  buildInput(DomainVO, behavior, appearance) {
    const { isRequired, scope } = this.handleBehavior(behavior);
    const { width, customClasses, align, withRequiredView } = this.handleAppearance(appearance);
    const { fieldName, errorMsg, initialValue } = this.getInitialFieldSettings(DomainVO, behavior);

    const validateOnChange = !DomainVO.maskOnBlur;
    const validateOnBlur = !DomainVO.maskOnBlur;
    const onBlur = e => {
      if (!DomainVO.maskOnBlur) return;
      const value = e.target.value;
      const maskedValue = DomainVO.maskOnBlur(value);
      this._formApi.setValue(fieldName, maskedValue);
      this._formApi.validateField(fieldName);
    };
    const handleEnterKeyDown = e => {
      if (e.key === 'Enter') {
        onBlur(e);
      }
    };

    const createInput = () => {
      const errorClass = errorMsg ? 'error' : '';
      const inputClasses = DocumentFormBuilder.createInputClasses(
        this._formApi,
        fieldName,
        `ds-input ${customClasses} ${errorClass}`
      );
      const inputField = (
        <div className="group" style={{ width }}>
          <Text
            field={DomainVO.field}
            title={DomainVO.hint}
            initialValue={initialValue}
            className={inputClasses}
            style={{ width }}
            placeholder={DomainVO.placeholder}
            mask={DomainVO.mask}
            validate={DomainVO.validate}
            validateOnChange={validateOnChange}
            validateOnBlur={validateOnBlur}
            onBlur={onBlur}
            onKeyDown={handleEnterKeyDown}
          />
          <span className="ds-field-name bottom error">{errorMsg}</span>
        </div>
      );
      const scopedInputField = scope ? <Scope scope={scope}>{inputField}</Scope> : inputField;
      return (
        <div className="group" key={`${scope}.${DomainVO.field}`}>
          {this.getLabel(
            DomainVO.name,
            new Behavior({ isRequired }),
            new Appearance({ align, withRequiredView })
          )}
          {scopedInputField}
        </div>
      );
    };

    this._content.push(() => <li className={customClasses}>{createInput()}</li>);
    return createInput();
  }
  buildDateInput(DomainVO, behavior, appearance) {
    const { isRequired, scope } = this.handleBehavior(behavior);
    const { width, align, customClasses } = this.handleAppearance(appearance);
    const { fieldName, errorMsg, initialValue } = this.getInitialFieldSettings(DomainVO, behavior);
    const errorClass = errorMsg ? 'error' : '';
    const dateInputClasses = DocumentFormBuilder.createInputClasses(
      this._formApi,
      fieldName,
      `ds-input date ${customClasses} ${errorClass}`
    );
    const dateInputField = (
      <div className="group" style={{ width }}>
        <DateInput
          field={DomainVO.field}
          title={DomainVO.hint}
          initialValue={initialValue}
          className={dateInputClasses}
          placeholder={DomainVO.placeholder}
          mask={DomainVO.mask}
          validate={DomainVO.validate}
          validateOnChange
          validateOnBlur
        />
        <span className="ds-field-name bottom error">{errorMsg}</span>
      </div>
    );
    const scopedInputField = scope ? <Scope scope={scope}>{dateInputField}</Scope> : dateInputField;
    const createDateInput = () => (
      <div className="group" key={`${scope}.${DomainVO.field}`}>
        {this.getLabel(DomainVO.name, new Behavior({ isRequired }), new Appearance({ align }))}
        {scopedInputField}
      </div>
    );
    this._content.push(() => <li>{createDateInput()}</li>);
    return createDateInput();
  }
  buildAutocomplete(DomainVO, behavior, appearance, captionField, filterRes) {
    const {
      title,
      initialFieldDomain,
      isRequired = false,
      onChange = () => {},
      scope = ''
    } = this.handleBehavior(behavior);

    const { width, align, customClasses } = this.handleAppearance(appearance);
    const scopedField = scope ? `${scope}.${DomainVO.field}` : DomainVO.field;

    if (isRequired) {
      this._requiredFields.push(DomainVO.field);
    }
    const acService = AutocompleteService[DomainVO.field];
    const handleItemSelect = ajaxResponseValues => selectedValue => {
      if (!ajaxResponseValues) {
        return;
      }

      this._formApi.setValue(scopedField, selectedValue);

      let selectedItem;
      if (DomainVO.name === 'Покупатель') {
        selectedItem = ajaxResponseValues.rows.find(
          item => getCustomerString(item) === selectedValue
        );
      } else {
        selectedItem = ajaxResponseValues.rows.find(
          item => item.title === selectedValue
        );
  
      }
      
      if (behavior.ajax.request) {
        behavior.ajax
          .request(selectedItem[behavior.ajax.field])
          .then(res => {
            this._component.setState({ [scopedField]: res });
            onChange(res);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this._component.setState({ [scopedField]: selectedItem });
        onChange(selectedItem);
      }
    };

    const handleAutocompleteValidate = field => res => inputValue => {
      if (res === null) {
        return undefined;
      }

      if (!inputValue) {
        this._component.setState({ [field]: '' });
        return !isRequired ? undefined : 'Введите значение';
      }

      const filteredRes = res.filter(item => {
        return item.toLowerCase().includes(inputValue.toLowerCase());
      });

      


      if (filteredRes.length === 1) {
        this._component.setState({ [field]: inputValue });
        return undefined;
      }

      if (filteredRes?.length > 1 || filterRes?.length === 0) {
        this._component.setState({ [field]: inputValue });

        if (filteredRes.some(item => item === inputValue)) {
          return undefined;
        } else {
          return 'Выберите значение из выпадающего списка';
        }
      }

      return undefined;
    };

    const autocompleteState = this._component.state[scopedField];

    const caption = captionField && autocompleteState && autocompleteState[captionField] && (
      <p className={`caption ${styles.caption}`}>{autocompleteState[captionField]}</p>
    );

    // function for making customer string value
    function getCustomerString(item) {
      const companyName = item?.companyName;
      const inn = item?.companyInn && `ИНН: ${item.companyInn}`;
      const kpp = item?.companyKpp && `КПП: ${item.companyKpp}`;
      const ogrn = item?.companyOgrn && `ОГРН: ${item.companyOgrn}`;

      const typeToString = getExternalTypeToString(
        item?.companyExternalType,
        item?.companyExternalOperator,
        item?.companyNetwork
      );

      const companyProps = joinNoEmptyValues([companyName, inn, kpp, ogrn], ', ');

      return companyProps + typeToString;
    }

    const formatAjaxRes = res => {
      const filteredValues = (filterRes && filterRes(res.rows)) || res.rows;
      if (DomainVO.name === 'Покупатель') {
        return filteredValues.map(row => getCustomerString(row));
      }
      return filteredValues.map(row => row.title);
    };

    const autocomplete = () => {
      const errorMsg = this.getErrorMsg(scopedField);
      const errorClass = errorMsg ? 'error' : '';
      const inputClasses = DocumentFormBuilder.createInputClasses(
        this._formApi,
        scopedField,
        `ds-input ${customClasses} ${errorClass}`
      );
      return (
        <li className={customClasses}>
          {title !== null && this.getLabel(title || DomainVO.name, isRequired, align)}
          <div className="group">
            <Autocomplete
              doAjax={acService.request}
              formatAjaxRes={formatAjaxRes}
              handleItemSelect={handleItemSelect}
              handleAutocompleteValidate={handleAutocompleteValidate(scopedField)}
            >
              <Text
                field={DomainVO.field}
                title={DomainVO.hint}
                initialValue={initialFieldDomain && initialFieldDomain.value}
                className={inputClasses}
                style={{ width }}
                placeholder={DomainVO.placeholder}
                mask={DomainVO.mask}
                validateOnChange
                validateOnBlur
                onFocus={onChange}
              />
            </Autocomplete>
            <span className="ds-field-name bottom error">{errorMsg}</span>

            {!errorMsg && caption}
          </div>
        </li>
      );
    };
    this._content.push(autocomplete);
    return autocomplete();
  }

  buildSelect(DomainVO, behavior, appearance) {
    const { isRequired, initialFieldDomain, onChange, scope } = this.handleBehavior(behavior);
    const { width, align, isInDiv } = this.handleAppearance(appearance);
    const { fieldName, errorMsg } = this.getInitialFieldSettings(DomainVO, behavior);

    const options = DomainVO.options.map(({ value, title }, index) => (
      <Option value={value} key={`${DomainVO.field}${index}`}>
        {title}
      </Option>
    ));

    const placeholderOption = DomainVO.placeholder && (
      <Option value="" disabled key={`${DomainVO.field}.placeholder`}>
        {DomainVO.placeholder}
      </Option>
    );

    const initialValue =
      initialFieldDomain && initialFieldDomain.value !== ''
        ? initialFieldDomain.value
        : DomainVO.options[0].value;

    const wrapper = (isInDiv, select) => () => {
      if (isInDiv) return <div className="group">{select()}</div>;
      return <li key={`${scope}.${DomainVO.field}`}>{select()}</li>;
    };

    const select = () => {
      const errorClass = errorMsg ? 'error' : '';
      const selectClasses = DocumentFormBuilder.createInputClasses(
        this._formApi,
        fieldName,
        `ds-select ${styles.width100} ${errorClass}`
      );

      const selectField = (
        <div className="group" style={{ width }}>
          <Select
            field={DomainVO.field}
            title={DomainVO.hint}
            initialValue={initialValue}
            style={{ width }}
            className={selectClasses}
            mask={DomainVO.mask}
            validate={DomainVO.validate}
            validateOnChange
            validateOnBlur
            onChange={() => {
              onChange(this._formApi.getValue(fieldName));
            }}
          >
            {placeholderOption}
            {options}
          </Select>
          <span className="ds-field-name bottom error">{errorMsg}</span>
        </div>
      );

      const scopedSelectField = scope ? <Scope scope={scope}>{selectField}</Scope> : selectField;

      return (
        <React.Fragment>
          {this.getLabel(DomainVO.name, new Behavior({ isRequired }), new Appearance({ align }))}
          {scopedSelectField}
        </React.Fragment>
      );
    };

    this._content.push(wrapper(isInDiv, select));
    return wrapper(isInDiv, select)();
  }

  buildGroup(GroupDomainVO, createElementsMap, behavior, appearance, behaviors, appearances) {
    this._docGroup.buildGroup(
      GroupDomainVO,
      createElementsMap,
      behavior,
      appearance,
      behaviors,
      appearances
    );
  }

  buildArrayGroup(GroupDomainVO, createElementsMap, behavior, appearance, behaviors, appearances) {
    this._docGroup.buildArrayGroup(
      GroupDomainVO,
      createElementsMap,
      behavior,
      appearance,
      behaviors,
      appearances
    );
  }

  buildArrayGroupInput(GroupDomainVO, DomainVO, groupIndex, behavior, appearance) {
    return this._docGroup.buildArrayGroupInput(
      GroupDomainVO,
      DomainVO,
      groupIndex,
      behavior,
      appearance
    );
  }

  buildArrayGroupDateInput(GroupDomainVO, DomainVO, groupIndex, behavior, appearance) {
    return this._docGroup.buildArrayGroupDateInput(
      GroupDomainVO,
      DomainVO,
      groupIndex,
      behavior,
      appearance
    );
  }

  buildArrayGroupAutocomplete(GroupDomainVO, DomainVO, groupIndex, behavior, appearance) {
    return this._docGroup.buildArrayGroupAutocomplete(
      GroupDomainVO,
      DomainVO,
      groupIndex,
      behavior,
      appearance
    );
  }

  buildArrayGroupSelect(GroupDomainVO, DomainVO, groupIndex, behavior, appearance) {
    return this._docGroup.buildArrayGroupSelect(
      GroupDomainVO,
      DomainVO,
      groupIndex,
      behavior,
      appearance
    );
  }

  buildArrayGroupModal(GroupDomainVO, DomainVO, groupIndex, behavior, appearance) {
    return this._docGroup.buildArrayGroupModal(
      GroupDomainVO,
      DomainVO,
      groupIndex,
      behavior,
      appearance
    );
  }

  buildArrayGroupComponent(component) {
    return (GroupDomainVO, DomainVO, groupIndex, behavior, appearance) => {
      return this._docGroup.buildArrayGroupComponent(component)(
        GroupDomainVO,
        DomainVO,
        groupIndex,
        behavior,
        appearance
      );
    };
  }

  buildTable(GroupDomainVO, createElementsMap, footerConfig, behaviors, appearances, behavior) {
    const groupErrors = get(this._component.state.errors, GroupDomainVO.field);
    const table = new DocumentTable(
      GroupDomainVO,
      styles,
      behavior,
      behaviors,
      appearances,
      groupErrors
    );
    this._initialValues = {
      ...this._initialValues,
      [GroupDomainVO.field]: behavior.initialFieldDomain?.value
        ? behavior.initialFieldDomain.value[GroupDomainVO.field]
        : [{}]
    };
    this._content.push(() =>
      table.create(
        createElementsMap,
        footerConfig,
        appearances,
        this._formState,
        this._formApi,
        this._component
      )
    );
  }
  buildTableInput(DomainVO, behavior, appearance) {
    const { initialFieldDomain, isRequired } = this.handleBehavior(behavior);

    if (isRequired) {
      this._requiredFields.push(DomainVO.field);
    }
    const validateOnChange = !DomainVO.maskOnBlur;
    const validateOnBlur = !DomainVO.maskOnBlur;
    const onBlur = e => {
      if (!DomainVO.maskOnBlur) return;
      const value = e.target.value;
      const maskedValue = DomainVO.maskOnBlur(value);
      this._formApi.setValue(DomainVO.field, maskedValue);
      this._formApi.validate();
    };
    const handleEnterKeyDown = e => {
      if (e.key === 'Enter') {
        onBlur(e);
      }
    };

    const createInput = () => {
      return (
        <Text
          type="text"
          field={DomainVO.field}
          title={DomainVO.hint}
          initialValue={initialFieldDomain && initialFieldDomain.value}
          placeholder={DomainVO.placeholder}
          mask={DomainVO.mask}
          validate={DomainVO.validate}
          validateOnChange={validateOnChange}
          validateOnBlur={validateOnBlur}
          onBlur={onBlur}
          onKeyDown={handleEnterKeyDown}
        />
      );
    };

    this._content.push(() => <li>{createInput()}</li>);
    return createInput();
  }

  buildComponent(component) {
    return (DomainVO, behavior, appearance) => {
      const {
        onChange = () => {},
        scope,
        initialFieldDomain,
        customFieldName
      } = this.handleBehavior(behavior);
      const fieldName = customFieldName || DomainVO.field;
      const errors = get(this._component.state, `errors.${scope}.${fieldName}`);
      const createComponent = () => {
        return React.cloneElement(component, {
          DomainVO,
          onChange,
          scope,
          initialFieldDomain,
          errors
        });
      };
      this._content.push(() => <li>{createComponent()}</li>);
      return createComponent();
    };
  }

  buildSubmit(lbl, submitCallback = null, errorMsg) {
    let submitHandler = submitCallback;

    const hideModal = () => {
      this._component.setState({ showSaveDocumentModal: false });
    };
    if (!submitHandler) {
      submitHandler = (submitCb, force = false) => () => {
        this._component.checkCompleteness(this._formState, this._requiredFields);

        const combineMerge = (target, source, options) => {
          const destination = target.slice();

          source.forEach((item, index) => {
            if (typeof destination[index] === 'undefined') {
              destination[index] = options.cloneUnlessOtherwiseSpecified(item, options);
            } else if (options.isMergeableObject(item)) {
              destination[index] = deepmerge(target[index], item, options);
            } else if (target.indexOf(item) === -1) {
              destination.push(item);
            }
          });
          return destination;
        };

        submitCb(
          deepmerge.all([this._formState.values, this._component.state, { force }], {
            arrayMerge: combineMerge
          }),
          this._component.handleError
        );
      };
    }
    const agreeModalCallback = () => {
      hideModal();
      submitHandler(this._component.submit, true)();
    };

    this._createFooter = () => (
      <React.Fragment>
        <div className="ds-toolbar-wrapper">
          <div className="ds-toolbar">
            <span className="group">
              <Button
                colorClass={PRIMARY}
                iconClass={ICON.accept}
                onClick={submitHandler(this._component.submit)}
              >
                {lbl}
              </Button>
            </span>
            <span className="ds-field-name error top inline group">{errorMsg}</span>
          </div>
        </div>
        {this._component.state.showSaveDocumentModal && (
          <SaveDocumentModal agree={agreeModalCallback} hide={hideModal} />
        )}
      </React.Fragment>
    );
  }
  getForm() {
    const form = super.getForm();
    return React.cloneElement(form, {
      initialValues: this._initialValues
    });
  }
}

export default DocumentFormBuilder;
