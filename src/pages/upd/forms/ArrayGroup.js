import React, { useState, useEffect, useRef } from 'react';
import styles from './ArrayGroup.module.css';
import classNames from 'classnames';
import Text from '../../../common/form/components/Text';
import Textarea from '../../../common/form/components/Textarea';
import { TOP } from '../../../common/Placement';
import DateInputNew from '../../../common/form/components/DateInputNew';
import { DELETE, ADD } from '../../../common/Lbl';
import PropTypes from 'prop-types';
import MeasurementAutocomplete from '../fields/MeasurementAutocomplete';
import Select from '../../../common/form/components/select/Select';
import get from 'get-value';
import { set as setImmutable } from 'object-path-immutable';

const ArrayGroup = ({
  returnState,
  initialValues,
  isFirstRowNameHidden = false,
  domainVO,
  hasFixedWidthFields = false,
  isHidden = false,
  requiredFields,
  errors = {},
  handleErrorsChange = () => {}
}) => {
  const initialFields = domainVO.VOs.reduce((obj, DomainVO) => {
    obj[DomainVO.field] = '';
    return obj;
  }, {});
  const initialFieldsAmount = domainVO.VOs.length;
  const defaultState = { 0: initialFields };
  const [stateValues, setStateValues] = useState(defaultState);
  const hasInitialValues = Array.isArray(initialValues) && initialValues.length > 0;
  const totalRows = useRef(0);
  if (hasInitialValues) totalRows.current = initialValues.length;
  const newState =
    hasInitialValues &&
    initialValues.reduce((newValues, value, index) => {
      if (initialValues.length === 1 && Object.values(value).every(val => val === '')) {
        return { ...defaultState };
      } else {
        newValues[index] = value;
        return { ...newValues };
      }
    }, {});
  const isRowNumberVisible = Object.keys(stateValues).length > 0 && totalRows.current > 0;
  const checkedRequiredFields =
    Array.isArray(requiredFields) && requiredFields.length > 0 && requiredFields;

  const addRow = fieldsData => {
    totalRows.current += 1;
    setStateValues({
      ...stateValues,
      [totalRows.current]: { ...initialFields }
    });
  };

  const discardProp = (obj, key) => {
    const leftValues = Object.keys(obj).reduce((newValues, currentKey) => {
      if (currentKey !== key) newValues[currentKey] = obj[currentKey];
      return newValues;
    }, {});
    return leftValues;
  };

  const removeRow = key => {
    handleErrorsChange(discardProp(errors, key));
    setStateValues(discardProp(stateValues, key));
  };

  const handleBtnClick = (fieldsData, key) => {
    if (parseInt(key, 10) === 0) {
      addRow(fieldsData);
    } else {
      removeRow(key);
    }
  };

  const changeValue = (fieldData, DomainVO, key) => {
    const fieldName = DomainVO.field;
    const updatedValues = Object.keys(stateValues).reduce((newValues, currentKey) => {
      newValues[currentKey] = stateValues[currentKey];
      if (currentKey === key) {
        newValues[currentKey][fieldName] = fieldData;
        validateField(DomainVO, key, fieldData);
      }
      return newValues;
    }, {});

    setStateValues(updatedValues);
  };

  const validateField = (Domain, key, value) => {
    const newFieldErrors = [];
    const errorMsg = Domain.validate(value);
    if (errorMsg) {
      newFieldErrors.push(errorMsg);
    }
    const updatedErrors = setImmutable(errors, `${key}.${Domain.field}.errors`, newFieldErrors);
    handleErrorsChange(updatedErrors);
  };

  const getFieldErrorMsg = (Domain, itemNumber) => {
    const fieldErrors = get(errors, `${itemNumber}.${Domain.field}.errors`);
    if (Array.isArray(fieldErrors) && fieldErrors.length > 0) {
      return fieldErrors[fieldErrors.length - 1];
    }
  };

  const renderDateField = (DomainVO, itemNumber, isRequired) => (
    <DateInputNew
      DomainVO={DomainVO}
      labelAlign={TOP}
      initialValue={stateValues[itemNumber][DomainVO.field]}
      onValueChange={value => changeValue(value, DomainVO, itemNumber)}
      hasLabel={false}
      isRequired={isRequired}
      errorMsg={getFieldErrorMsg(DomainVO, itemNumber)}
    />
  );

  const renderSelectField = (DomainVO, itemNumber, isRequired) => (
    <Select
      DomainVO={DomainVO}
      labelAlign={TOP}
      initialValue={stateValues[itemNumber][DomainVO.field]}
      onValueChange={value => changeValue(value, DomainVO, itemNumber)}
      hasLabel={false}
      selectorWidth="100%"
      isRequired={isRequired}
      errorMsg={getFieldErrorMsg(DomainVO, itemNumber)}
    />
  );

  const renderAutocomplete = (DomainVO, itemNumber, isRequired) => (
    <MeasurementAutocomplete
      labelAlign={TOP}
      initialValue={stateValues[itemNumber][DomainVO.field].title}
      onValueChange={value => changeValue(value, DomainVO, itemNumber)}
      hasLabel={false}
      isRequired={isRequired}
      errorMsg={getFieldErrorMsg(DomainVO, itemNumber)}
    />
  );

  const renderTextarea = (DomainVO, itemNumber, isRequired) => (
    <Textarea
      DomainVO={DomainVO}
      labelAlign={TOP}
      initialValue={stateValues[itemNumber][DomainVO.field]}
      onValueChange={value => changeValue(value, DomainVO, itemNumber)}
      hasLabel={false}
      isRequired={isRequired}
      errorMsg={getFieldErrorMsg(DomainVO, itemNumber)}
    />
  );

  const renderInputField = (DomainVO, itemNumber, isRequired) => (
    <Text
      DomainVO={DomainVO}
      labelAlign={TOP}
      initialValue={stateValues[itemNumber][DomainVO.field]}
      onValueChange={value => changeValue(value, DomainVO, itemNumber)}
      hasLabel={false}
      isRequired={isRequired}
      errorMsg={getFieldErrorMsg(DomainVO, itemNumber)}
    />
  );

  const renderFormFields = (groupDomainVO, itemNumber) => {
    return groupDomainVO.VOs.map((DomainVO, index) => {
      const isRequired = checkedRequiredFields[index];
      if (DomainVO.type === 'date') {
        return renderDateField(DomainVO, itemNumber, isRequired);
      } else if (DomainVO.type === 'select') {
        return renderSelectField(DomainVO, itemNumber, isRequired);
      } else if (DomainVO.type === 'autocomplete') {
        return renderAutocomplete(DomainVO, itemNumber, isRequired);
      } else if (DomainVO.type === 'textarea') {
        return renderTextarea(DomainVO, itemNumber, isRequired);
      } else {
        return renderInputField(DomainVO, itemNumber, isRequired);
      }
    });
  };

  useEffect(() => {
    if (newState) {
      setStateValues(newState);
      returnState(newState);
    } else {
      returnState(stateValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateValues, initialValues]);

  return Object.entries(stateValues).map((item, index) => {
    const isFirstRow = index === 0;
    const removableRow = index > 0;
    const itemNumber = item[0];
    return (
      <li className={classNames({ [styles.hidden]: isHidden })}>
        {isFirstRow && (
          <div
            className={classNames(styles.customLabels, {
              [styles.narrowLeftIndent]: isFirstRowNameHidden,
              [styles.fullWidth]: isFirstRowNameHidden,
              [styles.fixedWidth]: hasFixedWidthFields
            })}
          >
            {domainVO.VOs.map((DomainVO, index) => (
              <div
                className={classNames(
                  'ds-field-name',
                  'top',
                  styles.customLabel,
                  styles[`customLabelCol${initialFieldsAmount}`],
                  { required: checkedRequiredFields[index] }
                )}
              >
                {DomainVO.name}
              </div>
            ))}
          </div>
        )}

        <div className={classNames('group', styles.alignTop)}>
          <div
            className={classNames('ds-field-name', {
              [styles.rowNameNarrow]: isFirstRowNameHidden
            })}
          >
            {isFirstRow && !isFirstRowNameHidden && (
              <span className={styles.longLable}>{domainVO.name}</span>
            )}

            {isRowNumberVisible && <span className="right">{index + 1}</span>}
          </div>
        </div>

        <div
          className={classNames('group', styles.noMargin, {
            [styles.fullWidth]: !hasFixedWidthFields
          })}
        >
          <div
            className={classNames(
              'group',
              styles.inputGroup,
              styles[`fieldCols${initialFieldsAmount}`],
              styles.alignChildrenTop,
              {
                [styles.fixedWidth]: hasFixedWidthFields
              }
            )}
          >
            {renderFormFields(domainVO, itemNumber)}
          </div>

          <div className={classNames('group', styles.alignTop)}>
            <button
              className={classNames('ds-button', {
                'icon-add': !removableRow,
                'icon-delete': removableRow
              })}
              type="button"
              style={{ width: 130 }}
              onClick={() => handleBtnClick(item[1], item[0])}
            >
              {removableRow ? DELETE : ADD}
            </button>
          </div>
        </div>
      </li>
    );
  });
};

ArrayGroup.defaultProps = {
  hasFixedWidthFields: false,
  isFirstRowNameHidden: false
};

ArrayGroup.propTypes = {
  returnState: PropTypes.func.isRequired,
  initialValues: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  hasFixedWidthFields: PropTypes.bool,
  isFirstRowNameHidden: PropTypes.bool,
  domainVO: PropTypes.object,
  scope: PropTypes.string,
  requiredFields: PropTypes.arrayOf(PropTypes.bool)
};

export default ArrayGroup;
