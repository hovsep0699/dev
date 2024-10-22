import DisplayStrategyBase from './DisplayStrategyBase';
import Message from '../components/Message';
import React from 'react';
import DiError from '@distate/core/dist/application/error/Error';

class MessageDisplayStrategy extends DisplayStrategyBase {
  constructor(duration) {
    super();
    this.counter = 1;
    this.duration = duration;
  }
  displayError(err) {
    let msg = err;
    if (err instanceof DiError) {
      msg = err.msgForUser;
    }
    return React.createElement(
      Message,
      {
        duration: this.duration,
        type: Message.ERROR_TYPE,
        key: ++this.counter
      },
      msg
    );
  }
  displayInfo(msg) {
    return React.createElement(
      Message,
      {
        duration: this.duration,
        type: Message.INFO_TYPE,
        key: ++this.counter
      },
      msg
    );
  }
  displaySuccess(msg) {
    return React.createElement(
      Message,
      {
        duration: this.duration,
        type: Message.SUCCESS_TYPE,
        key: ++this.counter
      },
      msg
    );
  }
}

export default MessageDisplayStrategy;
