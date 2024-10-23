import FormBuilderBase from './FormBuilderBase';
import React from 'react';
import Button, { PRIMARY } from '../Button';
import { ICON } from '@distate/components';
import FormBase from './FormBase';

class AgreeFormBuilder extends FormBuilderBase {
  constructor(component) {
    super();
    if (!(component instanceof FormBase)) {
      throw new Error('Параметр должен быть экземпляром класса FormBase');
    }
    this._createForm = () => null;
    this._createFooter = () => null;
    this._component = component;
  }

  buildButton(lbl) {
    this._createFooter = () => (
      <div className="ds-toolbar-wrapper">
        <div className="ds-toolbar">
          <Button
            colorClass={PRIMARY}
            iconClass={ICON.accept}
            onClick={() => this._component.setState({ isShowModal: true })}
          >
            {lbl}
          </Button>
        </div>
      </div>
    );
  }

  buildModal(Modal) {
    this._createModal = () => {
      const modal = (
        <Modal
          agree={this._component.agreeCallback}
          disagree={this._component.disagreeCallback}
          hide={() => {
            this._component.setState({ isShowModal: false });
          }}
        />
      );
      return this._component.state.isShowModal ? modal : null;
    };
  }

  buildForm() {
    this._createForm = () => (
      <React.Fragment>
        {this._createFooter()}
        {this._createModal()}
      </React.Fragment>
    );
    return this._createForm;
  }

  getForm() {
    return this._createForm();
  }

  get content() {
    return this._content;
  }
}

export default AgreeFormBuilder;
