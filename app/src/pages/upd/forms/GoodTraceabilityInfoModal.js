import React, { Component } from 'react';
import Modal from '../../../common/modal/Modal';
import autobind from 'autobind-decorator';
import ArrayGroup from './ArrayGroup';
import Button, { PRIMARY } from '../../../common/Button';
import { ICON } from '@distate/components';
import { CLEAR, SAVE } from '../../../common/Lbl';
import GoodTraceabilityInfo from '@distate/core/dist/domain/documents/upd/vo/good/GoodTraceabilityInfo';
import style from '../../../common/form/documents/DocumentFormBuilder.module.css';
import classNames from 'classnames';
import RadioGroup from '../../../common/form/components/radio/RadioGroup';
import Tracking from '@distate/core/dist/domain/documents/upd/vo/good/information/tracking/Tracking';
import IdentificationNumbers from '@distate/core/dist/domain/documents/upd/vo/good/information/identificationNumbers/IdentificationNumbers';
import { set } from 'object-path-immutable';
import PropTypes from 'prop-types';
import ProductNotSubjectToLabelingOrTraceability from '@distate/core/dist/domain/common/options/ProductNotSubjectToLabelingOrTraceability';
import ProductTraceabilityInformation from '@distate/core/dist/domain/common/options/ProductTraceabilityInformation';
import ProductIdentificationNumber from '@distate/core/dist/domain/common/options/ProductIdentificationNumber';
import get from 'get-value';

class GoodTraceabilityInfoModal extends Component {
  static propTypes = {
    errors: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      activeFields: null,
      hasErrors: false,
      isModalVisible: false,
      radioValue: ProductNotSubjectToLabelingOrTraceability.value,

      trackingErrors: [],
      trackingFields: {},
      trackingFieldsToSend: {},

      identificationNumbersErrors: [],
      identificationNumbersFields: {},
      identificationNumbersFieldsToSend: {}
    };

    this.formScope = `${props.scope}`;
    this.trackingPath = `${this.formScope}.${Tracking.field}`;
    this.identificationNumbersPath = `${this.formScope}.${IdentificationNumbers.field}`;
  }

  componentDidMount() {
    this.setInitialValues();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setInitialValues();
    }
    if (JSON.stringify(prevProps.errors) !== JSON.stringify(this.props.errors)) {
      this.updateServerErrors();
    }
  }

  updateServerErrors() {
    const serverErrors = get(this.props, 'errors');

    if (serverErrors?.tracking) {
      this.handleTrackingErrorsChange(serverErrors.tracking);
    }

    if (serverErrors?.identificationNumbers) {
      this.handleIdentificationNumbersErrorsChange(serverErrors.identificationNumbers, true);
    }
  }

  @autobind
  handleTrackingErrorsChange(errors) {
    const errorsObj = Array.isArray(errors) ? { ...errors } : errors;

    const trackingErrors = Object.keys(errorsObj).reduce((newErrors, currentKey) => {
      newErrors[currentKey] = {
        additionalIndicator: errorsObj[currentKey].additionalIndicator,
        measurement: errorsObj[currentKey].measurementTitle
          ? errorsObj[currentKey].measurementTitle
          : errorsObj[currentKey].measurement,
        measurementValue: errorsObj[currentKey].measurementValue,
        number: errorsObj[currentKey].number
      };

      return newErrors;
    }, {});

    this.setState({ trackingErrors }, this.hasErrors(trackingErrors));
  }

  @autobind
  handleIdentificationNumbersErrorsChange(errors, isServer = false) {
    const errorsObj = Array.isArray(errors) ? { ...errors } : errors;

    const identificationNumbersErrors = Object.keys(errorsObj).reduce((newErrors, currentKey) => {
      newErrors[currentKey] = {
        collection: isServer
          ? errorsObj[currentKey].numbers.collection
          : errorsObj[currentKey].collection,
        numbers: errorsObj[currentKey].numbers,
        type: isServer ? errorsObj[currentKey].numbers.type : errorsObj[currentKey].type
      };

      return newErrors;
    }, {});

    this.setState({ identificationNumbersErrors }, this.hasErrors(identificationNumbersErrors));
  }

  hasErrors(errors) {
    const trackingErrArr = errors ? Object.values(errors) : [];

    if (trackingErrArr.length > 0) {
      trackingErrArr.forEach(errorObj => {
        if (errorObj) {
          const hasErrors = Object.values(errorObj).some(field => {
            return field && field.errors?.length > 0;
          });

          this.setState({ hasErrors });
          return;
        }
      });
    }
  }

  setInitialValues() {
    const initialValues = get(this.props, 'initialFieldDomain.value');
    const identificationNumbers = initialValues?.identificationNumbers;
    const tracking = initialValues?.tracking;

    if (Array.isArray(identificationNumbers) && identificationNumbers.length > 0) {
      const identificationNumbersFields = identificationNumbers.map(item => ({
        packNumber: item.packNumber,
        type: item.numbers?.type,
        collection: item.numbers?.collection.join('\n')
      }));

      this.setState({
        identificationNumbersFields,
        activeFields: 'identificationNumbersFields',
        radioValue: ProductIdentificationNumber.value,
        identificationNumbersFieldsToSend: identificationNumbers
      });
    }

    if (Array.isArray(tracking) && tracking.length > 0) {
      const trackingFields = tracking.map(item => ({
        additionalIndicator: item.additionalIndicator,
        measurement: {
          code: item.measurementCode,
          title: item.measurementTitle
        },
        measurementValue: item.measurementValue,
        number: item.number
      }));

      this.setState({
        trackingFields,
        activeFields: 'trackingFields',
        radioValue: ProductTraceabilityInformation.value,
        trackingFieldsToSend: tracking
      });
    }
  }

  @autobind
  showModal() {
    this.setState({ isModalVisible: true });
  }

  @autobind
  hideModal() {
    this.setState({ isModalVisible: false });
  }

  @autobind
  handleShowModalBtnClick() {
    this.showModal();
  }

  @autobind
  handleTrackingFieldsValues(trackingFields) {
    const trackingFieldsToSend = Object.keys(trackingFields).reduce((obj, key) => {
      const { additionalIndicator, measurement, measurementValue, number } = trackingFields[key];
      obj[key] = {
        additionalIndicator: additionalIndicator || '',
        measurementCode: measurement?.code || '',
        measurementTitle: measurement?.title || '',
        measurementValue: measurementValue || '',
        number: number || ''
      };
      return obj;
    }, {});

    this.setState({ trackingFields, trackingFieldsToSend });
  }

  @autobind
  handleIdentificationNumbersFieldsValues(identificationNumbersFields) {
    const identificationNumbersFieldsToSend = Object.keys(identificationNumbersFields).reduce(
      (obj, key) => {
        const { packNumber, type, collection } = identificationNumbersFields[key];
        obj[key] = {
          packNumber,
          numbers: {
            type,
            collection: collection?.split('\n')
          }
        };
        return obj;
      },
      {}
    );

    this.setState({ identificationNumbersFields, identificationNumbersFieldsToSend });
  }

  @autobind
  handleRadioChange(value) {
    if (value === ProductTraceabilityInformation.value) {
      this.setState({ activeFields: 'trackingFields' });
    } else if (value === ProductIdentificationNumber.value) {
      this.setState({ activeFields: 'identificationNumbersFields' });
    } else {
      this.setState({ activeFields: null });
    }
  }

  @autobind
  handleClearBtnClick() {
    const { activeFields } = this.state;
    if (activeFields) {
      const cleanFields = Object.keys(this.state[activeFields][0]).reduce((obj, prop) => {
        obj[prop] = '';
        return obj;
      }, {});
      this.setState({ [activeFields]: [cleanFields] });
    }
  }

  getSortedFields(activeFields) {
    const sortedInitialFieldsValues = Object.values(this.state[activeFields]).map(
      fieldsValues => fieldsValues
    );
    const sortedInitialFieldsValuesToSend = [];
    const sortedFieldsValuesToSend = Object.values(this.state[`${activeFields}ToSend`]).reduce(
      (fieldsValues, values, index) => {
        fieldsValues[index] = values;
        sortedInitialFieldsValuesToSend.push(values);
        return fieldsValues;
      },
      {}
    );

    return { sortedInitialFieldsValues, sortedFieldsValuesToSend, sortedInitialFieldsValuesToSend };
  }

  saveData = async () => {
    const { setDataToComponentState } = this.props;
    const { activeFields } = this.state;

    if (activeFields) {
      const savePath =
        activeFields === 'trackingFields' ? this.trackingPath : this.identificationNumbersPath;
      const removalPath =
        activeFields === 'trackingFields' ? this.identificationNumbersPath : this.trackingPath;
      const {
        sortedInitialFieldsValues,
        sortedFieldsValuesToSend,
        sortedInitialFieldsValuesToSend
      } = this.getSortedFields(activeFields);
      const valuesToSave = set({}, savePath, sortedFieldsValuesToSend);

      await setDataToComponentState(valuesToSave, savePath, false);
      await setDataToComponentState(null, removalPath, false);

      this.setState({
        [activeFields]: sortedInitialFieldsValues,
        [`${activeFields}ToSend`]: sortedInitialFieldsValuesToSend
      });
    }
  };

  @autobind
  handleSaveBtnClick() {
    this.saveData();
    this.hideModal();
  }

  render() {
    const {
      isModalVisible,
      activeFields,
      radioValue,
      trackingFields,
      identificationNumbersFields,
      trackingErrors,
      identificationNumbersErrors,
      hasErrors
    } = this.state;

    const formClasses = classNames(
      'form',
      style.modalForm,
      style.center,
      style.bottomIndent,
      style.hideFirstHr,
      style.rightIndent
    );

    return (
      <>
        <Button
          type="button"
          title={GoodTraceabilityInfo.name}
          iconClass={ICON.tiStamp}
          className={classNames({ [style.btnError]: hasErrors })}
          onClick={this.handleShowModalBtnClick}
        ></Button>

        <Modal
          hide={this.hideModal}
          isVisible={isModalVisible}
          width="700px"
          key={`${this.formScope}_goodTraceabilityInfoModal`}
        >
          <Modal.Header title={GoodTraceabilityInfo.name} className={style.center} />
          <Modal.Body>
            <ul className={formClasses}>
              <li>
                <RadioGroup
                  DomainVO={GoodTraceabilityInfo}
                  onChange={this.handleRadioChange}
                  initialValue={radioValue}
                  isBlock={true}
                  isWidthAuto={true}
                />
              </li>

              <ArrayGroup
                isFirstRowNameHidden
                domainVO={Tracking}
                scope={this.formScope}
                initialValues={trackingFields}
                returnState={this.handleTrackingFieldsValues}
                isHidden={activeFields !== 'trackingFields'}
                requiredFields={[true, true, true, false]}
                handleErrorsChange={this.handleTrackingErrorsChange}
                errors={trackingErrors}
              />

              <ArrayGroup
                isFirstRowNameHidden
                domainVO={IdentificationNumbers}
                scope={this.formScope}
                initialValues={identificationNumbersFields}
                returnState={this.handleIdentificationNumbersFieldsValues}
                isHidden={activeFields !== 'identificationNumbersFields'}
                requiredFields={[false, true, true]}
                handleErrorsChange={this.handleIdentificationNumbersErrorsChange}
                errors={identificationNumbersErrors}
              />
            </ul>
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
      </>
    );
  }
}

GoodTraceabilityInfoModal.propTypes = {
  setDataToComponentState: PropTypes.func,
  scope: PropTypes.string
};

export default GoodTraceabilityInfoModal;
