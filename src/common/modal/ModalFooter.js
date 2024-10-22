import React from 'react';
import PropTypes from 'prop-types';

const Footer = props => {
  return <footer className="text-center">{props.children}</footer>;
};

Footer.propTypes = {
  children: PropTypes.node.isRequired
};

export default Footer;
