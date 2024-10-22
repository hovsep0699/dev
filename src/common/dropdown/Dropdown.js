import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import DropdownMenu from './DropdownMenu';
import DropdownItem from './DropdownItem';
import DropdownHeader from './DropdownHeader';
import styles from './Dropdown.module.css';
import {
  BOTTOM,
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
  LEFT,
  LEFT_BOTTOM,
  LEFT_TOP,
  RIGHT,
  RIGHT_BOTTOM,
  RIGHT_TOP,
  TOP,
  TOP_LEFT,
  TOP_RIGHT
} from '../Placement';

class Dropdown extends Component {
  static Menu = DropdownMenu;
  static Item = DropdownItem;
  static Header = DropdownHeader;

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.dropdownRef = React.createRef();
    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.getTriggerComponent = this.getTriggerComponent.bind(this);
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  close() {
    this.setState({ isOpen: false });
  }

  createHandleClickInside = onSelectCallback => () => {
    if (onSelectCallback && typeof onSelectCallback === 'function') {
      onSelectCallback();
    }
    this.close();
  };

  handleClickOutside(e) {
    if (this.dropdownRef.current.contains(e.target)) {
      return;
    }
    this.close();
  }

  getTriggerComponent(trigger) {
    if (typeof trigger === 'function') {
      return trigger(this.toggle);
    } else {
      return React.cloneElement(trigger, {
        onClick: this.toggle
      });
    }
  }

  extendChildrenWithNewProps(children, newProps) {
    return React.Children.map(children, child => React.cloneElement(child, newProps));
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props === prevProps && this.state === prevState) {
      return;
    }
    if (this.state.isOpen === true) {
      document.addEventListener('mousedown', this.handleClickOutside);
    } else {
      document.removeEventListener('mousedown', this.handleClickOutside);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  render() {
    const placement = this.props.placement;
    const dropdownWrapperClasses = classNames({
      'dropdown-menu': true,
      group: true,
      open: this.state.isOpen
    });
    const dropdownClasses = classNames({
      dropdown: true,
      arrow: !this.props.noArrow,
      [styles.widthRestrict]: this.props.widthRestrict,
      [styles.bottom]: placement === BOTTOM,
      [styles.bottomLeft]: placement === BOTTOM_LEFT,
      [styles.bottomRight]: placement === BOTTOM_RIGHT,
      [styles.top]: placement === TOP,
      [styles.topLeft]: placement === TOP_LEFT,
      [styles.topRight]: placement === TOP_RIGHT,
      [styles.left]: placement === LEFT,
      [styles.leftTop]: placement === LEFT_TOP,
      [styles.leftBottom]: placement === LEFT_BOTTOM,
      [styles.right]: placement === RIGHT,
      [styles.rightTop]: placement === RIGHT_TOP,
      [styles.rightBottom]: placement === RIGHT_BOTTOM
    });
    return (
      <div className={dropdownWrapperClasses} ref={this.dropdownRef}>
        {this.getTriggerComponent(this.props.trigger)}
        <div className={dropdownClasses}>
          {this.extendChildrenWithNewProps(this.props.children, {
            handleClick: this.createHandleClickInside
          })}
        </div>
      </div>
    );
  }
}

Dropdown.defaultProps = {
  placement: BOTTOM_LEFT,
  noArrow: false
};

Dropdown.propTypes = {
  placement: PropTypes.oneOf([
    BOTTOM,
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
    TOP,
    TOP_LEFT,
    TOP_RIGHT,
    LEFT,
    LEFT_TOP,
    LEFT_BOTTOM,
    RIGHT,
    RIGHT_TOP,
    RIGHT_BOTTOM
  ]),
  trigger: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
  noArrow: PropTypes.bool,
  widthRestrict: PropTypes.bool
};

export default Dropdown;
