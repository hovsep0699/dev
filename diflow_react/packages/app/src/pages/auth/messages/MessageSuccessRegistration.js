import React from 'react';
import { REGISTER_THANKS, REGISTER_WAIT_ADMIN } from '../../../common/Lbl';

const MessageSuccessRegistration = () => {
  return (
    <React.Fragment>
      <div className="popup-label success"></div>
      <p className="title">{REGISTER_THANKS}</p>
      <p className="second_title">{REGISTER_WAIT_ADMIN}</p>
    </React.Fragment>
  );
};

export default MessageSuccessRegistration;
