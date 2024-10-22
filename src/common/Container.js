import React from 'react';

const Container = ({ children, className = '' }) => {
  return (
    <div className="container clearfix" id="container">
      <div className={`content clearfix ${className}`} id="content">
        {children}
      </div>
    </div>
  );
};

export default Container;
