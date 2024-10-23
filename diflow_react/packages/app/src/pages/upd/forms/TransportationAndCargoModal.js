import React, { Component } from 'react';
import Modal from '../../../common/modal/Modal';
import Button, { PRIMARY } from '../../../common/Button';
import PropTypes from 'prop-types';
import { CLEAR, SAVE, CHANGE } from '../../../common/Lbl';
import { ICON } from '@distate/components';
import formBuilderStyles from '../../../common/form/documents/DocumentFormBuilder.module.css';
import styles from './TransportationAndCargoModal.module.css';
import classNames from 'classnames';
import autobind from 'autobind-decorator';
import Text from '../../../common/form/components/Text';
import { TOP } from '../../../common/Placement';
import get from 'get-value';
import set from 'set-value';
import { clone } from '../../../utils/ObjectUtil';
import OperationInformation from '@distate/core/dist/domain/documents/upd/vo/transfer/OperationInformation';
import TransferBasisType from '@distate/core/dist/domain/documents/upd/vo/transfer/TransferBasisType';
import ArrayGroup from './ArrayGroup';

class TransportationAndCargoModal extends Component {
  static propTypes = {
    DomainVO: PropTypes.func.isRequired,
    setDataToFormState: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    customClasses: PropTypes.string.isRequired,
    waybillError: PropTypes.string,
    clearFieldError: PropTypes.func.isRequired,
    errors: PropTypes.array,
    clearParentState: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      chosenData: '',
      fieldsValues: {},
      basisErrors: [],
      operationInformationErrors: null
    };

    this.formScope = props.scope || props.DomainVO.field;
    this.requiredFields = [`${this.formScope}.${OperationInformation.field}`];
  }

  componentDidMount() {
    this.setInitialValues(true);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setInitialValues();
    }

    if (prevProps.errors !== this.props.errors) {
      this.updateServerErrors();
    }
  }

  updateServerErrors() {
    const serverErrors = get(this.props, 'errors');

    if (serverErrors?.operationInformation) {
      const operationInformationErrors = serverErrors.operationInformation.errors[0];
      this.setState({ operationInformationErrors });
    }

    if (serverErrors?.basis) {
      this.handleBasisErrorsChange(serverErrors.basis, true);
    }
  }

  @autobind
  handleBasisErrorsChange(errors, server) {
    this.setState({ basisErrors: errors });
  }

  hasErrors() {
    const { basisErrors, operationInformationErrors } = this.state;

    const hasOperationInformationErrors = operationInformationErrors || null;
    const hasBasisErrors = Object.keys(basisErrors).some(itemNum => {
      for (const item in basisErrors[itemNum]) {
        if (basisErrors[itemNum][item].errors?.length > 0) {
          return true;
        }
      }
      return false;
    });

    return hasBasisErrors || hasOperationInformationErrors;
  }

  setInitialValues(isFormStateNeedUpdate) {
    const {
      initialValues: { operationInformation, basis },
      setDataToFormState
    } = this.props;
    const fieldsValues = {};

    set(fieldsValues, `${this.formScope}.${OperationInformation.field}`, operationInformation);
    set(fieldsValues, `${this.formScope}.${TransferBasisType.field}`, basis);

    if (isFormStateNeedUpdate) setDataToFormState({ operationInformation, basis });
    if (operationInformation) this.setState({ chosenData: operationInformation });
    if (basis) this.setState({ fieldsValues });
  }

  @autobind
  editModalFields() {
    this.props.clearFieldError('waybill');
    this.props.clearFieldError('transferDetails');
    this.showModal();
  }

  @autobind
  showModal() {
    this.setState({ isShowModal: true });
  }

  @autobind
  hideModal() {
    this.setState({ isShowModal: false });
  }

  getFieldValue(Domain, scope) {
    const path = scope ? `${scope}.${Domain.field}` : Domain.field;
    const fieldValue = get(this.state.fieldsValues, path);
    return fieldValue;
  }

  handleFieldValue = (Domain, scope) => value => {
    const fieldsValues = clone(this.state.fieldsValues);
    const path = scope ? `${scope}.${Domain.field}` : Domain.field;
    set(fieldsValues, path, value);
    if (Domain.field === OperationInformation.field) {
      const operationInformationErrors = Domain.validate(value);
      this.setState({ operationInformationErrors });
    }
    this.setState({ fieldsValues });
  };

  @autobind
  handleSaveBtnClick() {
    const { setDataToFormState } = this.props;
    const { fieldsValues } = this.state;

    const operationInformation = get(
      fieldsValues,
      `${this.formScope}.${OperationInformation.field}`
    );
    const sortedInitialBasis = [];
    const sortedBasis = Object.values(
      get(fieldsValues, `${this.formScope}.${TransferBasisType.field}`)
    ).reduce((obj, item, index) => {
      obj[index] = item;
      sortedInitialBasis.push(item);
      return obj;
    }, {});
    this.handleFieldValue(TransferBasisType, this.formScope)(sortedInitialBasis);
    setDataToFormState({ operationInformation, basis: sortedBasis });

    if (operationInformation) {
      this.setState({ chosenData: operationInformation });
    } else {
      this.setState({ chosenData: '' });
    }
    this.hideModal();
  }

  @autobind
  handleClearBtnClick() {
    const { clearParentState } = this.props;

    const initialArrayGroupField = Object.keys(
      get(this.state.fieldsValues, `${this.formScope}.${TransferBasisType.field}.0`)
    ).reduce((obj, prop) => {
      obj[prop] = '';
      return obj;
    }, {});

    const fieldsValues = clone(this.state.fieldsValues);
    set(fieldsValues, `${this.formScope}.${OperationInformation.field}`, '');
    set(fieldsValues, `${this.formScope}.${TransferBasisType.field}`, [initialArrayGroupField]);

    this.setState({ fieldsValues });
    clearParentState();
  }

  isFieldRequired(Domain, scope) {
    const fieldName = scope ? `${scope}.${Domain.field}` : `${this.formScope}.${Domain.field}`;
    return this.requiredFields.includes(fieldName);
  }

  renderInputField = (DomainVO, scope) => (
    <li className={styles.textControl}>
      <Text
        DomainVO={DomainVO}
        initialValue={this.getFieldValue(DomainVO, scope)}
        onValueChange={this.handleFieldValue(DomainVO, scope)}
        labelAlign={TOP}
        isRequired={this.isFieldRequired(DomainVO, scope)}
        errorMsg={this.state.operationInformationErrors}
      />
    </li>
  );

  renderArrayGroup = (DomainVO, scope) => (
    <ArrayGroup
      domainVO={DomainVO}
      initialValues={this.getFieldValue(DomainVO, scope)}
      returnState={this.handleFieldValue(DomainVO, scope)}
      isFirstRowNameHidden
      requiredFields={[false, false, false, false, false]}
      handleErrorsChange={errors => this.handleBasisErrorsChange(errors, false)}
      errors={this.state.basisErrors}
    />
  );

  render() {
    const { DomainVO, waybillError } = this.props;
    const { isShowModal, chosenData } = this.state;

    const formClasses = classNames('form', formBuilderStyles.modalForm);
    return (
      <>
        <li className={this.props.customClasses}>
          <label className="ds-field-name leftside required">{DomainVO.name}</label>
          <div className="group">
            <div className="ds-input-group">
              {!!chosenData && (
                <p className="ds-field-value predefined" style={{ width: '472px' }}>
                  <span>{this.state.chosenData}</span>
                </p>
              )}
              <Button
                type="button"
                className={classNames({
                  [formBuilderStyles.btnError]: this.hasErrors() || waybillError
                })}
                iconClass={ICON.edit}
                onClick={this.editModalFields}
              >
                {CHANGE}
              </Button>
            </div>
          </div>
          {waybillError && (
            <span class={classNames('ds-field-name', 'bottom', 'error', styles.errorMessage)}>
              {waybillError}
            </span>
          )}
        </li>

        <Modal
          hide={this.hideModal}
          width="880px"
          isVisible={isShowModal}
          key={`${this.formScope}_transportationAndCargoModal`}
        >
          <Modal.Header title={DomainVO.name} className={formBuilderStyles.center} />
          <Modal.Body>
            <ul className={formClasses}>
              {this.renderInputField(OperationInformation, this.formScope)}
              <h3>{TransferBasisType.name}</h3>
              {this.renderArrayGroup(TransferBasisType, this.formScope)}
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

export default TransportationAndCargoModal;
