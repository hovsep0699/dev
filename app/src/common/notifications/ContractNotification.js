import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NotificationService from '@distate/core/dist/application/notifications/NotificationService';
import styles from './Notification.module.css';
import { Redirect } from 'react-router-dom';
import { CONTRACTS } from '../../common/Url';

const ContractNotification = props => {
  const {
    notificationId,
    notificationStatus,
    contractId,
    contractNumber,
    contractStatus,
    contractTypeTitle,
    createdAt,
    isNew
  } = props;

  const [toContractView, setToContractView] = useState(false);

  const isContractHasNumber = contractNumber !== null;

  const handleClick = (event, notificationId) => {
    event.preventDefault();
    if (isNew) NotificationService.read([notificationId]);
    setToContractView(true);
  };

  return toContractView ? (
    <Redirect to={`${CONTRACTS}/${contractId}`} />
  ) : (
    <li>
      <div
        className={`droplink notification new ${styles[notificationStatus]}`}
        onClick={event => handleClick(event, notificationId)}
      >
        <div className="notification-content">
          <p>
            <span>
              {contractTypeTitle}
              {isContractHasNumber && ' №'}
            </span>
            {isContractHasNumber && <span>{contractNumber}</span>}
            <span> - </span>
            <span>{contractStatus}</span>
          </p>
          <p className="caption">{createdAt}</p>
        </div>
      </div>
    </li>
  );
};

ContractNotification.defaultProps = {
  contractNumber: null,
  notificationStatus: 'document_has_been_received'
};

ContractNotification.propTypes = {
  notificationId: PropTypes.number.isRequired,
  contractId: PropTypes.number.isRequired,
  contractStatus: PropTypes.string.isRequired,
  contractTypeTitle: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  contractNumber: PropTypes.string,
  notificationStatus: PropTypes.string.isRequired
};

export default ContractNotification;
