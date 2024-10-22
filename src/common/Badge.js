import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({ digit, children, ...rest }) => {
  return (
    <div className="badge-wrap inline relative">
      {React.cloneElement(children, { ...rest })}
      {digit > 0 ? (
        <span
          className="notification-count"
          style={{
            right: '4px',
            transform: 'translateX(50%)',
            pointerEvents: 'none'
          }}
        >
          {digit}
        </span>
      ) : null}
    </div>
  );
};

Badge.propTypes = {
  digit: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
};

export default Badge;
