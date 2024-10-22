import React from 'react';
import PropTypes from 'prop-types';

const Header = props => {
  return (
    <React.Fragment>
      <br />
      {props.title && <h2 className={props.className}>{props.title}</h2>}
      <div className="close" onClick={props.onClickCloseBtn}></div>
    </React.Fragment>
  );
};

Header.propTypes = {
  onClickCloseBtn: PropTypes.func,
  title: PropTypes.string,
  className: PropTypes.string
};

Header.displayName = 'Header';
export default Header;
