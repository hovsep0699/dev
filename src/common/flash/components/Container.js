import React, { Component } from 'react';
import Flash, { EVENT_ADD_ERROR, EVENT_ADD_INFO, EVENT_ADD_SUCCESS } from '../Flash';
import MessageDisplayStrategy from '../strategies/MessageDisplayStrategy';
import autobind from 'autobind-decorator';
import MacroStrategy from '../strategies/MacroStrategy';
import ConsoleStrategy from '../strategies/ConsoleStrategy';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: '',
      type: ''
    };
    Flash.displayStrategy = new MacroStrategy([
      new ConsoleStrategy(),
      new MessageDisplayStrategy(5000)
    ]);
  }
  @autobind
  onAddInfo(msg) {
    this.setState({ msg, type: 'info' });
  }
  @autobind
  onAddError(msg) {
    this.setState({ msg, type: 'error' });
  }
  @autobind
  onAddSuccess(msg) {
    this.setState({ msg, type: 'success' });
  }
  componentDidMount() {
    Flash.on(EVENT_ADD_ERROR, this.onAddError);
    Flash.on(EVENT_ADD_INFO, this.onAddInfo);
    Flash.on(EVENT_ADD_SUCCESS, this.onAddSuccess);
  }
  componentWillUnmount() {
    Flash.off(EVENT_ADD_ERROR);
    Flash.off(EVENT_ADD_INFO);
    Flash.off(EVENT_ADD_SUCCESS);
  }
  renderMessage() {
    let componentToRender = null;
    if (this.state.msg && this.state.type === 'error') {
      componentToRender = Flash.displayStrategy.displayError(this.state.msg);
    }
    if (this.state.msg && this.state.type === 'info') {
      componentToRender = Flash.displayStrategy.displayInfo(this.state.msg);
    }
    if (this.state.msg && this.state.type === 'success') {
      componentToRender = Flash.displayStrategy.displaySuccess(this.state.msg);
    }
    return componentToRender;
  }
  render() {
    return (
      <div
        className="ds-flash-messages"
        style={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          right: 0,
          top: 0,
          zIndex: 99999,
          pointerEvents: 'none'
        }}
      >
        {this.renderMessage()}
      </div>
    );
  }
}

export default Container;
