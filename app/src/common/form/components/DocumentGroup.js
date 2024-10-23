import Behavior from '../parameters/Behavior';
import Appearance from '../parameters/Appearance';
import { LEFT, RIGHT, TOP } from '../../Placement';
import Button from '../../Button';
import { ICON } from '@distate/components';
import { ADD, DELETE } from '../../Lbl';
import { ArrayField, Option, Select, Text } from 'informed';
import React from 'react';
import DateInput from './DateInput';
import AutocompleteService from '@distate/core/dist/application/autocomplete/AutocompleteService';
import Autocomplete from '../../autocomplete/Autocomplete';
import get from 'get-value';
import set from 'set-value';
import deepmerge from 'deepmerge';

class DocumentGroup {
  constructor(builder, BuilderClass, styles) {
    this._groups = {};
    this._builder = builder;
    this._content = this._builder.content;
    this._styles = styles;
    this._BuilderClass = BuilderClass;
    this._initialValues = {};
  }

  handleGroup(GroupDomainVO, DomainVO, initialFieldDomain, groupIndex) {
    if (!Array.isArray(this._groups[GroupDomainVO.field])) {
      this._groups[GroupDomainVO.field] = [];
    }
    if (!Array.isArray(this._groups[GroupDomainVO.field][groupIndex])) {
      this._groups[GroupDomainVO.field][groupIndex] = [];
    }

    this._groups[GroupDomainVO.field][groupIndex].push({
      domain: DomainVO,
      initialValue: initialFieldDomain.value
    });
  }

  buildGroup(GroupDomainVO, createElementsMap, behavior, appearance, behaviors, appearances) {
    const isRequired = Object.values(behaviors).some(
      behavior => this._builder.handleBehavior(behavior).isRequired === true
    );
    const { initialFieldDomain } = this._builder.handleBehavior(behavior);

    if (get(initialFieldDomain, 'value')) {
      set(this._initialValues, GroupDomainVO.field, initialFieldDomain.value);
    }

    const inputFields = () =>
      GroupDomainVO.VOs.map(DomainVO => {

        const initialValue =
          {
            value: get(this._initialValues, `${GroupDomainVO.field}.${DomainVO.field}`)
          } || {};
        const behavior = this._builder.handleBehavior(behaviors[DomainVO.field]);
        const groupedFieldBehavior = new Behavior({
          scope: GroupDomainVO.field,
          initialFieldDomain: initialValue,
          ...behavior
        });
        const appearance = this._builder.handleAppearance(appearances[DomainVO.field]);
        const build = createElementsMap[DomainVO.field];
        return build && build.call(this._builder, DomainVO, groupedFieldBehavior, appearance);
      });
    const group = () => (
      <li key={`${GroupDomainVO.field}`}>
        <div className={`group ${this._styles.verticalAlignTop}`}>
          <label className={`ds-field-name top ${this._styles.hidden}`}>{GroupDomainVO.name}</label>
          {this._builder.getLabel(
            GroupDomainVO.name,
            new Behavior({ isRequired }),
            new Appearance({ align: LEFT })
          )}
        </div>
        <div className={this._styles.group}>{inputFields()}</div>
      </li>
    );
    this._content.push(group);
  }

  buildArrayGroup(GroupDomainVO, createElementsMap, behavior, appearance, behaviors, appearances) {
    const { initialFieldDomain } = this._builder.handleBehavior(behavior);
    this._initialValues = {
      ...this._initialValues,
      [GroupDomainVO.field]: initialFieldDomain ? initialFieldDomain.value : [{}]
    };
    const errorMsg = get(this._builder.component.state.errors, `${GroupDomainVO.field}`);

    const BTN_WIDTH = 130;
    // TODO нужно чистить после вызова метода add
    // const clearStartInput = GroupDomainVO => {
    //   GroupDomainVO.VOs.forEach(DomainVO => {
    //     const field = `start_${GroupDomainVO.field}_${DomainVO.field}`;
    //     this._builder.formApi.setValue(field, '');
    //   });
    // };
    const createStartElement = GroupDomainVO => {
      return GroupDomainVO.VOs.map(DomainVO => {
        if (DomainVO.VOs) {
          return createStartElement(DomainVO);
        }
        const inputBuilder = createElementsMap[DomainVO.field].bind(this._builder);
        const behavior = behaviors[DomainVO.field];
        const appearance = appearances[DomainVO.field];

        const { width } = appearances[DomainVO.field];
        return (
          <div
            className="group left"
            key={`start_${GroupDomainVO.field}_${DomainVO.field}`}
            style={{ width }}
          >
            {inputBuilder(GroupDomainVO, DomainVO, undefined, behavior, appearance)()}
          </div>
        );
      });
    };
    const groupStartInput = add => {
      return (
        <li className={appearance.customClasses}>
          <div className="group">
            <label className={`ds-field-name top ${this._styles.hidden}`}>
              {GroupDomainVO.name}
            </label>
            {this._builder.getLabel(
              GroupDomainVO.name,
              new Behavior({ isRequired: false }),
              new Appearance({ align: LEFT })
            )}
          </div>
          <div className={this._styles.group}>
            {createStartElement(GroupDomainVO)}
            <div className="group right">
              <label className={`ds-field-name top ${this._styles.hidden}`}>
                {GroupDomainVO.name}
              </label>
              <Button
                type="button"
                iconClass={ICON.add}
                style={{ width: BTN_WIDTH }}
                onClick={() => {
                  add();
                }}
              >
                {ADD}
              </Button>
            </div>
            <span className="ds-field-name bottom error">
              {(typeof errorMsg === 'string' && errorMsg) ||
                (this._builder.formState && this._builder.formState.errors[GroupDomainVO.field])}
            </span>
          </div>
        </li>
      );
    };
    const deleteBtn = remove => {
      return (
        <Button
          type="button"
          iconClass={ICON.delete}
          style={{ width: BTN_WIDTH }}
          onClick={() => {
            remove();
          }}
        >
          {DELETE}
        </Button>
      );
    };
    const createElement = (GroupDomainVO, index, fields) => {
      return GroupDomainVO.VOs.map(DomainVO => {
        if (DomainVO.VOs) {
          return createElement(DomainVO, index, fields);
        }
        const inputBuilder = createElementsMap[DomainVO.field].bind(this._builder);
        const appearance = appearances[DomainVO.field];

        let valueField;
        if (index === fields.length - 1) {
          valueField = `start_${GroupDomainVO.field}_${DomainVO.field}`;
        } else {
          valueField = `${GroupDomainVO.field}[${index}].${DomainVO.field}`;
        }

        const value = this._builder.formApi.getValue(valueField);

        const initValue =
          this._initialValues[`${GroupDomainVO.field}`] &&
          this._initialValues[`${GroupDomainVO.field}`][index];

        const behavior = new Behavior({
          ...behaviors[DomainVO.field],
          initialFieldDomain: {
            value: value || (initValue && initValue[DomainVO.field])
          }
        });
        const { width } = appearance;
        return (
          <div className="group left" style={{ width }}>
            {inputBuilder(GroupDomainVO, DomainVO, index, behavior, appearance)()}
          </div>
        );
      });
    };
    const groupInputs = fields => {
      let labelIndex = fields.length + 1;
      const straightFieldsArray = fields.map((field, index) => {
        labelIndex--;
        return (
          <li key={field.key} className={appearance.customClasses}>
            {this._builder.getLabel(
              labelIndex,
              new Behavior({ isRequired: false }),
              new Appearance({ align: RIGHT })
            )}
            <div className="group" key={`${field.key}_group`}>
              {createElement(GroupDomainVO, index, fields)}
              <div className="group right" key={`${field.key}_delete`}>
                {deleteBtn(field.remove)}
              </div>
            </div>
          </li>
        );
      });
      return straightFieldsArray.reverse();
    };

    const group = () => (
      <ArrayField
        field={GroupDomainVO.field}
        key={GroupDomainVO.field}
        initialValue={this._initialValues[GroupDomainVO.field]}
      >
        {({ fields, add }) => {
          return (
            <React.Fragment>
              {groupStartInput(add)}
              {groupInputs(fields)}
            </React.Fragment>
          );
        }}
      </ArrayField>
    );
    this._content.push(group);
  }

  buildArrayGroupInput(GroupDomainVO, DomainVO, groupIndex, behavior, appearance) {
    const { isRequired, initialFieldDomain, onChange, showErrorMsg } = this._builder.handleBehavior(
      behavior
    );
    const { customClasses } = this._builder.handleAppearance(appearance);

    let errorMsg = '';
    const groupErrors = get(this._builder.component.state.errors, GroupDomainVO.field);
    if (groupErrors) {
      const obj = groupErrors[groupIndex];
      const field = DomainVO.field;
      const errors = obj && obj[`${field}`];
      errorMsg = errors && errors.errors[0];
    }

    let input, field;
    if (groupIndex !== undefined) {
      this.handleGroup(GroupDomainVO, DomainVO, initialFieldDomain, groupIndex);
      field = `${GroupDomainVO.field}[${groupIndex}].${DomainVO.field}`;
      if (isRequired && !this._builder._requiredFields.includes(field)) {
        this._builder._requiredFields.push(field);
      }
      input = (
        <React.Fragment>
          <Text
            type="text"
            field={field}
            title={DomainVO.hint}
            initialValue={initialFieldDomain && initialFieldDomain.value}
            className={this._BuilderClass.createInputClasses(
              this._builder.formApi,
              field,
              customClasses
            )}
            placeholder={DomainVO.placeholder}
            mask={DomainVO.mask}
            validate={DomainVO.validate}
            validateOnChange
            validateOnBlur
            onChange={onChange}
            autoComplete="off"
          />
          {showErrorMsg && <span className="ds-field-name bottom error">{errorMsg}</span>}
        </React.Fragment>
      );
    } else {
      field = `start_${GroupDomainVO.field}_${DomainVO.field}`;
      input = (
        <React.Fragment>
          {this._builder.getLabel(
            DomainVO.name,
            new Behavior({ isRequired }),
            new Appearance({ align: TOP })
          )}
          <Text
            type="text"
            field={field}
            title={DomainVO.hint}
            initialValue={initialFieldDomain && initialFieldDomain.value}
            className={this._BuilderClass.createInputClasses(
              this._builder.formApi,
              null,
              customClasses
            )}
            placeholder={DomainVO.placeholder}
            mask={DomainVO.mask}
            validate={DomainVO.validate}
            validateOnChange
            validateOnBlur
            onChange={onChange}
          />
        </React.Fragment>
      );
    }
    return () => input;
  }

  buildArrayGroupDateInput(GroupDomainVO, DomainVO, groupIndex, behavior, appearance) {
    const { isRequired, initialFieldDomain, onChange, showErrorMsg } = this._builder.handleBehavior(
      behavior
    );
    let errorMsg = '';
    const groupErrors = get(this._builder.component.state.errors, GroupDomainVO.field);
    if (groupErrors) {
      const obj = groupErrors[groupIndex];
      const field = DomainVO.field;
      const errors = obj && obj[`${field}`];
      errorMsg = errors && errors.errors[0];
    }
    let input, field;
    if (groupIndex !== undefined) {
      this.handleGroup(GroupDomainVO, DomainVO, initialFieldDomain, groupIndex);
      field = `${GroupDomainVO.field}[${groupIndex}].${DomainVO.field}`;
      if (isRequired && !this._builder._requiredFields.includes(field)) {
        this._builder._requiredFields.push(field);
      }
      input = (
        <React.Fragment>
          <DateInput
            field={field}
            title={DomainVO.hint}
            initialValue={initialFieldDomain && initialFieldDomain.value}
            className={this._BuilderClass.createInputClasses(
              this._builder.formApi,
              field,
              `ds-input date ${this._styles.width100}`
            )}
            placeholder={DomainVO.placeholder}
            validate={DomainVO.validate}
            validateOnChange
            validateOnBlur
            onChange={onChange}
          />
          {showErrorMsg && <span className="ds-field-name bottom error">{errorMsg}</span>}
        </React.Fragment>
      );
    } else {
      field = `start_${GroupDomainVO.field}_${DomainVO.field}`;
      input = (
        <React.Fragment>
          {this._builder.getLabel(
            DomainVO.name,
            new Behavior({ isRequired }),
            new Appearance({ align: TOP })
          )}
          <DateInput
            field={field}
            title={DomainVO.hint}
            initialValue={initialFieldDomain && initialFieldDomain.value}
            className={this._BuilderClass.createInputClasses(
              this._builder.formApi,
              null,
              `ds-input date ${this._styles.width100}`
            )}
            placeholder={DomainVO.placeholder}
            validate={DomainVO.validate}
            validateOnChange
            validateOnBlur
            onChange={onChange}
          />
        </React.Fragment>
      );
    }
    return () => input;
  }

  buildArrayGroupAutocomplete(GroupDomainVO, DomainVO, groupIndex, behavior, appearance) {
    const {
      initialFieldDomain,
      onChange,
      scope,
      componentStateAdditionalDataConfig,
      showErrorMsg
    } = this._builder.handleBehavior(behavior);

    const { width, customClasses } = this._builder.handleAppearance(appearance);
    let errorMsg = '';
    const groupErrors = get(this._builder.component.state.errors, GroupDomainVO.field);

    if (groupErrors) {
      const obj = groupErrors[groupIndex];
      const field = DomainVO.field;
      const errors = obj && obj[`${field}`];
      errorMsg = errors && errors.errors[0];
    }

    let autocomplete;
    const acService = AutocompleteService[DomainVO.field];
    const fieldName = scope || DomainVO.field;

    const handleItemSelect = (field, fieldName) => ajaxResponseValues => selectedValue => {
      const formattedData = {};

      const updateFormattedData = selectedItem => {
        if (componentStateAdditionalDataConfig && componentStateAdditionalDataConfig.length) {
          componentStateAdditionalDataConfig.forEach(({ objectPath, acSelector }) => {
            const dataToAdd = get(selectedItem, acSelector) || null;
            set(formattedData, objectPath, dataToAdd);
          });
        } else {
          formattedData[fieldName] = selectedItem ? selectedItem.title : null;
        }
      };

      if (ajaxResponseValues) {
        const selectedItem = ajaxResponseValues.rows.find(item => item.title === selectedValue);
        updateFormattedData(selectedItem);
        this._builder.formApi.setValue(field, selectedItem.title);
      } else {
        updateFormattedData();
      }

      const fieldState = this._builder.component.state[GroupDomainVO.field] || [];

      if (fieldState[groupIndex]) {
        fieldState[groupIndex] = deepmerge(fieldState[groupIndex], formattedData);
      } else {
        fieldState[groupIndex] = formattedData;
      }

      this._builder.component.setState({
        [GroupDomainVO.field]: fieldState
      });
    };

    if (groupIndex !== undefined) {
      const field = `${GroupDomainVO.field}[${groupIndex}].${fieldName}`;

      this.handleGroup(GroupDomainVO, DomainVO, initialFieldDomain, groupIndex);
      autocomplete = (
        <React.Fragment>
          <Autocomplete
            doAjax={acService.request}
            formatAjaxRes={res => res.rows.map(row => row[acService.field])}
            handleItemSelect={handleItemSelect(field, fieldName)}
            width={240}
          >
            <Text
              type="text"
              field={field}
              title={DomainVO.hint}
              initialValue={initialFieldDomain && initialFieldDomain.value}
              className={this._BuilderClass.createInputClasses(
                this._builder.formApi,
                DomainVO.field,
                customClasses
              )}
              placeholder={DomainVO.placeholder}
              mask={DomainVO.mask}
              validate={DomainVO.validate}
              validateOnChange
              validateOnBlur
              onChange={onChange}
            />
          </Autocomplete>
          {showErrorMsg && <span className="ds-field-name bottom error">{errorMsg}</span>}
        </React.Fragment>
      );
    } else {
      // TODO протестить работоспособность этой части (вне таблицы)
      const field = `start_${GroupDomainVO.field}_${fieldName}`;
      autocomplete = (
        <React.Fragment>
          {this._builder.getLabel(
            DomainVO.name,
            new Behavior({ isRequired: false }),
            new Appearance({ align: TOP })
          )}
          <Autocomplete
            doAjax={acService.request}
            formatAjaxRes={res => res.rows.map(row => row[acService.field])}
            handleItemSelect={handleItemSelect(field, fieldName)}
            width={width}
          >
            <Text
              type="text"
              field={field}
              title={DomainVO.hint}
              initialValue={initialFieldDomain && initialFieldDomain.value}
              className={this._BuilderClass.createInputClasses(
                this._builder.formApi,
                null,
                customClasses
              )}
              placeholder={DomainVO.placeholder}
              mask={DomainVO.mask}
              validate={DomainVO.validate}
              validateOnChange
              validateOnBlur
            />
          </Autocomplete>
        </React.Fragment>
      );
    }
    return () => autocomplete;
  }

  buildArrayGroupSelect(GroupDomainVO, DomainVO, groupIndex, behavior, appearance) {
    const { initialFieldDomain, onChange, showErrorMsg } = this._builder.handleBehavior(behavior);
    const { width, customClasses } = this._builder.handleAppearance(appearance);
    let errorMsg = '';
    const groupErrors = get(this._builder.component.state.errors, GroupDomainVO.field);
    if (groupErrors) {
      const obj = groupErrors[groupIndex];
      const field = DomainVO.field;
      const errors = obj && obj[`${field}`];
      errorMsg = errors && errors.errors[0];
    }
    let select;
    const options = DomainVO.options.map(({ value, title }, index) => (
      <Option value={value} key={`${GroupDomainVO.field}[${groupIndex}].${DomainVO.field}${index}`}>
        {title}
      </Option>
    ));
    const placeholderOption = DomainVO.placeholder && (
      <Option
        value=""
        disabled
        key={`${GroupDomainVO.field}[${groupIndex}].${DomainVO.field}.placeholder`}
      >
        {DomainVO.placeholder}
      </Option>
    );
    const initialValue =
      initialFieldDomain && initialFieldDomain.value !== ''
        ? initialFieldDomain.value
        : DomainVO.options[0].value;

    if (groupIndex !== undefined) {
      const field = `${GroupDomainVO.field}[${groupIndex}].${DomainVO.field}`;
      this.handleGroup(GroupDomainVO, DomainVO, initialFieldDomain, groupIndex);
      select = (
        <React.Fragment>
          <Select
            field={field}
            title={DomainVO.hint}
            initialValue={initialValue}
            style={{ width }}
            className={this._BuilderClass.createInputClasses(
              this._builder.formApi,
              DomainVO.field,
              customClasses
            )}
            mask={DomainVO.mask}
            validate={DomainVO.validate}
            validateOnChange
            validateOnBlur
            onChange={onChange}
          >
            {placeholderOption}
            {options}
          </Select>
          {showErrorMsg && <span className="ds-field-name bottom error">{errorMsg}</span>}
        </React.Fragment>
      );
    } else {
      const field = `start_${GroupDomainVO.field}_${DomainVO.field}`;
      select = (
        <React.Fragment>
          {this._builder.getLabel(
            DomainVO.name,
            new Behavior({ isRequired: false }),
            new Appearance({ align: TOP })
          )}
          <Select
            field={field}
            title={DomainVO.hint}
            initialValue={initialValue}
            style={{ width }}
            className={this._BuilderClass.createInputClasses(
              this._builder.formApi,
              DomainVO.field,
              customClasses
            )}
            mask={DomainVO.mask}
            validate={DomainVO.validate}
            validateOnChange
            validateOnBlur
            onChange={onChange}
          >
            {placeholderOption}
            {options}
          </Select>
        </React.Fragment>
      );
    }
    return () => select;
  }

  buildArrayGroupComponent(component) {
    return (GroupDomainVO, DomainVO, groupIndex, behavior, appearance) => {
      const { initialFieldDomain, customFieldName } = this._builder.handleBehavior(behavior);
      let arrayGroupComponent;
      if (groupIndex !== undefined) {
        this.handleGroup(GroupDomainVO, DomainVO, initialFieldDomain, groupIndex);
        const scope = `${GroupDomainVO.field}.${groupIndex}`;
        const domainFieldName = customFieldName || DomainVO.field;
        const initialValue = get(
          this._builder._component.state,
          `${GroupDomainVO.field}.${groupIndex}.${domainFieldName}`
        );
        const componentBehavior = Behavior.mixin(behavior, {
          scope,
          initialFieldDomain: { value: initialValue }
        });
        arrayGroupComponent = this._builder.buildComponent(component)(
          DomainVO,
          componentBehavior,
          appearance
        );
      }
      return () => arrayGroupComponent;
    };
  }

  buildArrayGroupModal(GroupDomainVO, DomainVO, groupIndex, behavior, appearance) {
    const { initialFieldDomain, modalBuilder } = this._builder.handleBehavior(behavior);
    let modal;
    if (groupIndex !== undefined) {
      const scope = `${GroupDomainVO.field}[${groupIndex}].${DomainVO.field}`;
      this.handleGroup(GroupDomainVO, DomainVO, initialFieldDomain, groupIndex);
      modal = modalBuilder(this._builder, scope);
    } else {
      const scope = `start_${GroupDomainVO.field}_${DomainVO.field}`;
      modal = (
        <React.Fragment>
          {this._builder.getLabel(DomainVO.name, new Behavior(), new Appearance({ align: TOP }))}
          {modalBuilder(this._builder, scope)}
        </React.Fragment>
      );
    }
    return () => modal;
  }
}

export default DocumentGroup;
