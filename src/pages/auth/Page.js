import React, { Component } from 'react';

import Header from './components/Header';
import Tabs from './components/tabs/Tabs';
import { Footer } from '@distate/components';
import Forms from './forms/Forms';

import classNames from 'classnames';
import { Redirect, Route } from 'react-router-dom';
import { AUTH, AUTH_CERT } from '../../common/Url';

class Page extends Component {
  render() {
    const authWindowClasses = classNames({
      popup: true,
      xsmall: true,
      'auth-popup': true,
      active: true,
      disabled: false
    });
    return (
      <React.Fragment>
        <Route exact path={AUTH} render={() => <Redirect to={AUTH_CERT} />} />
        <div className={authWindowClasses}>
          <div className="auth">
            <div className="cert clearfix">
              <div>
                <Header />
                <Tabs />
              </div>
              <Forms />
            </div>
          </div>
        </div>
        <Footer centered />
      </React.Fragment>
    );
  }
}

export default Page;
