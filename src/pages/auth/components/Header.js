import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  AUTH_CERT,
  AUTH_LOGIN,
  INSTRUCTION,
  REG_CERT,
  REG_LOGIN,
  REMIND_PASSWORD,
  SET_PASSWORD
} from '../../../common/Url';
import { ENTER_SYSTEM, REGISTER, RESTORE_PASSWORD } from '../../../common/Lbl';

const H2Comp = props => <h2 className="header text-center">{props.label}</h2>;

const Header = () => (
  <Switch>
    <Route exact path={AUTH_CERT} component={() => <H2Comp label={ENTER_SYSTEM} />} />
    <Route exact path={AUTH_LOGIN} component={() => <H2Comp label={ENTER_SYSTEM} />} />
    <Route exact path={REMIND_PASSWORD} component={() => <H2Comp label={RESTORE_PASSWORD} />} />
    <Route exact path={REG_CERT} component={() => <H2Comp label={REGISTER} />} />

    <Route exact path={REG_LOGIN} component={() => <H2Comp label={REGISTER} />} />

    <Route exact path={REMIND_PASSWORD} component={() => <H2Comp label={ENTER_SYSTEM} />} />

    <Route exact path={SET_PASSWORD} component={() => <H2Comp label={ENTER_SYSTEM} />} />
    <Route
      exact
      path={INSTRUCTION}
      component={() => {
        window.location.href = INSTRUCTION;
      }}
    />
  </Switch>
);

export default Header;
