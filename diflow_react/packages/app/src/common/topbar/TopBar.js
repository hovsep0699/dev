import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ICON } from '@distate/components';

import CreateDocumentMenu from './CreateDocumentMenu';
import NotificationsMenu from './NotificationsMenu';
import { SECONDARY } from '../Button';
import { CREATE_CONTRACT } from '../Lbl';
import { CONTRACTS_NEW } from '../Url';

class TopBar extends Component {
  clickHandler() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.toggle('fullscreen');
  }
  render() {
    const showNotificationsMenu = (this.props.hasIncopleteRole !== undefined) && !this.props.hasIncopleteRole
    return (
      <div className="tb">
        <div className="tb-heading">
          {this.props.fullscreenMode && (
            <div className="fullscreen-label" onClick={this.clickHandler}></div>
          )}
          <h2>{this.props.children}</h2>
        </div>
        {!this.props.hideButtons && (
          <div className="group right">
            {/* <FilterInit /> */}
            {showNotificationsMenu && <NotificationsMenu />}
            {process.env.REACT_APP_FEATURE === 'contracts' && (
              <div class="group">
                <a href={CONTRACTS_NEW} className={classNames('ds-button', SECONDARY, ICON.add)}>
                  {CREATE_CONTRACT}
                </a>
              </div>
            )}
            <CreateDocumentMenu />
          </div>
        )}
      </div>
    );
  }
}

TopBar.defaultProps = {
  hideButtons: false,
  btn: null,
  fullscreenMode: false
};

TopBar.propTypes = {
  hideButtons: PropTypes.bool,
  btn: PropTypes.element,
  fullscreenMode: PropTypes.bool
};

export default TopBar;
