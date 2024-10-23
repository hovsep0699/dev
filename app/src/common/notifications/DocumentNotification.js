import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NotificationService from '@distate/core/dist/application/notifications/NotificationService';
import styles from './Notification.module.css';
import { Redirect } from 'react-router-dom';
import { DOCUMENT_VIEW } from '../../common/Url';

const DocumentNotification = props => {
  const {
    notificationId,
    notificationStatus,
    docId,
    docNumber,
    docStatus,
    docTypeTitle,
    createdAt,
    isNew
  } = props;

  const [toDocumentView, setToDocumentView] = useState(false);

  const isDocHasNumber = docNumber !== null;

  const handleClick = (event, notificationId) => {
    event.preventDefault();
    if (isNew) NotificationService.read([notificationId]);
    setToDocumentView(true);
  };

  const link = DOCUMENT_VIEW.replace(':id', docId);

  return toDocumentView ? (
    <Redirect to={link} />
  ) : (
    <li>
      <div
        className={`droplink notification new ${styles[notificationStatus]}`}
        onClick={event => handleClick(event, notificationId)}
      >
        <div className="notification-content">
          <p>
            <span>
              {docTypeTitle}
              {isDocHasNumber && ` № ${docNumber}`}
            </span>
            <span> - </span>
            <span>{docStatus}</span>
          </p>
          <p className="caption">{createdAt}</p>
        </div>
      </div>
    </li>
  );
};

DocumentNotification.defaultProps = {
  docNumber: null,
  notificationStatus: 'document_has_been_received'
};

DocumentNotification.propTypes = {
  notificationId: PropTypes.number.isRequired,
  docId: PropTypes.number.isRequired,
  docStatus: PropTypes.string.isRequired,
  docTypeTitle: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  docNumber: PropTypes.string,
  notificationStatus: PropTypes.string.isRequired
};

export default DocumentNotification;
