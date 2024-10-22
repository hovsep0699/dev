import React, { Component } from 'react';
import { Tween } from 'react-gsap/dist/index';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import styles from './Message.module.css';

class Message extends Component {
  static ERROR_TYPE = 'error';
  static INFO_TYPE = 'info';
  static SUCCESS_TYPE = 'success';

  constructor(props) {
    super(props);
    this.state = { isVisible: true, isHiding: false };
  }

  componentDidMount() {
    this.remaining = this.props.duration;
    this.resumeTimer();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  @autobind
  hide() {
    this.setState({ isHiding: true });
    this.hideTweenTimer = setTimeout(() => {
      clearTimeout(this.hideTweenTimer);
      this.setState({ isVisible: false, isHiding: false });
    }, 1000);
  }
  @autobind
  resumeTimer() {
    window.clearTimeout(this.timeout);
    this.start = new Date();
    this.timer = setTimeout(this.hide, this.remaining);
  }
  @autobind
  pauseTimer() {
    if (this.props.persistOnHover) {
      clearTimeout(this.timer);
      this.remaining -= new Date() - this.start;
    }
  }

  render() {
    return this.state.isVisible ? (
      <Tween
        from={{
          bottom: this.state.isHiding ? '0' : '-300px',
          opacity: this.state.isHiding ? 1 : 0
        }}
        to={{
          bottom: this.state.isHiding ? '-300px' : '0',
          opacity: this.state.isHiding ? 0 : 1
        }}
        duration={0.5}
      >
        <div
          className={`message ${this.props.type} ${styles.flashMessage}`}
          onMouseEnter={this.pauseTimer}
          onMouseLeave={this.resumeTimer}
          onClick={this.hide}
        >
          {this.props.children}
        </div>
      </Tween>
    ) : null;
  }
}

Message.defaultProps = {
  duration: 5000,
  persistOnHover: true,
  type: Message.INFO_TYPE
};

Message.propTypes = {
  children: PropTypes.node.isRequired,
  duration: PropTypes.number,
  persistOnHover: PropTypes.bool,
  type: PropTypes.oneOf([Message.ERROR_TYPE, Message.INFO_TYPE, Message.SUCCESS_TYPE])
};

export default Message;
