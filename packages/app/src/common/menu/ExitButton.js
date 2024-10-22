import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Core from '@distate/core/dist/application/Core';

import { AUTH_CERT } from '../../common/Url';
import { EXIT } from '../Lbl';

const HTMLContainer = styled.a(({ theme }) => {
  return {
    // background: theme.main.color.darkBold
  };
});

const ExitButton = ({ history }) => {
  const clickExitHandler = e => {
    e.preventDefault();
    Core.logout().then(() => {
      history.push(AUTH_CERT);
    });
  };
  return (
    <HTMLContainer tabIndex={-1} className="h-item logout" onClick={clickExitHandler}>
      <i className="ico ico-lock" />
      <p className="caption">{EXIT}</p>
    </HTMLContainer>
  );
};

export default withRouter(ExitButton);
