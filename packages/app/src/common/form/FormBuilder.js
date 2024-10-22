import FormBuilderBase from './FormBuilderBase';
import React from 'react';
import { Form, Text } from 'informed';
import Button, { PRIMARY } from '../Button';
import { ICON } from '@distate/components';
import Autocomplete from '../autocomplete/Autocomplete';
import styles from './FormBuilder.module.css';
import FormBase from './FormBase';
import autobind from 'autobind-decorator';
import classNames from 'classnames';
import { capitalize } from '../../utils/StringUtil';
import AutocompleteService from '@distate/core/dist/application/autocomplete/AutocompleteService';
import { LEFT } from '../Placement';
import deepmerge from 'deepmerge';
import get from 'get-value';
import { Loading } from '@distate/components';

class FormBuilder extends FormBuilderBase {
  static createInputClasses(formState, field) {
    const { errors, values, touched } = formState;
    return classNames({
      'ds-input': true,
      error: errors[field],
      success: !errors[field] && touched[field] && values[field]
    });
  }

  constructor(component) {
    super();
    if (!(component instanceof FormBase)) {
      throw new Error('Параметр должен быть экземпляром класса FormBase');
    }
    this._createForm = () => null;
    this._content = [];
    this._createLoader = () => null;
    this._createFooter = () => null;
    this._component = component;
    this._requiredFields = [];
  }

  getLabel(fieldName, isRequired, align) {
    return (
      <p className={`ds-field-name ${styles.verticalAlignTop}`}>
        {fieldName}
        {isRequired && ' *'}
      </p>
    );
  }

  buildForm(requiredFields = []) {
    if (requiredFields.length) {
      this._requiredFields = requiredFields;
    }
    this._createForm = () => (
      <React.Fragment>
        {this._createLoader()}
        <ul className="form">{this._content.map(createElement => createElement())}</ul>
        {this._createFooter()}
      </React.Fragment>
    );
    return this._createForm;
  }

  buildInfo(DomainVO, fieldDomain) {
    this._content.push(() => (
      <li>
        <p className="ds-field-name">{DomainVO.name}</p>
        <p className="ds-field-value">{fieldDomain.value}</p>
      </li>
    ));
  }

  buildInput(DomainVO, initialFieldDomain = { value: '' }, isRequired = false) {
    const input = () => (
      <li>
        {this.getLabel(DomainVO.name, isRequired)}
        <div className="group">
          <Text
            field={DomainVO.field}
            title={DomainVO.hint}
            initialValue={initialFieldDomain && initialFieldDomain.value}
            className={FormBuilder.createInputClasses(this._formState, DomainVO.field)}
            placeholder={DomainVO.placeholder}
            mask={DomainVO.mask}
            validate={DomainVO.validate}
            validateOnChange
            validateOnBlur
          />
          <span className="ds-field-name bottom error">
            {this._formState.errors[DomainVO.field]}
          </span>
        </div>
      </li>
    );

    this._content.push(input);
  }

  buildAutocomplete(
    DomainVO,
    initialFieldDomain = { value: '' },
    isRequired = false,
    captionField = '',
    width,
    align = LEFT
  ) {
    const serverErrorMsg = get(this._component.state.errors, DomainVO.field);

    if (isRequired) {
      this._requiredFields.push(DomainVO.field);
    }
    const acService = AutocompleteService[DomainVO.field];
    const handleItemSelect = ajaxResponseValues => selectedValue => {
      if (ajaxResponseValues) {
        this._formApi.setValue(DomainVO.field, selectedValue);
        const selectedItem = ajaxResponseValues.rows.find(
          item => item[acService.field] === selectedValue
        );

        this._component.setState({ [DomainVO.field]: selectedItem });
      }
    };

    const handleAutocompleteValidate = DomainField => res => inputValue => {
      if (res === null) {
        return undefined;
      }

      if (!inputValue) {
        this._component.setState({ [DomainVO.field]: '' });
        return !isRequired ? undefined : 'Введите значение';
      }

      const filteredRes = res.filter(item => {
        return item.toLowerCase().includes(inputValue.toLowerCase());
      });

      if (filteredRes.length === 1) {
        this._component.setState({ [DomainVO.field]: inputValue });
        return undefined;
      }

      if (filteredRes.length > 1 || filteredRes.length === 0) {
        this._component.setState({ [DomainVO.field]: inputValue });

        if (filteredRes.some(item => item === inputValue)) {
          return undefined;
        } else {
          return 'Выберите значение из выпадающего списка';
        }
      }
      // comment for merging
      return undefined;
    };

    const autocompleteState = this._component.state[DomainVO.field];

    const caption = captionField && autocompleteState && autocompleteState[captionField] && (
      <p className={`caption ${styles.caption}`}>{autocompleteState[captionField]}</p>
    );

    const autocomplete = () => {
      const formStateErrorMsg = this._formState && this._formState.errors[DomainVO.field];
      const errorMsg =
        (typeof serverErrorMsg === 'string' && serverErrorMsg) ||
        (typeof formStateErrorMsg === 'string' && formStateErrorMsg);
      return (
        <li>
          {this.getLabel(DomainVO.name, isRequired, align)}
          <div className="group">
            <Autocomplete
              doAjax={acService.request}
              formatAjaxRes={res => res.rows.map(row => row[acService.field])}
              handleItemSelect={handleItemSelect}
              handleAutocompleteValidate={handleAutocompleteValidate(DomainVO.field)}
            >
              <Text
                field={DomainVO.field}
                title={DomainVO.hint}
                initialValue={initialFieldDomain && initialFieldDomain.value}
                className={FormBuilder.createInputClasses(this._formState, DomainVO.field)}
                style={{ width }}
                placeholder={DomainVO.placeholder}
                mask={DomainVO.mask}
                validateOnChange
                validateOnBlur
              />
            </Autocomplete>
            <span className="ds-field-name bottom error">{errorMsg}</span>

            {!errorMsg && caption}
          </div>
        </li>
      );
    };
    this._content.push(autocomplete);
    return autocomplete;
  }

  buildLoader() {
    this._createLoader = () => this._component.state.isBusy && <Loading isRelative={false} />;

    return this._createLoader;
  }

  buildSubmit(lbl, submitCallback = null, handleErrorCb = null) {
    let submitHandler = submitCallback;
    let handleError = handleErrorCb;

    if (!submitHandler) {
      submitHandler = submitCb => () => {
        this._component.checkCompleteness(this._formState, this._requiredFields);

        if (!handleError) {
          handleError = (field, value) => {
            if (typeof value === 'object') {
              Object.entries(value).forEach(([key, value]) => handleError(key, value[0]));
              return;
            }
            if (isNaN(+field) && field !== 'status') {
              this._formApi.setError(field, capitalize(value));
            }
          };
        }

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
          deepmerge(this._formState.values, this._component.state, {
            arrayMerge: combineMerge
          }),
          handleError
        );
      };
    }

    this._createFooter = () => (
      <div className="ds-toolbar-wrapper">
        <div className="ds-toolbar">
          <Button
            colorClass={PRIMARY}
            iconClass={ICON.accept}
            onClick={submitHandler(this._component.submit)}
          >
            {lbl}
          </Button>
        </div>
      </div>
    );
  }

  @autobind
  onChange() {
    this._component.checkCompleteness(this._formState, this._requiredFields);
  }

  getForm() {
    return (
      <Form onChange={this.onChange}>
        {({ formState, formApi }) => {
          this._formApi = formApi;
          this._formState = formState;
          return this._createForm();
        }}
      </Form>
    );
  }

  get formApi() {
    return this._formApi;
  }
  get formState() {
    return this._formState;
  }
  get content() {
    return this._content;
  }
  get component() {
    return this._component;
  }
}

export default FormBuilder;
