import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const TabNavLink = props => (
  <NavLink
    className="tab"
    activeClassName="active"
    to={props.to}
    isActive={(match, location) => {
      return location.pathname === props.to;
    }}
  >
    {props.label}
  </NavLink>
);

TabNavLink.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

export default TabNavLink;
