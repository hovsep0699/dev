import React, { Component } from 'react';
import Modal from '../../../common/modal/Modal';
import autobind from 'autobind-decorator';
import ArrayGroup from './ArrayGroup';
import InfoFieldFact2 from '@distate/core/dist/domain/documents/upd/vo/good/InfoFieldFact2';
import style from '../../../common/form/documents/DocumentFormBuilder.module.css';
import classNames from 'classnames';
import Button, { PRIMARY } from '../../../common/Button';
import { ICON } from '@distate/components';
import { CLEAR, SAVE } from '../../../common/Lbl';
import { set } from 'object-path-immutable';
import PropTypes from 'prop-types';
import get from 'get-value';

class InfoFieldModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      fieldsValues: {},
      errors: [],
      hasErrors: false
    };

    this.formScope = `${props.scope}.${InfoFieldFact2.field}` || InfoFieldFact2.field;
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
    this.handleErrorsChange(serverErrors);
  }

  @autobind
  handleErrorsChange(errors) {
    this.setState({ errors }, this.hasErrors);
  }

  hasErrors() {
    const { errors } = this.state;

    const errorsToTest = errors ? Object.values(errors) : [];

    if (errorsToTest.length > 0) {
      errorsToTest.forEach(errorObj => {
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
    if (Array.isArray(initialValues) && initialValues.length > 0) {
      this.setState({ fieldsValues: initialValues });
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
  handleClearBtnClick() {
    const clearedField = Object.keys(this.state.fieldsValues[0]).reduce((obj, prop) => {
      obj[prop] = '';
      return obj;
    }, {});
    this.setState({ fieldsValues: [clearedField] });
  }

  @autobind
  saveData() {
    const { fieldsValues } = this.state;
    const { setDataToComponentState } = this.props;
    const sortedInitialFieldsValues = [];
    const sortedFieldsValues = Object.values(fieldsValues).reduce((fieldsValues, values, index) => {
      fieldsValues[index] = values;
      sortedInitialFieldsValues.push(values);
      return fieldsValues;
    }, {});
    const newValues = set({}, this.formScope, sortedFieldsValues);
    setDataToComponentState(newValues, this.formScope, false);
    this.setState({ fieldsValues: sortedInitialFieldsValues });
  }

  @autobind
  handleSaveBtnClick() {
    this.saveData();
    this.hideModal();
  }

  @autobind
  handleFieldValues(fieldsValues) {
    this.setState({ fieldsValues });
  }

  render() {
    const { isModalVisible, errors, hasErrors } = this.state;
    const formClasses = classNames('form', style.modalForm, style.center, style.bottomIndent);
    return (
      <>
        <Button
          type="button"
          title={InfoFieldFact2.name}
          iconClass={ICON.tiInfoAlt}
          className={classNames({ [style.btnError]: hasErrors })}
          onClick={this.handleShowModalBtnClick}
        ></Button>

        <Modal
          hide={this.hideModal}
          isVisible={isModalVisible}
          width="600px"
          key={`${this.formScope}_infoFieldModal`}
        >
          <Modal.Header title={InfoFieldFact2.name} className={style.center} />
          <Modal.Body>
            <ul className={formClasses}>
              <ArrayGroup
                isFirstRowNameHidden
                domainVO={InfoFieldFact2}
                scope={this.formScope}
                initialValues={this.state.fieldsValues}
                returnState={this.handleFieldValues}
                handleErrorsChange={this.handleErrorsChange}
                errors={errors}
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

InfoFieldModal.propTypes = {
  setDataToComponentState: PropTypes.func,
  scope: PropTypes.string
};

export default InfoFieldModal;
