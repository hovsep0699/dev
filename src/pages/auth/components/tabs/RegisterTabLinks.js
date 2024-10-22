import React from 'react';
import TabNavLink from './TabNavLink';
import { REG_CERT, REG_LOGIN } from '../../../../common/Url';
import { BY_CERT, BY_LOGIN } from '../../../../common/Lbl';

const RegisterTabLinks = () => (
  <React.Fragment>
    <TabNavLink to={REG_CERT} label={BY_CERT} />
    <TabNavLink to={REG_LOGIN} label={BY_LOGIN} />
  </React.Fragment>
);

export default RegisterTabLinks;
