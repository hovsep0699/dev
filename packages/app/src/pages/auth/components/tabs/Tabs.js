import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginTabLinks from './LoginTabLinks';
import RegTabLinks from './RegisterTabLinks';
import {
  AUTH_CERT,
  AUTH_LOGIN,
  REG_CERT,
  REG_LOGIN,
  REMIND_PASSWORD
} from '../../../../common/Url';

const Tabs = () => (
  <div className="tabs flex">
    <Switch>
      <Route exact path={AUTH_CERT} component={LoginTabLinks} />
      <Route exact path={AUTH_LOGIN} component={LoginTabLinks} />
      <Route exact path={REMIND_PASSWORD} component={LoginTabLinks} />
      <Route exact path={REG_CERT} component={RegTabLinks} />
      <Route exact path={REG_LOGIN} component={RegTabLinks} />
    </Switch>
  </div>
);

export default Tabs;
