import React from 'react';
import PropTypes from 'prop-types';
import { INSTRUCTION } from '../../../../common/Url';
import { INSTRUCTION_LBL } from '../../../../common/Lbl';

const PluginError = ({ errorText, showLink }) => (
  <div style={{ paddingTop: '26px', paddingBottom: '16px' }}>
    <h1 className="text-center">{errorText}</h1>
    {showLink && (
      <p className="text-center">
        <a className="link" href={INSTRUCTION} target="_blank" rel="noopener noreferrer">
          {INSTRUCTION_LBL}
        </a>
      </p>
    )}
    <br />
  </div>
);
PluginError.defaultProps = {
  showLink: false
};
PluginError.propTypes = {
  errorText: PropTypes.string.isRequired,
  showLink: PropTypes.bool
};

export default PluginError;
