import React from 'react';
import { REG_CERT } from '../../../../common/Url';
import { GO_TO_REG, NO_REGISTERED_CERTS } from '../../../../common/Lbl';
import { NavLink } from 'react-router-dom';

const NoRegisteredCert = () => (
  <div style={{ paddingTop: '26px', paddingBottom: '16px' }}>
    <h1 className="text-center">{NO_REGISTERED_CERTS}</h1>
    <p className="text-center">
      <NavLink className="link" to={REG_CERT}>
        {GO_TO_REG}
      </NavLink>
    </p>
  </div>
);

export default NoRegisteredCert;
