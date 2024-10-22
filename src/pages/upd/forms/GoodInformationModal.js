import autobind from 'autobind-decorator';
import classNames from 'classnames';
import deepmerge from 'deepmerge';
import get from 'get-value';
import { set } from 'object-path-immutable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button, { PRIMARY } from '../../../common/Button';
import Select from '../../../common/form/components/select/Select';
import Text from '../../../common/form/components/Text';
import style from '../../../common/form/documents/DocumentFormBuilder.module.css';
import styles from './GoodInformationModal.module.css';
import { ICON } from '@distate/components';
import { CLEAR, SAVE } from '../../../common/Lbl';
import Modal from '../../../common/modal/Modal';
import { TOP } from '../../../common/Placement';
import { combineMerge } from '../../../utils/ObjectUtil';

class GoodInformationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      fieldsValues: {},
      errors: {}
    };

    this.formScope = props.scope ? `${props.scope}.${props.DomainVO.field}` : props.DomainVO.field;
    this.errors = this.props.errors || {};
  }

  componentDidMount() {
    this.setInitialValues();
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.errors) !== JSON.stringify(this.props.errors)) {
      this.updateServerErrors();
    }
  }

  updateServerErrors() {
    const serverErrors = get(this.props, 'errors');
    const errors = deepmerge(this.state.errors, set({}, this.formScope, serverErrors), {
      arrayMerge: combineMerge
    });
    this.setState({ errors });
  }

  setInitialValues() {
    this.setState((state, props) => {
      const initialValues = set(
        this.state.fieldsValues,
        this.formScope,
        props.initialFieldDomain.value
      );
      return { fieldsValues: initialValues || {} };
    });
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

  getDomainPath(Domain) {
    return this.formScope ? `${this.formScope}.${Domain.field}` : `${Domain.field}`;
  }

  @autobind
  getFieldValue(Domain) {
    const { fieldsValues } = this.state;
    return get(fieldsValues, this.getDomainPath(Domain));
  }

  handleFieldValue = Domain => value => {
    const currentFieldsValues = this.state.fieldsValues;
    const path = this.getDomainPath(Domain);
    const oldValue = get(currentFieldsValues, path);
    const fieldsValues = set(currentFieldsValues, path, value);

    if (oldValue !== value) {
      this.validateField(Domain, value);
    }

    this.setState({ fieldsValues });
  };

  validateField = (Domain, value) => {
    const errorPath = this.getDomainPath(Domain);
    const newFieldError = [];
    const errorMsg = Domain.validate(value);

    if (errorMsg) {
      newFieldError.push(errorMsg);
    }

    this.setState({ errors: set(this.state.errors, `${errorPath}.errors`, newFieldError) });
  };

  getFieldErrorMsg = Domain => {
    const path = this.getDomainPath(Domain);
    const error = get(this.state.errors, `${path}.errors`);
    if (Array.isArray(error) && error.length > 0) {
      return error[error.length - 1];
    }
  };

  @autobind
  saveData() {
    const { fieldsValues } = this.state;
    const { setDataToComponentState } = this.props;

    setDataToComponentState(fieldsValues, '', true);
  }

  @autobind
  handleSaveBtnClick() {
    this.saveData();
    this.hideModal();
  }

  @autobind
  handleClearBtnClick() {
    const { DomainVO } = this.props;
    const fiedsToClear = get(this.state.fieldsValues, this.formScope);
    const domainFields = DomainVO.VOs.map(VO => VO.field);
    let clearedFields;

    if (fiedsToClear) {
      clearedFields = Object.keys(fiedsToClear).reduce((obj, key) => {
        if (domainFields.includes(key)) {
          obj[key] = '';
        } else {
          obj[key] = fiedsToClear[key];
        }

        return obj;
      }, {});
    }

    const fieldsValues = set(this.state.fieldsValues, this.formScope, clearedFields);

    this.setState({ fieldsValues });
  }

  render() {
    const { isModalVisible, errors } = this.state;
    const { DomainVO } = this.props;
    const errorsObj = get(errors, this.formScope);
    this.hasErrors = false;

    if (errorsObj) {
      this.hasErrors = Object.values(errorsObj).some(field => {
        return field.errors?.length > 0;
      });
    }

    return (
      <>
        <Button
          type="button"
          title={DomainVO.hint}
          iconClass={ICON.tiPencilAlt}
          className={classNames({ [style.btnError]: this.hasErrors })}
          onClick={this.handleShowModalBtnClick}
        ></Button>

        <Modal
          hide={this.hideModal}
          isVisible={isModalVisible}
          width="600px"
          key={`${this.formScope}_goodInformationModal`}
        >
          <Modal.Header title={DomainVO.name} className={style.center} />

          <Modal.Body>
            <ul className={classNames('form', style.modalForm, style.center, styles.centered)}>
              {DomainVO.VOs.map(VO => {
                if (VO.field === 'kind') {
                  return (
                    <li>
                      <Select
                        DomainVO={VO}
                        labelAlign={TOP}
                        initialValue={this.getFieldValue(VO)}
                        onValueChange={this.handleFieldValue(VO)}
                        errorMsg={this.getFieldErrorMsg(VO)}
                        isRequired
                      />
                    </li>
                  );
                } else {
                  return (
                    <li>
                      <Text
                        DomainVO={VO}
                        labelAlign={TOP}
                        initialValue={this.getFieldValue(VO)}
                        onValueChange={this.handleFieldValue(VO)}
                        errorMsg={this.getFieldErrorMsg(VO)}
                      />
                    </li>
                  );
                }
              })}
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

GoodInformationModal.propTypes = {
  DomainVO: PropTypes.func,
  scope: PropTypes.string
};

export default GoodInformationModal;
