import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginByCertForm from './LoginByCertForm';
import LoginForm from './LoginForm';
import RegisterByCertForm from './RegisterByCertForm';
import RegisterForm from './RegisterForm';
import RemindPasswordForm from './RemindPasswordForm';
import SetPasswordForm from './SetPasswordForm';
import {
  AUTH_CERT,
  AUTH_LOGIN,
  REG_CERT,
  REG_LOGIN,
  REMIND_PASSWORD,
  SET_PASSWORD
} from '../../../common/Url';

const Forms = () => (
  <Switch>
    <Route path={AUTH_CERT} component={LoginByCertForm} />
    <Route path={AUTH_LOGIN} component={LoginForm} />
    <Route path={REG_CERT} component={RegisterByCertForm} />
    <Route path={REG_LOGIN} component={RegisterForm} />
    <Route path={REMIND_PASSWORD} component={RemindPasswordForm} />
    <Route path={SET_PASSWORD} component={SetPasswordForm} />
  </Switch>
);

export default Forms;
