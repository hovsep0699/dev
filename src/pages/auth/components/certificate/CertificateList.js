import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CertificateList extends Component {
  componentDidMount() {
    this.div.focus();
  }
  render() {
    return (
      <div
        ref={div => {
          this.div = div;
        }}
        className="certificate-list"
        tabIndex={1}
        onKeyDown={this.props.listKeyDown}
      >
        <ul className="certificate-list__content">{this.props.children}</ul>
      </div>
    );
  }
}

CertificateList.propTypes = {
  listKeyDown: PropTypes.func
};

export default CertificateList;
