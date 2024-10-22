import React from 'react';
import TabNavLink from './TabNavLink';
import { AUTH_CERT, AUTH_LOGIN } from '../../../../common/Url';
import { BY_CERT, BY_LOGIN } from '../../../../common/Lbl';

const LoginTabLinks = () => (
  <React.Fragment>
    <TabNavLink to={AUTH_CERT} label={BY_CERT} />
    <TabNavLink to={AUTH_LOGIN} label={BY_LOGIN} />
  </React.Fragment>
);

export default LoginTabLinks;
