import React, { Component } from 'react';
import { StyledDropdownWrapper, StyledDropdown } from './Dropdown.styles';
import { Placement } from '../types';
import DropdownHeader from './DropdownHeader';

export interface IDropdownProps {
  placement?: Placement;
  noArrow?: boolean;
  widthRestrict?: boolean;
  trigger: React.ReactNode;
  children: React.ReactNode;
  width?: string;
  className?: string;
}

interface IDropdownState {
  isOpen: boolean;
}

class Dropdown extends Component<IDropdownProps, IDropdownState> {
  static defaultProps = {
    placement: Placement.BOTTOM_LEFT,
    noArrow: false,
    widthRestrict: false
  };

  static Header = DropdownHeader;
  private dropdownRef = React.createRef<HTMLDivElement>();

  constructor(props: IDropdownProps) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.getTriggerComponent = this.getTriggerComponent.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate(prevProps: IDropdownProps, prevState: IDropdownState) {
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

  toggle() {
    this.setState(state => ({
      isOpen: !state.isOpen
    }));
  }

  close() {
    this.setState(() => ({ isOpen: false }));
  }

  getTriggerComponent(trigger: any) {
    if (typeof trigger === 'function') {
      return trigger(this.toggle);
    } else {
      return React.cloneElement(trigger, {
        onClick: this.toggle
      });
    }
  }

  handleClickOutside(event: any) {
    if (this.dropdownRef.current.contains(event.target)) {
      return;
    }

    this.close();
  }

  render() {
    const { isOpen } = this.state;
    const { placement, trigger, children, widthRestrict, width, className } = this.props;

    return (
      <StyledDropdownWrapper ref={this.dropdownRef} className={className}>
        {this.getTriggerComponent(trigger)}
        <StyledDropdown
          isOpen={isOpen}
          placement={placement}
          widthRestrict={widthRestrict}
          width={width}
        >
          {typeof children === 'function' ? children(this.close) : children}
        </StyledDropdown>
      </StyledDropdownWrapper>
    );
  }
}

export default Dropdown;
