import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { VALID_UNTIL } from '../../../../common/Lbl';

const CertificateListItem = ({
  thumbprint,
  title,
  validToDate,
  onClick,
  fio,
  isCompany,
  selected,
  isActive,
  disabledHint
}) => {
  const liClass = classNames({
    'certificate-list__item': true,
    disabled: !isActive,
    selected: selected && isActive
  });
  const iconClass = classNames({
    certopt: true,
    'ti-bag': isCompany,
    'ti-user': !isCompany,
    selected: selected && isActive
  });
  return (
    <li
      key={thumbprint}
      data-id={thumbprint}
      className={liClass}
      title={!isActive ? disabledHint : ''}
      onClick={onClick}
    >
      <div className={iconClass}>
        <h5>{title}</h5>
        {fio && title !== fio && (
          <p>
            <span>{fio}</span>
          </p>
        )}
        <p className="caption">
          <span>{VALID_UNTIL} </span>
          <span>{validToDate}</span>
        </p>
      </div>
    </li>
  );
};

CertificateListItem.defaultProps = {
  fio: '',
  isCompany: true,
  selected: false,
  isActive: true,
  disabledHint: ''
};

CertificateListItem.propTypes = {
  thumbprint: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  validToDate: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  fio: PropTypes.string,
  isCompany: PropTypes.bool,
  selected: PropTypes.bool,
  isActive: PropTypes.bool,
  disabledHint: PropTypes.string
};

export default CertificateListItem;
